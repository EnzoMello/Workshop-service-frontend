
/**
 * @file SubTaskCard.jsx
 * @brief Componente para exibir uma única sub-tarefa dentro dos detalhes de uma OS.
 * @author Enzo Mello
 *
 * @description Um card simples que renderiza o nome de uma sub-tarefa.
 */

import React from 'react';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import './SubTaskCard.css';

function SubTaskCard({ subTask }) {
  return (
    <div className="sub-task-card">
      <span className="sub-task-name">{subTask.name}</span>
      <span className="sub-task-time">{subTask.estimatedTimeMinutes} min</span>


    </div>
  );
}

export default SubTaskCard;