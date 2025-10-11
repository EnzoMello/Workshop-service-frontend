/**
 * @file ServiceOrderCard.jsx
 * @brief Componente de card para exibir um resumo de uma Ordem de Serviço em uma lista.
 * @author Enzo Mello
 *
 * @description Este é um card clicável que mostra informações essenciais de uma OS,
 * como seu número, status e tempo estimado. Ele muda de aparência quando está selecionado.
 */

import React from 'react';
import { FaCog } from 'react-icons/fa';
import './ServiceOrderCard.css';

/**
 * @brief Mapeamento de status da API para texto e classes de CSS para estilização.
 * @type {object}
 */
const statusClassMap = {
  NOT_STARTED: 'status-pending',
  IN_PROGRESS: 'status-in-progress',
  PAUSED: 'status-in-progress', 
  FINISHED: 'status-finished',
};

// Mapeia os status para o texto de exibição
const statusTextMap = {
  NOT_STARTED: 'Pendente',
  IN_PROGRESS: 'Em Andamento',
  PAUSED: 'Pausado',
  FINISHED: 'Terminado',
};

function ServiceOrderCard({ os, isSelected, onClick }) {
  if (!os) {
    return null;
  }

  let statusClassName;

  if (os.statusColor === 'red') {
    statusClassName = 'status-late';
  } else {
    statusClassName = statusClassMap[os.status] || 'status-pending';
  }

  const statusText = statusTextMap[os.status] || os.status || 'Desconhecido';
  const cardClassName = `os-item-card ${isSelected ? 'active' : ''}`;

  return (
    <button className={cardClassName} onClick={onClick}>
      <div className="os-item-content">
        <FaCog className="os-item-icon" />
        <div className="os-item-info">
          <div className="os-item-name">OS-{os.osNumber}</div>
          <div className="os-item-details">
            Status: {statusText} | Tempo Estimado: {os.totalEstimatedTimeMinutes || 'N/A'} min
          </div>
        </div>
        <div className={`os-item-status-dot ${statusClassName}`}></div>
      </div>
    </button>
  );
}

export default ServiceOrderCard;