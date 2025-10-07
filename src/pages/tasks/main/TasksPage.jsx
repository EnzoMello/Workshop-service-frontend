
/**
 * @file TasksPage.jsx
 * @brief Página principal para o gerenciamento do Catálogo de Tarefas.
 * @author Enzo Mello
 *
 * @description Esta página exibe todas as tarefas padrão que podem ser adicionadas a uma Ordem de Serviço.
 * Permite ao usuário adicionar, deletar em lote e navegar para a página de atualização de tarefas.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, createTask, deleteTask } from 'services/taskService';
import TaskCard from 'components/features/tasks/Card/TaskCard';
import AddTaskModal from 'components/features/tasks/AddModal/AddTaskModal';
import BatchDeleteTaskModal from 'components/features/tasks/DeleteModal/BatchDeleteTaskModal';
import SearchTaskModal from 'components/features/tasks/SearchModal/SearchTaskModal';
import 'pages/technicians/main/TechniciansPage.css';

/**
 * @brief Componente principal da página de gerenciamento de tarefas.
 * @description Gerencia o estado da lista de tarefas, o carregamento, os erros e a visibilidade dos modais.
 * @returns {JSX.Element} A página de gerenciamento de tarefas renderizada.
 */

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);

  /**
   * @brief Busca a lista de todas as tarefas da API e atualiza o estado.
   */
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Falha ao comunicar com o servidor. Verifique se ele está no ar.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * @brief Manipula a submissão do modal de adição de tarefa.
   * @param {object} taskData - Os dados da nova tarefa a ser criada.
   */
  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      fetchData();
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Erro ao salvar a tarefa.");
    }
  };

  /**
   * @brief Manipula a confirmação de deleção em lote de tarefas.
   * @param {Array<string>} idsToDelete - Um array com os IDs das tarefas a serem deletadas.
   */
  const handleConfirmBatchDelete = async (idsToDelete) => {
    try {
      const deletePromises = idsToDelete.map(id => deleteTask(id));
      await Promise.all(deletePromises);
      fetchData();
      setIsBatchDeleteModalOpen(false);
    } catch (err) {
      alert("Erro ao deletar as tarefas.");
    }
  };


  if (isLoading) { return <p>Buscando tarefas no servidor...</p>; }
  if (error) { return <p style={{ color: 'red' }}>{error}</p>; }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Gerenciamento de Tarefas (Catálogo)</h1>
        
        <div className="page-actions">
          <button className="add-technician-btn" onClick={() => setIsAddModalOpen(true)}>Adicionar Tarefa</button>
          <button className="update-data-btn" onClick={() => navigate('/tasks/update')}>Atualizar Dados</button>
          <button className="delete-technician-btn" onClick={() => setIsBatchDeleteModalOpen(true)}>Deletar Tarefas</button>
        </div>

        <div className="technicians-container">
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} style={{ animationDelay: `${index * 100}ms` }} />
          ))}
        </div>
        
        {tasks.length === 0 && !isLoading && <p>Nenhuma tarefa encontrada. Adicione uma para começar.</p>}
      </div>
      
      {isAddModalOpen && (<AddTaskModal onClose={() => setIsAddModalOpen(false)} onAddTask={handleAddTask} />)}
      {isSearchModalOpen && (<SearchTaskModal onClose={() => setIsSearchModalOpen(false)} tasks={tasks} />)}
      {isBatchDeleteModalOpen && (<BatchDeleteTaskModal tasks={tasks} onClose={() => setIsBatchDeleteModalOpen(false)} onConfirm={handleConfirmBatchDelete} />)}
    </div>
  );
}

export default TasksPage;