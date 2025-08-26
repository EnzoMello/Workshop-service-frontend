// src/components/AddTechnicianModal.jsx

import React, { useState } from 'react';
import './AddTechnicianModal.css';

// Recebe a função de fechar (onClose) e a de adicionar (onAddTechnician) do componente pai
function AddTechnicianModal({ onClose, onAddTechnician }) {
  // Estados para guardar o valor de cada campo do formulário
  const [name, setName] = useState('');
  const [rfidCode, setRfidCode] = useState('');
  const [role, setRole] = useState('');

  // Função chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne que a página recarregue

    const newTechnicianData = { 
      name, rfidCode, role 
    }; // Monta o objeto com os dados
    
    onAddTechnician(newTechnicianData); // Envia os dados para o componente pai
  };

  return (
    // Fundo escuro do modal. Clicar aqui fecha o modal.
    <div className="modal-overlay" onClick={onClose}>
      {/* Conteúdo do modal. O stopPropagation impede que clicar aqui feche o modal. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adicionar Novo Técnico</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Campo de Nome, controlado pelo estado 'name' */}
          <div className="form-group">
            <label htmlFor="name">Nome do Técnico</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          {/* Campo de RFID, controlado pelo estado 'rfidCode' */}
          <div className="form-group">
            <label htmlFor="rfid">Código do Cartão RFID</label>
            <input type="text" id="rfid" value={rfidCode} onChange={(e) => setRfidCode(e.target.value)} required />
          </div>
          {/* Campo de Função, controlado pelo estado 'role' */}
          <div className="form-group">
            <label htmlFor="role">Função</label>
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>
          {/* Botão para submeter o formulário */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">Adicionar Técnico</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTechnicianModal;