/**
 * @file AddTaskModal.jsx
 * @brief Componente de modal para adicionar uma nova Tarefa ao catálogo.
 * @author Enzo Mello
 *
 * @description Apresenta um formulário para o usuário preencher o nome,
 * a descrição e o tempo estimado de uma nova tarefa padrão.
 */
import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';

/**
 * @brief Modal de Adição de Tarefa.
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onClose - Função de callback para fechar o modal.
 * @param {function} props.onAddTask - Callback que recebe o objeto com os dados da nova tarefa.
 * @returns {JSX.Element} O modal renderizado.
 */
function AddTaskModal({ onClose, onAddTask }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTimeMinutes, setEstimatedTimeMinutes] = useState('');

  /**
   * @brief Manipula a submissão do formulário.
   * @description Constrói o objeto de dados da tarefa e chama a função onAddTask.
   * @param {React.FormEvent} event - O evento de submissão do formulário.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = {
      name,
      description,
      estimatedTimeMinutes: Number(estimatedTimeMinutes),
    };
    onAddTask(taskData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h2>Adicionar Nova Tarefa</h2><button className="close-btn" onClick={onClose}>&times;</button></div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome da Tarefa</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="time">Tempo Estimado (em minutos)</label>
            <input type="number" id="time" value={estimatedTimeMinutes} onChange={(e) => setEstimatedTimeMinutes(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Adicionar Tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddTaskModal;