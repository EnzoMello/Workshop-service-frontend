
/**
 * @file AddBoxModal.jsx
 * @brief Componente de modal para adicionar um novo Box.
 * @author Enzo Mello
 *
 * @description Este modal apresenta um formulário simples para o cadastro de um novo box,
 * capturando seu identificador único.
 *
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onClose - Função de callback para fechar o modal.
 * @param {function} props.onAddBox - Função de callback chamada com os dados do novo box ao submeter o formulário.
 *
 * @returns {JSX.Element} O modal de adição de box.
 */

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';

function AddBoxModal({ onClose, onAddBox }) {
  const [identifier, setIdentifier] = useState('');

  /**
   * @brief Manipula a submissão do formulário.
   * @param {React.FormEvent} event - O evento de submissão do formulário.
   */
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