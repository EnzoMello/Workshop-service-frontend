// src/components/features/dashboard/RealtimeMonitor.jsx
import React from 'react';
import { FaWaveSquare } from 'react-icons/fa';
import RealtimeMonitorCard from './RealtimeMonitorCard';
import './RealtimeMonitor.css';

// Recebe a lista de OS ativas como prop
function RealtimeMonitor({ activeOsList }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h2 className="card-title"><FaWaveSquare /> Monitoramento em Tempo Real</h2>
      </div>
      <div className="card-content">
        <div className="realtime-list">
          {activeOsList && activeOsList.length > 0 ? (
            // Usa 'orderServiceId' como chave, que é o ID único da OS no DTO do dashboard
            activeOsList.map(os => <RealtimeMonitorCard key={os.orderServiceId} os={os} />)
          ) : (
            <p className="no-active-os">Nenhuma Ordem de Serviço em andamento.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RealtimeMonitor;