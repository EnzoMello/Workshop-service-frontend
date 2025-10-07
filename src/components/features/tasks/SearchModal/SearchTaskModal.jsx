
/**
 * @file SearchTaskModal.jsx
 * @brief Modal para buscar uma tarefa específica no catálogo.
 * @author Enzo Mello
 *
 * @description Modal de duas etapas: primeiro o usuário seleciona o critério de
 * busca (Nome ou ID), e depois insere o valor para encontrar a tarefa.
 */

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/SearchModal/SearchTechnicianModal.css';

/**
 * @brief Modal de Busca de Tarefas.
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onClose - Callback para fechar o modal.
 * @param {Array<object>} props.tasks - A lista de tarefas na qual a busca será realizada.
 * @returns {JSX.Element} O modal de busca.
 */
function SearchTaskModal({ onClose, tasks }) {
  const [searchType, setSearchType] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchValue) return;

    const foundTask = tasks.find(
      (task) => String(task[searchType]).toLowerCase().includes(searchValue.toLowerCase())
    );

    if (foundTask) {
      alert(`Tarefa encontrada: ${foundTask.name}`);
    } else {
      alert('Tarefa não encontrada.');
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Buscar Tarefa</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {!searchType ? (
          <div className="search-selection">
            <p>Selecione o tipo de busca:</p>
            <div className="selection-buttons">
              <button className="select-btn" onClick={() => setSearchType('name')}>Por Nome</button>
              <button className="select-btn" onClick={() => setSearchType('id')}>Por ID</button>
            </div>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="searchValue">
                {searchType === 'name' ? 'Digite o Nome da Tarefa:' : 'Digite o ID da Tarefa:'}
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

export default SearchTaskModal;