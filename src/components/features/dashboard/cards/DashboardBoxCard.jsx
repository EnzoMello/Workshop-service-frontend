
/**
 * @file DashboardBoxCard.jsx
 * @brief Componente de card que representa um único box no layout da oficina.
 * @author Enzo Mello
 *
 * @description Exibe o nome do box, o número da OS (se ocupado), uma borda colorida
 * e um semáforo que indicam o status da OS vinculada. É interativo e pode
 * acionar eventos de clique.
 */

import React from 'react';
import './DashboardBoxCard.css';

/**
 * @brief Componente de card para um box do dashboard.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.box - O objeto de status do box, contendo nome, statusColor, etc.
 * @param {function} [props.onBoxClick] - Função de callback opcional para o evento de clique.
 * @param {'left'|'right'} [props.trafficLightPosition='right'] - Define o lado em que o semáforo é renderizado.
 * @returns {JSX.Element} O card interativo do box.
 */

function DashboardBoxCard({ box, onBoxClick, trafficLightPosition = 'right' }) {
  const statusColor = box.statusColor; 
  
  // Define a classe de posicionamento e a de cor para a borda
  const positionClass = `position-${trafficLightPosition}`;
  const statusColorClass = `status-${statusColor}`;
  
  const cardClasses = `dashboard-box-card ${statusColorClass} ${positionClass} ${onBoxClick ? 'clickable' : ''}`;

  return (
    <div className={cardClasses} onClick={onBoxClick}>
      {/*Novo container para o semáforo */}
      {statusColor !== 'available' && (
        <div className="traffic-light">
          <span className={`light red ${statusColor === 'red' ? 'active' : ''}`}></span>
          <span className={`light yellow ${statusColor === 'yellow' ? 'active' : ''}`}></span>
          <span className={`light green ${statusColor === 'green' ? 'active' : ''}`}></span>
        </div>
      )}

      <div className="box-card-content">
        <span className="dashboard-box-name">{box.name}</span>
        {box.orderServiceNumber && (
          <span className="dashboard-box-os-number">OS-{box.orderServiceNumber}</span>
        )}
      </div>
    </div>
  );
}

export default DashboardBoxCard;