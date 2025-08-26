// src/components/UpdateTechnicianModal.jsx
import React, { useState, useEffect } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

function UpdateTechnicianModal({ technician, onClose, onSave }) {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [rfidCode, setRfidCode] = useState('');
  const [role, setRole] = useState('');

  // Efeito para preencher os campos com os dados atuais do técnico quando o modal abre
  useEffect(() => {
    if (technician) {
      setName(technician.name);
      setRfidCode(technician.rfidCode);
      setRole(technician.role);
    }
  }, [technician]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Lógica inteligente de atualização:
    // Se um campo estiver vazio, mantém o valor original.
    // Se estiver preenchido, usa o novo valor.
    const updatedData = {
      ...technician, // Começa com todos os dados antigos (id, status, etc.)
      name: name.trim() !== '' ? name : technician.name,
      rfidCode: rfidCode.trim() !== '' ? rfidCode : technician.rfidCode,
      role: role.trim() !== '' ? role : technician.role,
    };
    
    onSave(updatedData); // Envia o objeto final para a página pai
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Atualizar Técnico</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {/* Formulário com os campos para edição */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome do Técnico</label>
            <input 
              type="text" 
              id="name" 
              placeholder={technician.name} // Mostra o valor atual como placeholder
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="rfid">Código do Cartão RFID</label>
            <input 
              type="text" 
              id="rfid" 
              placeholder={technician.rfidCode}
              value={rfidCode} 
              onChange={(e) => setRfidCode(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Função</label>
            <input 
              type="text" 
              id="role" 
              placeholder={technician.role}
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
            />
          </div>

          {/* Botões de Ação */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn">Salvar Alterações</button>
          </div>

          {/* Observação */}
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: '20px' }}>
            OBS: Apenas os campos preenchidos serão alterados.
          </p>
        </form>
      </div>
    </div>
  );
}

export default UpdateTechnicianModal;