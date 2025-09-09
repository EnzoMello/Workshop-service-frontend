// src/components/features/dashboard/ServiceOrderDetails.jsx
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

// Recebe 'boxes' e a nova função 'onLinkTechnicianAndBox'
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
            <div className="info-row"><span className="info-label">Início:</span><span className="info-value">{selectedOsDetails.startTime ? new Date(selectedOsDetails.startTime).toLocaleString('pt-BR') : 'Não iniciado'}</span></div>
             <div className="info-row"><span className="info-label">Fim:</span><span className="info-value">{selectedOsDetails.endTime ? new Date(selectedOsDetails.endTime).toLocaleString('pt-BR') : 'Não finalizado'}</span></div>
             <div className="info-row"><span className="info-label">Motivo da Pausa:</span><span className="info-value">{selectedOsDetails.pauseReason || 'Nenhum'}</span></div>
        </div>
        <div className="sub-task-board">
          <h3 className="sub-task-title">Tarefas da OS</h3>
          <div className="sub-task-list">
            {selectedOsDetails.taskNames?.length > 0 ? (
              selectedOsDetails.taskNames.map((name, index) => (<SubTaskCard key={index} subTask={{ name: name, completed: false }} />))
            ) : (<p className="no-sub-tasks">Nenhuma tarefa vinculada.</p>)}
          </div>
        </div>
        <div className="main-actions">
            <button className="btn btn-secondary" onClick={() => setIsLinkOpen(true)}><FaLink /> Vincular Técnico e Box</button>
            <button className="btn btn-secondary" onClick={() => setIsPauseOpen(true)}><FaPauseCircle /> Pausar OS</button>
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