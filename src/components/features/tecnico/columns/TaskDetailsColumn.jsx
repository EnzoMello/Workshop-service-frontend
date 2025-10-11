/**
 * @file TaskDetailsColumn.jsx
 * @brief Coluna que exibe os detalhes de uma tarefa e os botões de ação contextuais.
 */
import React from 'react';
import './Columns.css';
import { FaPlay, FaPause, FaCheck, FaArrowLeft } from 'react-icons/fa'; 


function TaskDetailsColumn({ task, onSelect, onPause, onResume, onComplete, onBack }) {
  if (!task) {
    return (
      
      <div className="tech-column placeholder">
        
        <div className="column-header">Detalhes da Tarefa</div>
        <div className="column-content-placeholder">Selecione uma tarefa para ver os detalhes e ações.</div>
      </div>
    );
  }

  const statusText = task.status ? task.status.replace('_', ' ') : 'Desconhecido';

  return (
    <div className="tech-column">
      <div className="column-header with-back-button">
        <button onClick={onBack} className="column-back-btn">
          <FaArrowLeft /> 
        </button>
        <span>Detalhes da Tarefa</span>
      </div>
      <div className="column-content details">
        <h3>{task.taskName}</h3>
        <p>{task.taskDescription}</p>
        <div className="details-grid">
          <span>Status:</span> <span>{statusText}</span>
          <span>Tempo Estimado:</span> <span>{task.estimatedTimeMinutes} min</span>
          <span>Início:</span> <span>{task.startTime ? new Date(task.startTime).toLocaleString('pt-BR') : '-'}</span>
          <span>Fim:</span> <span>{task.endTime ? new Date(task.endTime).toLocaleString('pt-BR') : '-'}</span>
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

    
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsColumn;