// src/components/features/tasks/AddModal/AddTaskModal.jsx
import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';

function AddTaskModal({ onClose, onAddTask }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTimeMinutes, setEstimatedTimeMinutes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Monta o objeto EXATAMENTE como o back-end espera
    const taskData = {
      name,
      description,
      estimatedTimeMinutes: Number(estimatedTimeMinutes),
    };
    onAddTask(taskData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h2>Adicionar Nova Tarefa</h2><button className="close-btn" onClick={onClose}>&times;</button></div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome da Tarefa</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="time">Tempo Estimado (em minutos)</label>
            <input type="number" id="time" value={estimatedTimeMinutes} onChange={(e) => setEstimatedTimeMinutes(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Adicionar Tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddTaskModal;