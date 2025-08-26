// src/components/features/dashboard/RealtimeMonitor.jsx
import React from 'react';
import { FaWaveSquare } from 'react-icons/fa';
import { useWebSocket } from '../../../hooks/useWebSocket';
import RealtimeMonitorCard from './RealtimeMonitorCard';
import './RealtimeMonitor.css';
import { data } from 'react-router-dom';

function RealtimeMonitor({ initialOsList }) {
  // Usa nosso hook para obter os dados em tempo real
  // AQUI ESTÁ A CORREÇÃO:
  // O hook 'useWebSocket' agora gerencia a lista 'activeOsList'.
  // Ele começa com 'initialOsList' e se atualiza sozinho.
  const activeOsList = useWebSocket(initialOsList);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h2 className="card-title"><FaWaveSquare /> Monitoramento em Tempo Real</h2>
      </div>
      <div className="card-content">
        <div className="realtime-list">
          {activeOsList && activeOsList.length > 0 ? (
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