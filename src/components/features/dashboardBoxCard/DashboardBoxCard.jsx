// src/components/features/dashboard/DashboardBoxCard.jsx
import React from 'react';
import './DashboardBoxCard.css';

function DashboardBoxCard({ box, onBoxClick, trafficLightPosition = 'right' }) {
  const statusColor = box.statusColor; // 'green', 'yellow', 'red', 'available'
  
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