/**
 * @file OsDetailsView.jsx
 * @description Visão de detalhes limpa, removendo status estáticos conflitantes.
 * A interface agora é guiada exclusivamente pelo 'statusColor' do Backend.
 */
import React from 'react';
import { FaArrowLeft, FaClock, FaTools, FaUser } from 'react-icons/fa';
import './OsDetailsView.css';

function OsDetailsView({ osDetails, onClose }) {
  // Extrai os dados dinâmicos 
  const currentTaskName = osDetails.currentTaskName;
  const elapsedTime = osDetails.taskElapsedTime;
  const estimatedTime = osDetails.taskEstimatedTime;
  
  const statusColor = osDetails.statusColor || 'GRAY';

  return (
    <div className="os-details-view">
      <button className="back-button-icon" onClick={onClose} title="Voltar para o Layout">
        <FaArrowLeft />
      </button>

      <div className="details-header">
        <h3>OS-{osDetails.osNumber}</h3>
      </div>

      <div className="details-body">
        
        
        {currentTaskName ? (
          <div className={`current-task-card status-border-${statusColor}`}>
            <div className="live-indicator">
              <span className={`pulse-dot ${statusColor === 'GREEN' ? 'animating' : ''} bg-${statusColor}`}></span>
              
              {statusColor === 'PAUSED' || statusColor === 'YELLOW' ? 'TAREFA PAUSADA / ATENÇÃO' : 
               statusColor === 'RED' ? 'TAREFA ATRASADA' : 'EXECUTANDO AGORA'}
            </div>
            
            <h4 className="live-task-name">{currentTaskName}</h4>
            
            <div className="live-timer-row">
              <FaClock />
              <span className="live-timer-value">
                 {elapsedTime !== undefined ? elapsedTime : '--'} 
                 <span className="live-timer-total"> / {estimatedTime} min</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="no-task-alert">
             <p>Nenhuma tarefa em execução no momento.</p>
          </div>
        )}

        <div className="info-row">
            <span className="label"><FaUser/> Técnico:</span>
            <span>{osDetails.technicianName || 'Nenhum'}</span>
        </div>
        <div className="info-row">
            <span className="label"><FaTools/> Box:</span>
            <span>{osDetails.name || osDetails.boxName || 'Nenhum'}</span>
        </div>
        
        {osDetails.pauseReason && (
          <div className="info-row pause-alert">
             <span className="label">Motivo da Pausa:</span>
             <span>{osDetails.pauseReason}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OsDetailsView;