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
const statusMap = {
  NOT_STARTED: { text: 'Pendente', className: 'status-gray' },
  IN_PROGRESS: { text: 'Em Andamento', className: 'status-yellow' },
  PAUSED: { text: 'Pausado', className: 'status-orange' },
  COMPLETED: { text: 'Concluído', className: 'status-green' }, 
  DELAYED: { text: 'Atrasado', className: 'status-red' },     
};

function ServiceOrderCard({ os, isSelected, onClick }) {
  if (!os) {
    return null;
  }

  // A lógica agora é mais simples e usa o mapa corrigido
  const statusInfo = statusMap[os.status] || { text: os.status || 'Desconhecido', className: 'status-gray' };
  const cardClassName = `os-item-card ${isSelected ? 'active' : ''}`;

  return (
    <button className={cardClassName} onClick={onClick}>
      <div className="os-item-content">
        <FaCog className="os-item-icon" />
        <div className="os-item-info">
          <div className="os-item-name">OS-{os.osNumber}</div>
          <div className="os-item-details">
            Status: {statusInfo.text} | Tempo Estimado: {os.totalEstimatedTimeMinutes || 'N/A'} min
          </div>
        </div>
        <div className={`os-item-status-dot ${statusInfo.className}`}></div>
      </div>
    </button>
  );
}

export default ServiceOrderCard;