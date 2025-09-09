
import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import './SummaryCard.css'; 

function TechnicianStatusCard({ technicians }) {
  return (
    <div className="summary-card">
      <h3 className="summary-card-title">
        <FaUserCog /> Status dos Técnicos
      </h3>
      <ul className="tech-status-list">
        {technicians.map(tech => (
          <li key={tech.id} className="tech-status-item">
            <span>{tech.name}</span>
            {tech.isBusy ? (
              <span className="tech-badge busy">Ocupado</span>
            ) : (
              <span className="tech-badge free">Livre</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechnicianStatusCard;