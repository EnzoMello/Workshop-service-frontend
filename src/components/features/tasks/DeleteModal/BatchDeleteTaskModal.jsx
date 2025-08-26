// src/components/features/tasks/DeleteModal/BatchDeleteTaskModal.jsx
import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

function BatchDeleteTaskModal({ tasks, onClose, onConfirm }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(task.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const executeDelete = () => { onConfirm(selectedIds); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Selecionar Tarefas para Excluir</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="search-bar-container">
          <input type="text" placeholder="Pesquisar por nome ou ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <ul className="technician-list">
          {filteredTasks.map(task => (
            <li key={task.id} className="technician-list-item">
              <label>
                <input type="checkbox" checked={selectedIds.includes(task.id)} onChange={() => handleCheckboxChange(task.id)} />
                <div className="technician-info">
                  <span className="technician-name">{task.name}</span>
                  <span className="technician-details">ID: {task.id}</span>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button type="button" className="confirm-delete-btn" onClick={() => setIsConfirming(true)} disabled={selectedIds.length === 0}>
            Confirmar Exclusão ({selectedIds.length})
          </button>
        </div>
        {isConfirming && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Tem certeza que deseja excluir {selectedIds.length} tarefa(s)?</p>
              <div className="confirmation-actions">
                <button className="cancel-btn" onClick={() => setIsConfirming(false)}>Não</button>
                <button className="confirm-delete-btn" onClick={executeDelete}>Sim</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BatchDeleteTaskModal;