// src/components/features/dashboard/RealtimeMonitorCard.jsx
import React from 'react';
import './RealtimeMonitorCard.css';

// Funções de ajuda para traduzir os status que vêm do back-end
const translateStatus = (status) => {
  const map = { NOT_STARTED: "Pendente", IN_PROGRESS: "Em Andamento", PAUSED: "Pausado", COMPLETED: "Concluído" };
  return map[status] || status;
};

function RealtimeMonitorCard({ os }) {
  // A classe de cor é baseada no 'statusColor' enviado pelo back-end
  const statusColorClass = `status-${os.statusColor?.toLowerCase() || 'gray'}`;
  
  return (
    <div className={`realtime-item ${statusColorClass}`}>
      <div className="realtime-header">
        <div className={`realtime-dot ${statusColorClass}`}></div>
        <span className="realtime-title">OS-{os.orderServiceNumber}</span>
        <span className={`realtime-badge ${statusColorClass}`}>{translateStatus(os.status)}</span>
      </div>
      <div className="realtime-body">
        <div className="realtime-info-row">
          <span>Técnico:</span>
          <span>{os.technicianName || 'N/V'}</span>
        </div>
        <div className="realtime-info-row">
          <span>Box:</span>
          <span>{os.boxName || 'N/V'}</span>
        </div>
        <div className="realtime-info-row">
          <span>Tempo Decorrido:</span>
          <span>{os.elapsedTimeMinutes ?? 0} min</span>
        </div>
      </div>
    </div>
  );
}

export default RealtimeMonitorCard;