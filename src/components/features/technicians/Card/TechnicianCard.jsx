import React from 'react';
import './TechnicianCard.css';

function TechnicianCard({ technician }) {
  const cardClasses = `technician-card status-${technician.status}`;
  const headerClasses = `card-header status-${technician.status}`;

  return (
    <div className={cardClasses}>
      <div className={headerClasses}>
        <h3 className="card-name">{technician.name}</h3>
      </div>
      <div className="card-body">
        <p className="card-info"><strong>RFID:</strong> {technician.rfidCode}</p>
        <p className="card-info"><strong>Função:</strong> {technician.role}</p>
      </div>
    </div>
  );
}

export default TechnicianCard;