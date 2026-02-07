
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
import { FaCar } from 'react-icons/fa';
import './DashboardBoxCard.css';

/**
 * @brief Componente de card para um box do dashboard.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.box - O objeto de status do box, contendo nome, statusColor, etc.
 * @param {function} [props.onBoxClick] - Função de callback opcional para o evento de clique.
 * @param {'left'|'right'} [props.trafficLightPosition='right'] - Define o lado em que o semáforo é renderizado.
 * @returns {JSX.Element} O card interativo do box.
 */

function DashboardBoxCard({ box, onBoxClick }) {
  const statusColor = box.statusColor || 'GRAY'; 
  const showCarIcon = box.carPresent === true;
  
  const cardClasses = `dashboard-box-card status-${statusColor} ${onBoxClick ? 'clickable' : ''}`;

  return (
    <div className={cardClasses} onClick={onBoxClick}>
      
      <div className="traffic-light">
        <span className={`light red ${statusColor === 'RED' ? 'active' : ''}`}></span>
        <span className={`light yellow ${statusColor === 'YELLOW' ? 'active' : ''}`}></span>
        <span className={`light green ${statusColor === 'GREEN' ? 'active' : ''}`}></span>
      </div>

      <div className="box-card-content">
        <div className="box-title-row">
          <span className="dashboard-box-name">
            {box.name || box.boxIdentifier}
          </span>
          
          
          {showCarIcon && (
            <FaCar 
              className="car-icon-indicator" 
              title="Sensor: Veículo Detectado no Box" 
            />
          )}
        </div>

        {statusColor === 'ALERT_SEQUENTIAL' ? (
          <span className="dashboard-box-os-number alerta-texto">
            ALERTA: VEÍCULO S/ OS
          </span>
        ) : box.osNumber ? (
          <span className="dashboard-box-os-number">
            OS-{box.osNumber}
          </span>
        ) : (
          <span className="dashboard-box-os-number">
            Disponível
          </span>
        )}
      </div>
    </div>
  );
}

export default DashboardBoxCard;