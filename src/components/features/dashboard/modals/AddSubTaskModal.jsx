
/**
 * @file AddSubTaskModal.jsx
 * @brief Componente de modal para adicionar uma nova sub-tarefa a uma Ordem de Serviço.
 * @author Enzo Mello
 *
 * @description Apresenta um formulário simples com um campo de texto para o nome da nova sub-tarefa.
 *
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onClose - Função de callback para fechar o modal.
 * @param {function} props.onConfirm - Função de callback chamada com o nome da nova sub-tarefa.
 *
 * @returns {JSX.Element} O modal de adição de sub-tarefa.
 */

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';

function AddSubTaskModal({ onClose, onConfirm }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h2>Adicionar Sub-tarefa</h2><button className="close-btn" onClick={onClose}>&times;</button></div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome da Sub-tarefa</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddSubTaskModal;