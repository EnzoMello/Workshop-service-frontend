// src/components/features/box/AddModal/AddBoxModal.jsx
import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';

function AddBoxModal({ onClose, onAddBox }) {
  // O estado agora é apenas para o 'identifier'
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Cria o objeto de dados apenas com o 'identifier'
    const boxData = {
      identifier: identifier,
    };

    onAddBox(boxData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adicionar Novo Box</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifier">Identificador (ex: BOX-01)</label>
            <input 
              type="text" 
              id="identifier" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              required 
              autoFocus
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Adicionar Box</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBoxModal;