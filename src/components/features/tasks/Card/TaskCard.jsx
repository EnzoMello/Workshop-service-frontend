// src/components/features/tasks/Card/TaskCard.jsx
import React from 'react';
import 'components/features/technicians/Card/TechnicianCard.css'; // Reutiliza o estilo

function TaskCard({ task }) {
  // Por enquanto, vamos deixar o status fixo, mas podemos adaptar depois
  const cardClasses = `technician-card status-green`; 
  const headerClasses = `card-header status-green`;

  return (
    <div className={cardClasses}>
      <div className={headerClasses}>
        <h3 className="card-name">{task.name}</h3>
      </div>
      <div className="card-body">
        <p className="card-info"><strong>Descrição:</strong> {task.description}</p>
        <p className="card-info"><strong>Tempo Estimado:</strong> {task.estimatedTimeMinutes} min</p>
      </div>
    </div>
  );
}

export default TaskCard;