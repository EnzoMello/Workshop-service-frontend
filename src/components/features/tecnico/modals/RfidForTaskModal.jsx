/**
 * @file RfidForTaskModal.jsx
 * @brief Modal de confirmação de identidade do técnico via RFID para iniciar uma tarefa.
 */
import React, { useState } from 'react';
import 'components/features/technicians/TechnicianRfidLogin.css'; // Reutiliza o estilo

function RfidForTaskModal({ onClose, onConfirm, taskName, isLoading }) {
  const [rfidCode, setRfidCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rfidCode.trim()) {
      onConfirm(rfidCode.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '450px'}}>
        <div className="modal-header">
          <h2>Confirmar Início da Tarefa</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <p style={{textAlign: 'center', color: '#64748b'}}>Você está prestes a apontar a tarefa:</p>
        <h3 style={{textAlign: 'center', margin: '10px 0 20px 0'}}>{taskName}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="rfid-input"
            placeholder="Confirme com seu RFID"
            value={rfidCode}
            onChange={(e) => setRfidCode(e.target.value)}
            autoFocus
          />
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Confirmando...' : 'Confirmar e Apontar'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default RfidForTaskModal;