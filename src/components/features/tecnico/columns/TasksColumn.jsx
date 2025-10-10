import React from 'react'


function TasksColumn ({ tasks, onTaskSelect, selectedTaskId}) {
    if (!tasks) {
        return (
            <div className="tech-column placeholder">
                <div className='column-header'> Tarefas da OS</div>
                <div className='column-content-placeholder'> Selecione uma OS para ver as tarefas</div>

            </div>
        );
    }

    return (
    <div className="tech-column">
      <div className="column-header">Tarefas da OS</div>
      <div className="column-content">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`list-item ${selectedTaskId === task.id ? 'selected' : ''}`}
            onClick={() => onTaskSelect(task.id)}
          >
            <span className="item-title">{task.name}</span>
            <span className={`item-status status-${task.status}`}>{task.status.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksColumn