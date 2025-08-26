// src/components/SearchBoxModal.jsx
import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/SearchModal/SearchTechnicianModal.css';

function SearchBoxModal({ onClose, boxes }) {
  // Estado para controlar o tipo de busca: null, 'identifier', ou 'esp32Id'
  const [searchType, setSearchType] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchValue) return;

    const foundBox = boxes.find(
      (box) => String(box[searchType]).toLowerCase() === searchValue.toLowerCase()
    );

    if (foundBox) {
      alert(`Box encontrado: ${foundBox.identifier}`);
    } else {
      alert('Box não encontrado.');
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Buscar Box</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {!searchType ? (
          <div className="search-selection">
            <p>Selecione o tipo de busca:</p>
            <div className="selection-buttons">
              <button className="select-btn" onClick={() => setSearchType('identifier')}>Por Identificador</button>
              <button className="select-btn" onClick={() => setSearchType('esp32Id')}>Por ESP32 ID</button>
            </div>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="searchValue">
                {searchType === 'identifier' ? 'Digite o Identificador do Box:' : 'Digite o ID do ESP32:'}
              </label>
              <input
                type="text"
                id="searchValue"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
                required
              />
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

export default SearchBoxModal;