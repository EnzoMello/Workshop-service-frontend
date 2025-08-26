// src/pages/tasks/main/TasksPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Não precisamos mais do 'Papa'
import { getAllTasks, createTask, deleteTask } from 'services/taskService';
import TaskCard from 'components/features/tasks/Card/TaskCard';
import AddTaskModal from 'components/features/tasks/AddModal/AddTaskModal';
import BatchDeleteTaskModal from 'components/features/tasks/DeleteModal/BatchDeleteTaskModal';
import SearchTaskModal from 'components/features/tasks/SearchModal/SearchTaskModal';
import 'pages/technicians/main/TechniciansPage.css';

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // O isUploading, para adicionar a leitura de arquivos csv foi removida para usar depois 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);

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

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      fetchData();
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Erro ao salvar a tarefa.");
    }
  };

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

  // A função 'handleFileUpload' foi completamente removida

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