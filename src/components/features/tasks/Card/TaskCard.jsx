/**
 * @file TaskCard.jsx
 * @brief Componente de card para exibir as informações de uma Tarefa do catálogo.
 * @author Enzo Mello
 *
 * @description Um card visual que mostra o nome, descrição e tempo estimado de uma tarefa.
 * Reutiliza estilos de outros cards para manter a consistência visual.
 */
import React from 'react';
import 'components/features/technicians/Card/TechnicianCard.css'; // Reutiliza o estilo

/**
 * @brief Card de Tarefa.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.task - O objeto da tarefa contendo os dados a serem exibidos.
 * @returns {JSX.Element} O card de tarefa renderizado.
 */
function TaskCard({ task }) {
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