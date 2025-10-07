/**
 * @file UpdateTasksPage.jsx
 * @brief Página para atualização de dados das Tarefas do catálogo.
 * @author Enzo Mello
 *
 * @description Apresenta uma lista detalhada de todas as tarefas, com funcionalidades
 * de busca e ordenação. Permite ao usuário selecionar uma tarefa na lista para abrir
 * um modal e atualizar suas informações.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { getAllTasks, updateTask } from 'services/taskService';
import UpdateTaskModal from 'components/features/tasks/UpdateModal/UpdateTaskModal';
import 'pages/technicians/update/UpdateTechniciansPage.css'; 

/**
 * @brief Componente da página de atualização de tarefas.
 * @description Gerencia o estado da lista de tarefas, filtros de busca/ordem e a seleção
 * para atualização via modal.
 * @returns {JSX.Element} A página de atualização de tarefas renderizada.
 */
function UpdateTasksPage() {
  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const navigate = useNavigate();


  /**
   * @brief Busca os dados iniciais de todas as tarefas.
   */
  const fetchData = async () => {
    const data = await getAllTasks();
    setAllTasks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * @brief Memoiza o resultado da filtragem e ordenação da lista de tarefas.
   * @returns {Array<object>} A lista de tarefas filtrada e ordenada.
   */
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...allTasks];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task =>
        task.name.toLowerCase().includes(term) ||
        String(task.id).includes(term)
      );
    }
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    return result;
  }, [allTasks, searchTerm, sortOrder]);

  /**
   * @brief Salva as informações atualizadas de uma tarefa via API.
   * @param {object} updatedTask - O objeto da tarefa com os dados atualizados.
   */
  const handleSave = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      fetchData(); // Re-busca os dados para garantir consistência
      setIsModalOpen(false);
      setSelectedTaskId(null);
    } catch (err) {
      alert("Erro ao atualizar a tarefa.");
    }
  };
  
  /**
   * @brief Manipula a mudança de ordenação da lista.
   * @param {('asc'|'desc'|'none')} order - A ordem de sorteio selecionada.
   */
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsFilterMenuOpen(false);
  };
  
  const selectedTask = allTasks.find(task => task.id === selectedTaskId);

  return (
    <div>
      <div className="page-header"><h1>Atualizar Tarefas</h1></div>
      <div className="page-content">
        <div className="page-title-container">
          <button className="back-button" onClick={() => navigate('/tasks')}>
            <FaArrowLeft /> Voltar para a Lista
          </button>
        </div>
        <div className="update-page-controls">
          <div className="search-filter-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Pesquisar por nome ou ID..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-container">
              <button className="filter-btn" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
                Aplicar Filtro ▾
              </button>
              {isFilterMenuOpen && (
                <div className="filter-dropdown">
                  <div className="filter-option" onClick={() => handleSortChange('asc')}>Ordem Alfabética: A-Z</div>
                  <div className="filter-option" onClick={() => handleSortChange('desc')}>Ordem Alfabética: Z-A</div>
                  <div className="filter-option" onClick={() => handleSortChange('none')}>Resetar Ordem</div>
                </div>
              )}
            </div>
          </div>
          <button
            className="update-action-btn"
            disabled={!selectedTaskId}
            onClick={() => setIsModalOpen(true)}
          >
            Atualizar Selecionada
          </button>
        </div>
        <ul className="update-list">
          {filteredAndSortedTasks.map(task => (
            <li key={task.id} className="update-list-item" onClick={() => setSelectedTaskId(task.id)}>
              <input type="radio" name="task-select" checked={selectedTaskId === task.id} readOnly />
              <span className="item-name">{task.name}</span>
              <span className="item-details">
                <strong>ID:</strong> {task.id} | <strong>Descrição:</strong> {task.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default UpdateTasksPage;