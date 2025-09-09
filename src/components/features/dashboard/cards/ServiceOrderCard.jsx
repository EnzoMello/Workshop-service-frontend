// src/components/features/dashboard/ServiceOrderCard.jsx
import React from 'react';
import { FaCog } from 'react-icons/fa';
import './ServiceOrderCard.css';

// Mapeia os status que vêm do back-end (ex: NOT_STARTED) para o texto e cor
const statusMap = {
  NOT_STARTED: { text: 'Pendente', className: 'status-pending' },
  IN_PROGRESS: { text: 'Em Andamento', className: 'status-in-progress' },
  FINISHED: { text: 'Terminado', className: 'status-finished' },
  PAUSED: { text: 'Pausado', className: 'status-in-progress' }, // Reutiliza a cor de "em andamento"
};

// Recebe a prop 'os' e a função 'onClick'
function ServiceOrderCard({ os, isSelected, onClick }) {
  // Se a prop 'os' não existir, o componente não renderiza nada para evitar erros.
  if (!os) {
    return null;
  }

  const cardClassName = `os-item-card ${isSelected ? 'active' : ''}`;
  const statusInfo = statusMap[os.status] || { text: os.status || 'Desconhecido', className: 'status-pending' };

  return (
    <button className={cardClassName} onClick={onClick}>
      <div className="os-item-content">
        <FaCog className="os-item-icon" />
        <div className="os-item-info">
          {/* Usa os.osNumber para o título */}
          <div className="os-item-name">OS-{os.osNumber}</div>
          <div className="os-item-details">
            Status: {statusInfo.text} | Tempo Estimado: {os.totalEstimatedTimeMinutes || 'N/A'} min
          </div>
        </div>
        {/* Adiciona a bolinha colorida à direita */}
        <div className={`os-item-status-dot ${statusInfo.className}`}></div>
      </div>
    </button>
  );
}

export default ServiceOrderCard;