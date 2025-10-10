import React, { useMemo } from 'react';
import './TechnicianCards.css';

// Mapeamento de status para texto e classe de badge
const statusBadgeMap = {
  NOT_STARTED: { text: 'PENDENTE', className: 'badge-pending' },
  IN_PROGRESS: { text: 'EM ANDAMENTO', className: 'badge-in-progress' },
  FINISHED: { text: 'CONCLUÍDO', className: 'badge-finished' },
  PAUSED: { text: 'PAUSADO', className: 'badge-paused' },
};

function TechnicianOsDetailsPanel({ os, onStart, onPause, onResume, onFinish }) {
  const statusInfo = statusBadgeMap[os.status] || { text: os.status, className: 'badge-pending' };

  // Lógica para o "Resumo do Dia" da OS (aqui é o "Resumo das Tarefas" da OS)
  const taskSummary = useMemo(() => {
    const totalTasks = os.tasks ? os.tasks.length : 0;
    const completedTasks = os.tasks ? os.tasks.filter(task => task.status === 'COMPLETED').length : 0; // Supondo status de tarefa
    const remainingTasks = totalTasks - completedTasks;
    return { totalTasks, completedTasks, remainingTasks };
  }, [os.tasks]);

  return (
    <div className="tech-details-panel">
      {/* Seção 1: Detalhes da OS */}
      <div className="details-section os-main-details">
        <div className="header-details">
          <h3>OS-{os.osNumber}</h3>
          <span className={`status-badge ${statusInfo.className}`}>{statusInfo.text}</span>
        </div>
        <div className="info-grid">
          <p><strong>Veículo:</strong> {os.vehicleInfo || 'Não informado'}</p>
          <p><strong>Box:</strong> {os.boxName}</p>
          <p><strong>Início:</strong> {os.startTime ? new Date(os.startTime).toLocaleString('pt-BR') : 'Não iniciado'}</p>
          <p><strong>Fim:</strong> {os.endTime ? new Date(os.endTime).toLocaleString('pt-BR') : 'Não finalizado'}</p>
          <p><strong>Motivo Pausa:</strong> {os.pauseReason || 'Nenhum'}</p>
        </div>
        <div className="card-actions">
          {os.status === 'NOT_STARTED' && <button className="btn-start" onClick={() => onStart(os.id)}>Iniciar OS</button>}
          {os.status === 'IN_PROGRESS' && (
            <>
              <button className="btn-pause" onClick={() => onPause(os.id)}>Pausar</button>
              <button className="btn-finish" onClick={() => onFinish(os.id)}>Finalizar</button>
            </>
          )}
          {os.status === 'PAUSED' && (
            <>
              <button className="btn-start" onClick={() => onResume(os.id)}>Retomar</button>
              <button className="btn-finish" onClick={() => onFinish(os.id)}>Finalizar</button>
            </>
          )}
        </div>
      </div>

      {/* Seção 2: "Resumo do Dia" - agora é "Resumo das Tarefas" desta OS */}
      <div className="details-section summary-tasks-section">
        <h3>Resumo das Tarefas</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-value">{taskSummary.totalTasks}</span>
            <span className="summary-label">Total</span>
          </div>
          <div className="summary-item">
            <span className="summary-value green">{taskSummary.completedTasks}</span>
            <span className="summary-label">Concluídas</span>
          </div>
          <div className="summary-item">
            <span className="summary-value yellow">{taskSummary.remainingTasks}</span>
            <span className="summary-label">Pendentes</span>
          </div>
        </div>
      </div>

      {/* Seção 3: "Status dos Técnicos" - agora é "Lista de Tarefas" da OS */}
      <div className="details-section tasks-list-section">
        <h3>Lista de Tarefas ({os.tasks.length})</h3>
        <ul className="task-detail-list">
          {os.tasks && os.tasks.length > 0 ? (
            os.tasks.map(task => (
              <li key={task.id} className={`task-detail-item status-${task.status}`}>
                <span>{task.name}</span>
                <span className="task-status">{task.status.replace('_', ' ')}</span>
              </li>
            ))
          ) : (
            <li>Nenhuma tarefa detalhada para esta OS.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TechnicianOsDetailsPanel;