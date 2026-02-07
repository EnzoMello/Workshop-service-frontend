
/**
 * @file ServiceOrderDetails.jsx
 * @brief Componente que exibe os detalhes completos de uma OS selecionada.
 * @author Enzo Mello
 *
 * @param {object} props - Propriedades do componente.
 * @param {object|null} props.selectedOsDetails - O objeto com os detalhes da OS.
 * @param {boolean} props.isLoading - Flag para indicar se os detalhes estão carregando.
 * @param {Array<object>} props.technicians - Lista de técnicos para o modal de vinculação.
 * @param {Array<object>} props.boxes - Lista de boxes para o modal de vinculação.
 * @param {function} props.onPauseOs - Callback para pausar a OS.
 * @param {function} props.onLinkTechnicianAndBox - Callback para vincular técnico e box.
 *
 * @returns {JSX.Element} O card de detalhes da OS.
 */

import React, { useState } from 'react';
import { FaTachometerAlt, FaLink, FaPauseCircle } from 'react-icons/fa';
import SubTaskCard from './cards/SubTaskCard';
import PauseOsModal from './modals/PauseOsModal';
import LinkTechnicianModal from './modals/LinkTechnicianModal';
import './ServiceOrderDetails.css';

const NoOrderSelected = () => (
    <div className="no-order-selected">
      <p>Selecione uma Ordem de Serviço na lista à esquerda para ver os detalhes.</p>
    </div>
);
  
const statusBadgeMap = {
    NOT_STARTED: { text: 'PENDENTE', className: 'badge-pending' },
    IN_PROGRESS: { text: 'EM ANDAMENTO', className: 'badge-in-progress' },
    FINISHED: { text: 'CONCLUÍDO', className: 'badge-finished' },
    PAUSED: { text: 'PAUSADO', className: 'badge-in-progress' },
};

/// Recebe 'boxes' e a nova função 'onLinkTechnicianAndBox'
function ServiceOrderDetails({ selectedOsDetails, isLoading, technicians, boxes, onPauseOs, onLinkTechnicianAndBox }) {
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  const handleConfirmLinkAndClose = async (technicianId, boxId) => {
    await onLinkTechnicianAndBox(technicianId, boxId);
    setIsLinkOpen(false);
  };

  
  
  if (isLoading) {
    return (
        <div className="details-card">
            <div className="card-header"><h2 className="card-title"><FaTachometerAlt /> Detalhes da OS</h2></div>
            <div className="card-content"><p style={{textAlign: 'center', padding: '20px'}}>Carregando detalhes...</p></div>
        </div>
    );
  }

  if (!selectedOsDetails) {
    return (
        <div className="details-card">
            <div className="card-header"><h2 className="card-title"><FaTachometerAlt /> Detalhes da OS</h2></div>
            <div className="card-content"><NoOrderSelected /></div>
        </div>
    );
  }
  
  const statusInfo = statusBadgeMap[selectedOsDetails.status] || { text: selectedOsDetails.status || 'DESCONHECIDO', className: 'badge-pending' };

  return (
    <div className="details-card">
      <div className="card-header">
        <h2 className="card-title">
          <FaTachometerAlt /> 
          {selectedOsDetails.osNumber ? `OS-${selectedOsDetails.osNumber.toUpperCase()}` : 'OS SEM NÚMERO'}
        </h2>
      </div>
      
      <div className="card-content">
        <div className="meter-display">
          <div className="amount-display">
            <span className="amount-value">{selectedOsDetails.totalEstimatedTimeMinutes}</span>
            <span className="amount-unit">min</span>
          </div>
          <div className={`status-badge ${statusInfo.className}`}>{statusInfo.text}</div>
        </div>
        <div className="meter-info-section">
            <div className="info-row"><span className="info-label">Técnico Vinculado:</span><span className="info-value">{selectedOsDetails.technicianName || 'Nenhum'}</span></div>
            <div className="info-row"><span className="info-label">Box Vinculado:</span><span className="info-value">{selectedOsDetails.boxName || 'Nenhum'}</span></div>
        </div>
        <div className="sub-task-board">
          <h3 className="sub-task-title">Tarefas da OS</h3>
          <div className="sub-task-list">
            {selectedOsDetails.task?.length > 0 ? (
              selectedOsDetails.task.map(task => (
                <SubTaskCard key={task.id} subTask={task} />
              ))
              
            ) : (
              <p className="no-sub-tasks">Nenhuma tarefa vinculada.</p>
            )}
        </div>
        </div>
        <div className="main-actions">
            <button className="btn btn-secondary" onClick={() => setIsLinkOpen(true)} 
              disabled={!!(selectedOsDetails.technicianName && selectedOsDetails.boxName)}
              >
                <FaLink /> Vincular Técnico e Box</button>
        </div>
      </div>
      
      {/* Modais */}
      {isPauseOpen && <PauseOsModal onClose={() => setIsPauseOpen(false)} onConfirm={onPauseOs} />}
      
      {/* Passa a lista de 'boxes' e a nova função 'onLinkTechnicianAndBox' para o modal */}
      {isLinkOpen && technicians?.length > 0 && boxes?.length > 0 && (
        <LinkTechnicianModal 
          onClose={() => setIsLinkOpen(false)} 
          onConfirm={handleConfirmLinkAndClose} 
          technicians={technicians}
          boxes={boxes}
        />
      )}
    </div>
  );
}

export default ServiceOrderDetails;