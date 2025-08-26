// src/components/SearchTechnicianModal.jsx

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/SearchModal/SearchTechnicianModal.css';

// Recebe a função de fechar (onClose) e a lista de técnicos para pesquisar
function SearchTechnicianModal({ onClose, technicians }) {
  // Estado para controlar a etapa do modal (seleção ou input)
  const [searchType, setSearchType] = useState(null);
  // Estado para o valor digitado no campo de busca
  const [searchValue, setSearchValue] = useState('');

  // Função chamada ao clicar no botão final "Buscar"
  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchValue) return;

    // Procura na lista de técnicos usando o tipo de busca e o valor
    const foundTechnician = technicians.find(
      (tech) => String(tech[searchType]) === searchValue
    );

    // Exibe um alerta com o resultado
    if (foundTechnician) {
      alert(`Técnico encontrado: ${foundTechnician.name}`);
    } else {
      alert('Técnico não encontrado.');
    }
    onClose(); // Fecha o modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Buscar Técnico</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Se o tipo de busca ainda não foi escolhido, mostra a primeira etapa */}
        {!searchType ? (
          <div className="search-selection">
            <p>Selecione o tipo de busca:</p>
            <div className="selection-buttons">
              <button className="select-btn" onClick={() => setSearchType('id')}>Por ID</button>
              <button className="select-btn" onClick={() => setSearchType('rfidCode')}>Por RFID</button>
            </div>
          </div>
        ) : (
          /* Se o tipo de busca foi escolhido, mostra a segunda etapa */
          <form className="modal-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="searchValue">
                {searchType === 'id' ? 'Digite o ID do técnico:' : 'Digite o código RFID:'}
              </label>
              <input type="text" id="searchValue" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} autoFocus required />
            </div>
            <div className="form-actions">
              <button type="button" className="back-btn" onClick={() => setSearchType(null)}>Voltar</button>
              <button type="submit" className="submit-btn">Buscar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SearchTechnicianModal;