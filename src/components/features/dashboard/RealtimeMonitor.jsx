/**
 * @file RealtimeMonitor.jsx
 * @description Monitor em tempo real com correção para atualização dinâmica dentro do modal.
 */
import React, { useMemo, useState, useCallback } from 'react';
import { FaCar, FaSpinner } from 'react-icons/fa';
import { useWebSocket } from '../../../hooks/useWebSocket';
import DashboardBoxCard from './cards/DashboardBoxCard';
import OsDetailsView from '../OS/OsDetailsView';
import './RealtimeMonitor.css';

function RealtimeMonitor({ allBoxes = [], initialActiveOs = [], onFetchOsDetails }) {
  const [selectedBoxId, setSelectedBoxId] = useState(null); 
  const [staticOsDetails, setStaticOsDetails] = useState(null); 
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  
  // Hook do WebSocket (atualiza a lista a cada segundo/evento)
  const activeOsList = useWebSocket(initialActiveOs);

  const boxStatuses = useMemo(() => {
    const osMapByBoxName = new Map(activeOsList.map(dto => [dto.boxIdentifier, dto]));

    return allBoxes
      .filter(box => box && box.identifier)
      .map(box => {
        const activeData = osMapByBoxName.get(box.identifier);
        if (activeData) {
          return {
            id: box.id,
            name: box.identifier, 
            statusColor: activeData.statusColor, 
            
            osNumber: activeData.osNumber,
            technicianName: activeData.technicianName,
            currentTaskName: activeData.currentTaskName,
            taskEstimatedTime: activeData.taskEstimatedTime,
            taskElapsedTime: activeData.taskElapsedTime, 
            carPresent: activeData.carPresent,
            status: activeData.status,
            pauseReason: activeData.pauseReason,
            
            orderServiceId: activeData.orderServiceId 
          };
        } else {
          return { 
            id: box.id, 
            name: box.identifier, 
            statusColor: 'GRAY', 
            carPresent: false 
          };
        }
      });
  }, [allBoxes, activeOsList]);

  // Encontra o objeto do box selecionado na lista ATUALIZADA (viva)
  const selectedBoxLive = useMemo(() => {
    return boxStatuses.find(b => b.id === selectedBoxId);
  }, [boxStatuses, selectedBoxId]);

  // Mescla os dados vivos com os dados estáticos do banco para exibir no modal
  const dataToShow = useMemo(() => {
    if (!selectedBoxLive) return null;
    return {
      ...staticOsDetails, 
      ...selectedBoxLive, 
    };
  }, [selectedBoxLive, staticOsDetails]);


  const handleBoxClick = useCallback(async (box) => {
    if (!box.osNumber) return;

    // Define o ID selecionado. O modal abrirá imediatamente com os dados vivos que já temos.
    setSelectedBoxId(box.id);
    setStaticOsDetails(null); // Limpa detalhes antigos

    // Busca detalhes complementares do banco
    if (onFetchOsDetails && box.orderServiceId) {
       try {
         const dbDetails = await onFetchOsDetails(box.orderServiceId);
         setStaticOsDetails(dbDetails); // Salva apenas a parte estática
       } catch (error) {
         console.error("Erro ao buscar detalhes complementares:", error);
       }
    }
  }, [onFetchOsDetails]); 

  // Fecha o modal limpando o ID
  const handleCloseModal = () => {
    setSelectedBoxId(null);
    setStaticOsDetails(null);
  };

  // Funções de Layout
  const getBoxNumber = (name) => {
    if (!name || typeof name !== 'string') return 0;
    const justNumbers = name.replace(/\D/g, '');
    return parseInt(justNumbers, 10);
  };

  const column1 = boxStatuses.filter(box => getBoxNumber(box.name) >= 1 && getBoxNumber(box.name) <= 6).sort((a, b) => getBoxNumber(a.name) - getBoxNumber(b.name));
  const column2 = boxStatuses.filter(box => getBoxNumber(box.name) >= 7 && getBoxNumber(box.name) <= 12).sort((a, b) => getBoxNumber(a.name) - getBoxNumber(b.name));
  const column3 = boxStatuses.filter(box => getBoxNumber(box.name) >= 13 && getBoxNumber(box.name) <= 18).sort((a, b) => getBoxNumber(a.name) - getBoxNumber(b.name));
  const column4 = boxStatuses.filter(box => getBoxNumber(box.name) >= 19 && getBoxNumber(box.name) <= 24).sort((a, b) => getBoxNumber(a.name) - getBoxNumber(b.name));

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h2 className="card-title"><FaCar /> Layout da Oficina (Tempo Real)</h2>
      </div>
      {/* Verifica se dataToShow existe para ativar o painel */}
      <div className={`card-content-split ${dataToShow ? 'details-view-active' : ''}`}>
        <div className="layout-wrapper">
          <div className="layout-container">
            <div className="layout-column">
              {column1.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} />)}
            </div>
            <div className="layout-column">
              {column2.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} />)}
            </div>
            <div className="layout-column">
              {column3.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} />)}
            </div>
            <div className="layout-column">
              {column4.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} />)}
            </div>
          </div>
        </div>
        <div className="details-panel-wrapper">
          {/* Renderiza o modal com os dados mesclados e atualizados */}
          {dataToShow && (
            <OsDetailsView 
              osDetails={dataToShow} 
              onClose={handleCloseModal} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RealtimeMonitor;