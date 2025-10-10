/**
 * @file TechnicianOsSummaryCard.jsx
 * @brief Card compacto para exibir uma Ordem de Serviço na fila de um técnico.
 */
import React from 'react';
import './TechnicianCards.css';

function TechnicianOsSummaryCard({ os, onSelect }) {
  return (
    <div className="tech-card summary-card" onClick={() => onSelect(os)}>
      <div className="card-info">
        <h3>OS-{os.osNumber}</h3>
        <p>{os.vehicleInfo || 'Veículo não informado'}</p>
      </div>
      <div className="card-actions">
        <button className="btn-details">Ver Detalhes</button>
      </div>
    </div>
  );
}
export default TechnicianOsSummaryCard;