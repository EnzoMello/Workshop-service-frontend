
/**
 * @file LinkTechnicianModal.jsx
 * @brief Modal complexo para vincular um Técnico e um Box a uma Ordem de Serviço.
 * @author Enzo Mello
 *
 * @description Apresenta duas colunas com listas pesquisáveis, uma para técnicos e outra para boxes,
 * permitindo ao usuário selecionar um item de cada lista para a vinculação.
 *
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onClose - Callback para fechar o modal.
 * @param {function} props.onConfirm - Callback executado com os IDs do técnico e do box selecionados.
 * @param {Array<object>} [props.technicians=[]] - A lista completa de técnicos disponíveis.
 * @param {Array<object>} [props.boxes=[]] - A lista completa de boxes disponíveis.
 *
 * @returns {JSX.Element} O modal de vinculação.
 */

import React, { useState, useMemo } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import './LinkTechnicianModal.css';

function LinkTechnicianModal({ onClose, onConfirm, technicians = [], boxes = [] }) {
  // Estados para a busca e seleção de técnicos
  const [techSearchTerm, setTechSearchTerm] = useState('');
  const [selectedTechId, setSelectedTechId] = useState(null);

  // Estados para a busca e seleção de boxes
  const [boxSearchTerm, setBoxSearchTerm] = useState('');
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  /** @brief Memoriza a lista de técnicos filtrada pelo termo de busca. */
  const filteredTechnicians = useMemo(() => 
    technicians.filter(tech => 
      tech.name.toLowerCase().includes(techSearchTerm.toLowerCase())
    ), 
    [technicians, techSearchTerm]
  );

  /** @brief Memoiza a lista de boxes filtrada pelo termo de busca. */
  const filteredBoxes = useMemo(() => 
    boxes.filter(box => 
      box.identifier.toLowerCase().includes(boxSearchTerm.toLowerCase())
    ), 
    [boxes, boxSearchTerm]
  );

  /**
   * @brief Manipula a submissão do formulário de vinculação.
   * @param {React.FormEvent} event - O evento de submissão.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTechId && selectedBoxId) {
      onConfirm(selectedTechId, selectedBoxId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Vincular Técnico e Box</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="link-container">
            {/* Coluna de Técnicos */}
            <div className="link-column">
              <label htmlFor="search-technician">Selecionar Técnico</label>
              <input
                type="text"
                id="search-technician"
                placeholder="Pesquisar por nome..."
                value={techSearchTerm}
                onChange={(e) => setTechSearchTerm(e.target.value)}
              />
              <ul className="technician-list">
                {filteredTechnicians.map(tech => (
                  <li 
                    key={tech.id} 
                    className={`technician-list-item selectable ${selectedTechId === tech.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTechId(tech.id)}
                  >
                    <span className="technician-name">{tech.name}</span>
                    <span className="technician-role">{tech.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna de Boxes */}
            <div className="link-column">
              <label htmlFor="search-box">Selecionar Box</label>
              <input
                type="text"
                id="search-box"
                placeholder="Pesquisar por identificador..."
                value={boxSearchTerm}
                onChange={(e) => setBoxSearchTerm(e.target.value)}
              />
              <ul className="technician-list">
                {filteredBoxes.map(box => (
                  <li 
                    key={box.id} 
                    className={`technician-list-item selectable ${selectedBoxId === box.id ? 'selected' : ''}`}
                    onClick={() => setSelectedBoxId(box.id)}
                  >
                    <span className="technician-name">{box.identifier}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn" disabled={!selectedTechId || !selectedBoxId}>
              Confirmar Vinculação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkTechnicianModal;