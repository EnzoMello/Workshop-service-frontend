/**
 * @file TaskDetailsColumn.jsx
 * @brief Coluna que exibe os detalhes de uma tarefa e os botões de ação contextuais.
 */
import React from 'react';
import './Columns.css';

function TaskDetailsColumn({ task, onSelect, onPause, onResume, onComplete }) {
  if (!task) {
    return (
      <div className="tech-column placeholder">
        <div className="column-header">Detalhes da Tarefa</div>
        <div className="column-content-placeholder">Selecione uma tarefa para ver os detalhes e ações.</div>
      </div>
    );
  }

  // Tradução simples de status para exibição
  const statusText = task.status ? task.status.replace('_', ' ') : 'Desconhecido';

  return (
    <div className="tech-column">
      <div className="column-header">Detalhes da Tarefa</div>
      <div className="column-content details">
        <h3>{task.taskName}</h3>
        <p>{task.taskDescription}</p>
        <div className="details-grid">
          <span>Status:</span> <span>{statusText}</span>
          <span>Tempo Estimado:</span> <span>{task.estimatedTimeMinutes} min</span>
          <span>Início:</span> <span>{task.startTime ? new Date(task.startTime).toLocaleTimeString('pt-BR') : '-'}</span>
          <span>Fim:</span> <span>{task.endTime ? new Date(task.endTime).toLocaleTimeString('pt-BR') : '-'}</span>
        </div>

        {/* --- LÓGICA DE EXIBIÇÃO CONDICIONAL DOS BOTÕES --- */}
        <div className="action-buttons">
          {task.status === 'NOT_STARTED' && (
            <button className="btn-action btn-select" onClick={() => onSelect(task.id)}>Apontar</button>
          )}

          {(task.status === 'IN_PROGRESS' || task.status === 'DELAYED') && (
            <>
              <button className="btn-action btn-pause" onClick={() => onPause(task.id)}>Pausar</button>
              <button className="btn-action btn-complete" onClick={() => onComplete(task.id)}>Finalizar</button>
            </>
          )}
          
          {task.status === 'PAUSED' && (
            <>
              <button className="btn-action btn-resume" onClick={() => onResume(task.id)}>Retomar</button>
              <button className="btn-action btn-complete" onClick={() => onComplete(task.id)}>Finalizar</button>
            </>
          )}

          {/* Se o status for 'COMPLETED', nenhum botão de ação é renderizado */}
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsColumn;