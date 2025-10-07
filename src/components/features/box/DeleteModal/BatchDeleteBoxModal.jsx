
/**
 * @file BatchDeleteBoxModal.jsx
 * @brief Modal para deletar múltiplos boxes em uma única operação.
 * @author Enzo Mello
 *
 * @description Apresenta uma lista pesquisável de todos os boxes com checkboxes
 * para seleção. Permite ao usuário selecionar um ou mais boxes e confirmar a exclusão.
 *
 * @param {object} props - Propriedades do componente.
 * @param {Array<object>} props.boxes - A lista completa de boxes para exibição.
 * @param {function} props.onClose - Callback para fechar o modal.
 * @param {function} props.onConfirm - Callback executado com a lista de IDs a serem deletados.
 *
 * @returns {JSX.Element} O modal de deleção em lote.
 */

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

function BatchDeleteBoxModal({ boxes, onClose, onConfirm }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  /** @brief Filtra os boxes com base no termo de busca. */

  const filteredBoxes = boxes.filter(box => {
    const term = searchTerm.toLowerCase();
    return (
      box.identifier.toLowerCase().includes(term) ||
      String(box.id).toLowerCase().includes(term) ||
      box.esp32Id.toLowerCase().includes(term)
    );
  });

  /** @brief Adiciona ou remove um ID da lista de seleção. */
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  /** @brief Ativa a etapa final de confirmação. */
  const handleConfirmClick = () => {
    if (selectedIds.length > 0) {
      setIsConfirming(true);
    }
  };

  /** @brief Executa a função de deleção passada via props. */
  const executeDelete = () => {
    onConfirm(selectedIds);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Selecionar Boxes para Excluir</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Pesquise por Identificador, ID ou ESP32 ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ul className="technician-list">
          {filteredBoxes.map(box => (
            <li key={box.id} className="technician-list-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(box.id)}
                  onChange={() => handleCheckboxChange(box.id)}
                />
                <div className="technician-info">
                  <span className="technician-name">{box.identifier}</span>
                  <span className="technician-details">ID: {box.id} | ESP32 ID: {box.esp32Id}</span>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button
            type="button"
            className="confirm-delete-btn"
            onClick={handleConfirmClick}
            disabled={selectedIds.length === 0}
          >
            Confirmar Exclusão ({selectedIds.length})
          </button>
        </div>

        {isConfirming && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Tem certeza que deseja excluir {selectedIds.length} box(es)?</p>
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

export default BatchDeleteBoxModal;