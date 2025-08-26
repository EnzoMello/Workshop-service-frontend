import React, { useState, useEffect } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

function UpdateTaskModal({ task, onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTimeMinutes, setEstimatedTimeMinutes] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setEstimatedTimeMinutes(task.estimatedTimeMinutes);
    }
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      ...task,
      name: name.trim() !== '' ? name : task.name,
      description: description.trim() !== '' ? description : task.description,
      estimatedTimeMinutes: estimatedTimeMinutes ? Number(estimatedTimeMinutes) : task.estimatedTimeMinutes,
    };
    onSave(updatedData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Atualizar Tarefa</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome da Tarefa</label>
            <input type="text" id="name" placeholder={task.name} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input type="text" id="description" placeholder={task.description} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Tempo Estimado (minutos)</label>
            <input type="number" id="time" placeholder={task.estimatedTimeMinutes} value={estimatedTimeMinutes} onChange={(e) => setEstimatedTimeMinutes(e.target.value)} />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTaskModal;