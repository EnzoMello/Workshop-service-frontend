

/**
 * @file RealtimeMonitor.jsx
 * @brief Componente principal que renderiza o layout visual e interativo da oficina.
 * @author Enzo Mello
 *
 * @description Este componente recebe a lista de todos os boxes e as OS ativas,
 * combina esses dados para determinar o status de cada box, e os renderiza em um layout de 4 colunas.
 * Utiliza um hook WebSocket para atualizações em tempo real. Gerencia a lógica para alternar entre a visão de grid 
 * e a visão de detalhes de uma OS em um painel lateral animado.
 *
 * @param {object} props - Propriedades do componente.
 * @param {Array<object>} props.allBoxes - A lista completa de todos os objetos de box vindos da API.
 * @param {Array<object>} props.initialActiveOs - A lista inicial de OS ativas para o hook WebSocket.
 * @param {function} props.onFetchOsDetails - Função para buscar os detalhes completos de uma OS.
 *
 * @returns {JSX.Element} O componente do layout da oficina.
 */

import React, { useMemo, useState, useCallback } from 'react';
import { FaCar, FaSpinner } from 'react-icons/fa';
import { useWebSocket } from '../../../hooks/useWebSocket';
import DashboardBoxCard from './cards/DashboardBoxCard';
import OsDetailsView from '../OS/OsDetailsView';
import './RealtimeMonitor.css';

function RealtimeMonitor({ allBoxes = [], initialActiveOs = [], onFetchOsDetails }) {
  const [selectedOsData, setSelectedOsData] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  
  /** @brief Mantém a lista de OS ativas atualizada via WebSocket. */

  const activeOsList = useWebSocket(initialActiveOs);

  /**
   * @brief Um mapa para acesso rápido aos detalhes resumidos da OS pelo seu número.
   * @type {Map<string, object>}
   */
  const activeOsMap = useMemo(() => 
    new Map(activeOsList.map(os => [os.orderServiceNumber, os])), 
    [activeOsList]
  );
  
  const boxStatuses = useMemo(() => {
    const osMapByBoxName = new Map(activeOsList.map(os => [os.boxName, os]));
    return allBoxes
      .filter(box => box && box.identifier)
      .map(box => {
        const activeOs = osMapByBoxName.get(box.identifier);
        if (activeOs) {
          return { id: box.id, name: box.identifier, statusColor: activeOs.statusColor?.toLowerCase() || 'gray', orderServiceNumber: activeOs.orderServiceNumber };
        } else {
          return { id: box.id, name: box.identifier, statusColor: 'available', orderServiceNumber: null };
        }
      });
  }, [allBoxes, activeOsList]);

  /**
   * @brief Função chamada ao clicar em um card de box.
   * @description Se o box tiver uma OS, busca os detalhes completos e ativa o painel lateral.
   * @param {object} box - O objeto de status do box que foi clicado.
   */
  const handleBoxClick = useCallback(async (box) => {
    /// A função só continua se o box tiver uma OS e a função de busca existir.
    if (!box.orderServiceNumber || !onFetchOsDetails) {
      return;
    }

    /// Busca o resumo da OS no mapa para encontrar o ID real (UUID)
    const osSummary = activeOsMap.get(box.orderServiceNumber);
    if (!osSummary || !osSummary.orderServiceId) {
      console.error("ID da OS não encontrado para o número:", box.orderServiceNumber);
      return;
    }
    
    /// Inicia o loading e chama a API para buscar os detalhes completos
    setIsDetailsLoading(true);
    setSelectedOsData(null); // Limpa dados antigos
    try {
      const details = await onFetchOsDetails(osSummary.orderServiceId);
      ///  Com os detalhes em mãos, atualiza o estado para mostrar o painel
      setSelectedOsData(details);
    } catch (error) {
      console.error("Erro ao buscar detalhes da OS:", error);
    } finally {
      setIsDetailsLoading(false);
    }
  }, [activeOsMap, onFetchOsDetails]); 

  /**
   * @brief Extrai o valor numérico do nome de um box para ordenação e filtragem.
   * @param {string} name - O nome do box (ex: "BOX-01").
   * @returns {number} O número do box.
   */
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
        <h2 className="card-title"><FaCar /> Layout da Oficina</h2>
      </div>
      <div className={`card-content-split ${selectedOsData ? 'details-view-active' : ''}`}>
        <div className="layout-wrapper">
          <div className="layout-container">
            <div className="layout-column">
              {column1.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} trafficLightPosition="right" />)}
            </div>
            <div className="layout-column">
              {column2.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} trafficLightPosition="right" />)}
            </div>
            <div className="layout-column">
              {column3.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} trafficLightPosition="left" />)}
            </div>
            <div className="layout-column">
              {column4.map(box => <DashboardBoxCard key={box.id} box={box} onBoxClick={() => handleBoxClick(box)} trafficLightPosition="left" />)}
            </div>
          </div>
        </div>
        <div className="details-panel-wrapper">
          {isDetailsLoading && (
            <div className="loading-state"><FaSpinner className="spinner" /> Carregando...</div>
          )}
          {selectedOsData && !isDetailsLoading && (
            <OsDetailsView 
              osDetails={selectedOsData} 
              onClose={() => setSelectedOsData(null)} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RealtimeMonitor;