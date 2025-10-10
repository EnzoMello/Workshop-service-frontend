/**
 * @file PauseTaskModal.jsx
 * @brief Modal para selecionar o motivo da pausa de uma tarefa específica.
 */
import React, { useState } from 'react';
// Reutilize os CSS que você já tem
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

const pauseReasons = [
  'Aguardando Aprovação',
  'Aguardando Decisão',
  'Aguardando Peças',
  'Aguardando Serv.Terceiros',
];

function PauseTaskModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState(pauseReasons[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pausar Tarefa</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reason">Selecione o motivo da pausa:</label>
            <select id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="filter-select" style={{width: '100%'}}>
              {pauseReasons.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn">Confirmar Pausa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PauseTaskModal;