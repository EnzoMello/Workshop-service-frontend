
import React from 'react';
import { FaChartBar, FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import './SummaryCard.css'; 

function DailySummaryCard({ data }) {
  return (
    <div className="summary-card">
      <h3 className="summary-card-title">
        <FaChartBar /> Resumo do Dia
      </h3>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-value">{data.total}</span>
          <span className="summary-label">Total de OS</span>
        </div>
        <div className="summary-item">
          <FaPlay className="summary-icon green" />
          <span className="summary-value">{data.inProgress}</span>
          <span className="summary-label">Em Andamento</span>
        </div>
        <div className="summary-item">
          <FaPause className="summary-icon yellow" />
          <span className="summary-value">{data.paused}</span>
          <span className="summary-label">Pausadas</span>
        </div>
        <div className="summary-item">
          <FaCheck className="summary-icon gray" />
          <span className="summary-value">{data.finishedToday}</span>
          <span className="summary-label">Concluídas Hoje</span>
        </div>
      </div>
    </div>
  );
}

export default DailySummaryCard;