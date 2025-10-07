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
  NOT_STARTED: { text: 'Pendente', className: 'status-pending' },
  IN_PROGRESS: { text: 'Em Andamento', className: 'status-in-progress' },
  FINISHED: { text: 'Terminado', className: 'status-finished' },
  PAUSED: { text: 'Pausado', className: 'status-in-progress' }, 
};

/**
 * @brief Componente de card para uma Ordem de Serviço.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.os - O objeto da Ordem de Serviço com os dados a serem exibidos.
 * @param {boolean} props.isSelected - Flag que indica se o card está atualmente selecionado.
 * @param {function} props.onClick - Função de callback a ser executada quando o card é clicado.
 * @returns {JSX.Element | null} O card da OS renderizado, ou nulo se não houver dados.
 */

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