// src/components/features/box/UpdateModal/UpdateBoxModal.jsx
import React, { useState, useEffect } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css'; // Reutiliza CSS
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css'; // Reutiliza CSS

// As props agora são 'box', 'onClose', e 'onSave'
function UpdateBoxModal({ box, onClose, onSave }) {
  // Estados adaptados para os dados do box
  const [identifier, setIdentifier] = useState('');
  const [esp32Id, setEsp32Id] = useState('');

  // Preenche os campos com os dados do box selecionado
  useEffect(() => {
    if (box) {
      setIdentifier(box.identifier);
      setEsp32Id(box.esp32Id);
    }
  }, [box]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Lógica de atualização inteligente para os boxes
    const updatedData = {
      ...box,
      identifier: identifier.trim() !== '' ? identifier : box.identifier,
      esp32Id: esp32Id.trim() !== '' ? esp32Id : box.esp32Id,
    };
    
    onSave(updatedData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Atualizar Box</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Campo para o Identificador */}
          <div className="form-group">
            <label htmlFor="identifier">Identificador (ex: BOX-01)</label>
            <input 
              type="text" 
              id="identifier" 
              placeholder={box.identifier}
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
            />
          </div>
          {/* Campo para o ESP32 ID */}
          <div className="form-group">
            <label htmlFor="esp32Id">ID do ESP32</label>
            <input 
              type="text" 
              id="esp32Id" 
              placeholder={box.esp32Id}
              value={esp32Id} 
              onChange={(e) => setEsp32Id(e.target.value)} 
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn">Salvar Alterações</button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: '20px' }}>
            OBS: Apenas os campos preenchidos serão alterados.
          </p>
        </form>
      </div>
    </div>
  );
}

export default UpdateBoxModal;