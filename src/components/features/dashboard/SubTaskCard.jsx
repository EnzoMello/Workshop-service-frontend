// src/components/features/dashboard/SubTaskCard.jsx
import React from 'react';
// Ícones para indicar o status de 'completo'
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import './SubTaskCard.css';

function SubTaskCard({ subTask }) {
  return (
    <div className="sub-task-card">
      <span className="sub-task-name">{subTask.name}</span>
    </div>
  );
}

export default SubTaskCard;