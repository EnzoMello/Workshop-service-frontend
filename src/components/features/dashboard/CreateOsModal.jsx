// src/components/features/dashboard/CreateOsModal.jsx
import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

function CreateOsModal({ onClose, onConfirm, availableTasks }) {
  const [osNumber, setOsNumber] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const handleCheckboxChange = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
    } else {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  };

   const handleSubmit = (event) => {
    event.preventDefault();
    // Verificação extra de segurança
    if (!osNumber || selectedTaskIds.length === 0) {
      alert("Por favor, preencha o número da OS e selecione ao menos uma tarefa.");
      return;
    }
    // Monta o objeto no formato que o back-end espera
    const osData = {
      osNumber,
      taskIds: selectedTaskIds
    };
    onConfirm(osData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Criar Nova Ordem de Serviço</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="osNumber">Número da OS</label>
            <input type="text" id="osNumber" value={osNumber} onChange={(e) => setOsNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Selecione as Tarefas do Catálogo</label>
            <ul className="technician-list">
              {availableTasks.map(task => (
                <li key={task.id} className="technician-list-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTaskIds.includes(task.id)}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                    <div className="technician-info">
                      {/* O tempo foi removido daqui */}
                      <span className="technician-name">{task.name}</span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn" disabled={!osNumber || selectedTaskIds.length === 0}>
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateOsModal;