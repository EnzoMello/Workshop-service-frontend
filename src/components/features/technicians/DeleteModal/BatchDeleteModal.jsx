// src/components/BatchDeleteModal.jsx

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import './BatchDeleteModal.css';

function BatchDeleteModal({ technicians, onClose, onConfirm }) {
  const [selectedIds, setSelectedIds] = useState([]); // Guarda IDs selecionados
  const [searchTerm, setSearchTerm] = useState(''); // Guarda o termo da busca
  const [isConfirming, setIsConfirming] = useState(false); // Controla o modal de confirmação aninhado

  // Filtra os técnicos com base no termo de busca
  const filteredTechnicians = technicians.filter(tech => {
    const term = searchTerm.toLowerCase();
    return (
      tech.name.toLowerCase().includes(term) ||
      String(tech.id).toLowerCase().includes(term) ||
      tech.rfidCode.toLowerCase().includes(term)
    );
  });

  //  Funções Handler 
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirmClick = () => {
    // Só abre o modal de confirmação se houver alguém selecionado
    if (selectedIds.length > 0) {
      setIsConfirming(true);
    }
  };

  const executeDelete = () => {
    // Chama a função final que veio da página principal
    onConfirm(selectedIds);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Selecionar Técnicos para Excluir</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Barra de Pesquisa */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Pesquise por nome, ID ou RFID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Lista de técnicos FILTRADA */}
        <ul className="technician-list">
          {filteredTechnicians.map(tech => (
            <li key={tech.id} className="technician-list-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(tech.id)}
                  onChange={() => handleCheckboxChange(tech.id)}
                />
                <div className="technician-info">
                  <span className="technician-name">{tech.name}</span>
                  <span className="technician-details">ID: {tech.id} | RFID: {tech.rfidCode}</span>
                </div>
              </label>
            </li>
          ))}
        </ul>

        {/* Botões de ação principais */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="confirm-delete-btn"
            onClick={handleConfirmClick}
            disabled={selectedIds.length === 0} // Desabilita se nada for selecionado
          >
            Confirmar Exclusão ({selectedIds.length})
          </button>
        </div>

        {/* Renderização do Modal de Confirmação Aninhado */}
        {isConfirming && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Tem certeza que deseja excluir {selectedIds.length} técnico(s)?</p>
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

export default BatchDeleteModal;