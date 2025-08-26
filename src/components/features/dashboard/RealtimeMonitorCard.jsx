// src/components/features/dashboard/RealtimeMonitorCard.jsx
import React from 'react';
import './RealtimeMonitorCard.css';

// Funções de ajuda para traduzir os status que vêm do back-end
const translateStatus = (status) => {
  const map = { NOT_STARTED: "Pendente", IN_PROGRESS: "Em Andamento", PAUSED: "Pausado", COMPLETED: "Concluído" };
  return map[status] || status;
};

const translateTimeStatus = (timeStatus) => {
  switch (timeStatus) {
    case "ON_TIME": return "Dentro do prazo";
    case "LATE": return "Atrasado";
    default: return "N/A";
  }
};

function RealtimeMonitorCard({ os }) {
  const statusColorClass = `status-${os.statusColor?.toLowerCase() || 'gray'}`;
  
  return (
    <div className={`realtime-item ${statusColorClass}`}>
      {/* 👇 SEÇÃO DO CABEÇALHO CORRIGIDA 👇 */}
      <div className="realtime-header">
        <span className="realtime-title">OS-{os.orderServiceNumber}</span>
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
          <span>Tempo estimado:</span>
          <span>{os.estimatedTimeMinutes ?? 0} min</span>
        </div>
        <div className="realtime-info-row">
          <span>Prazo:</span>
          <span>{translateTimeStatus(os.timeStatus)}</span>
        </div>
        <div className="realtime-info-row">
          <span>Tempo Decorrido:</span>
          <span>{os.elapsedTimeMinutes ?? 0} min</span>
        </div>
        <div className="realtime-info-row">
          <span>Status:</span>
          <span className="status-badge-blue">{translateStatus(os.status)}</span>
        </div>
      </div>
    </div>
  );
}

export default RealtimeMonitorCard;