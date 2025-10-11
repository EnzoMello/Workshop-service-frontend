/**
 * @file TechnicianHomePage.jsx
 * @brief Página imersiva do técnico, com fluxo de login RFID e fila de trabalho.
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Serviços
import { getTaskDetails, selectTask, pauseTask, completeTask, getTechinicianOsForToday } from '../../services/technicianViewService';
import { getTechnicianByRfid } from '../../services/technicianService';
import { getOrderServiceById } from '../../services/orderService';

// Componentes
import TechnicianRfidLogin from '../../components/features/technicians/TechnicianRfidLogin';
import ServiceOrderList from '../../components/features/dashboard/ServiceOrderList';
import TasksColumn from '../../components/features/tecnico/columns/TasksColumn';
import TaskDetailsColumn from '../../components/features/tecnico/columns/TaskDetailsColumn';
import EmptyDetailsPlaceholder from '../../components/features/tecnico/EmptyDetailsPlaceholder';
import PauseTaskModal from '../../components/features/tecnico/modals/PauseTaskModal';
import SuccessToast from '../../components/features/dashboard/toasts/SuccessToast';

// CSS
import './TechnicianHomePage.css';

function TechnicianHomePage() {
  // Estados de Autenticação e Animação
  const [authenticatedTech, setAuthenticatedTech] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Estados de Dados
  const [osList, setOsList] = useState([]);
  const [selectedOsId, setSelectedOsId] = useState(null);
  const [selectedOsDetails, setSelectedOsDetails] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [taskToPauseId, setTaskToPauseId] = useState(null);

  //  Funções de Login e Busca de Dados 
  const fetchQueue = useCallback(async () => {
    if (!authenticatedTech) return;
    setIsLoading(true);
    try {
      const queueData = await getTechinicianOsForToday(authenticatedTech.rfidCode);
      setOsList(queueData);
    } catch (error) { 
      console.error("Falha ao buscar fila de trabalho", error); 
    } finally { 
      setIsLoading(false); 
    }
  }, [authenticatedTech]);

  useEffect(() => { 
    if (authenticatedTech) {
      fetchQueue(); 
    }
  }, [authenticatedTech, fetchQueue]);

  const handleLogin = async (rfidCode) => {
    setIsAuthLoading(true);
    setLoginError(null);
    try {
      const tech = await getTechnicianByRfid(rfidCode);
      setIsFadingOut(true);
      setTimeout(() => {
        setAuthenticatedTech({ ...tech, rfidCode }); // Armazena o técnico logado
      }, 500); 
    } catch (error) {
      setLoginError("Código RFID não encontrado. Tente novamente.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Handlers de Seleção 
  const handleOsSelect = async (osId) => {
    if (selectedOsId === osId) { // Desseleciona se clicar no mesmo
      setSelectedOsId(null);
      setSelectedOsDetails(null);
      setSelectedTaskId(null);
      setSelectedTaskDetails(null);
      return;
    }
    setSelectedOsId(osId);
    setSelectedTaskId(null); // Limpa a tarefa ao trocar de OS
    setSelectedTaskDetails(null);
    const details = await getOrderServiceById(osId);
    setSelectedOsDetails(details);
  };

  const handleTaskSelect = async (taskId) => {
    setSelectedTaskId(taskId);
    const details = await getTaskDetails(taskId);
    setSelectedTaskDetails(details);
  };
  
  // Handlers de Ação sobre Tarefas---
  const refreshData = useCallback(async () => {
    if (selectedOsDetails) await handleOsSelect(selectedOsDetails.id);
    if (selectedTaskDetails) await handleTaskSelect(selectedTaskDetails.id);
  }, [selectedOsDetails, selectedTaskDetails]); 
  
  const handleSelectTask = async (taskId) => {
    try {
      await selectTask(taskId);
      setToastMessage(`Tarefa "${selectedTaskDetails.taskName}" apontada por ${authenticatedTech.name}.`);
      await fetchQueue();
      await handleTaskSelect(taskId);
      await refreshData();
    } catch (error) {
      console.error("Erro ao apontar tarefa:", error);
    }
  };
  
  const handlePauseTask = (taskId) => {
    setTaskToPauseId(taskId);
    setIsPauseModalOpen(true);
  };

  const handleConfirmPause = async (reason) => {
    try {
      await pauseTask(taskToPauseId, reason);
      setIsPauseModalOpen(false);
      setToastMessage(`Tarefa pausada.`);
      await fetchQueue();
      await handleTaskSelect(taskToPauseId);
    } catch (error) {
      console.error("Erro ao pausar tarefa:", error);
    }
  };


  const handleCompleteTask = async (taskId) => {
    await completeTask(taskId);
    setSelectedTaskId(null);
    setSelectedTaskDetails(null);
    setToastMessage(`Tarefa ${selectedTaskDetails.taskName} foi finalizada com sucesso!`); 
    await fetchQueue(); 
    setSelectedTaskId(null);
    setSelectedTaskDetails(null);
      // Atualiza a coluna de tarefas da OS atual
    if (selectedOsId) {
      await handleOsSelect(selectedOsId);
    }
  };

  const handleResumeTask = async (taskId) => {
      await selectTask(taskId);
      setToastMessage(`Tarefa "${selectedTaskDetails.taskName}" foi REAPONTADA com sucesso.`);
      await fetchQueue();
      await handleTaskSelect(taskId);
  };

  const renderRightColumn = () => {
    if (selectedOsId && selectedTaskId) {
      return (
        <TaskDetailsColumn 
          task={selectedTaskDetails}
          onBack={() => { setSelectedTaskId(null); setSelectedTaskDetails(null); }}
          onSelect={handleSelectTask}
          onPause={handlePauseTask}
          onComplete={handleCompleteTask}
          onResume={handleResumeTask}
        />
      );
    }
    if (selectedOsId) {
      return (
        <TasksColumn 
          tasks={selectedOsDetails?.task}
          onTaskSelect={handleTaskSelect}
          selectedTaskId={selectedTaskId}
        />
      );
    }
    return (
      <EmptyDetailsPlaceholder />
    );
  };

  if (!authenticatedTech) {
    return (
      <div className={`tech-page-container ${isFadingOut ? 'fade-out' : ''}`}>
        <TechnicianRfidLogin onLogin={handleLogin} error={loginError} isLoading={isAuthLoading} />
      </div>
    );
  }

  return (
    <div className="tech-page-container fade-in">
      {toastMessage && <SuccessToast message={toastMessage} onClose={() => setToastMessage(null)} />}
      
      <div className="tech-page-grid">
        <div className="tech-column">
          <ServiceOrderList 
            orderServices={osList}
            selectedOsId={selectedOsId}
            onOsSelect={handleOsSelect}
            showAddButton={false}
          />
        </div>
        
        <div className="tech-column right-content">
          {renderRightColumn()}
        </div>
      </div>
      
      {isPauseModalOpen && <PauseTaskModal onClose={() => setIsPauseModalOpen(false)} onConfirm={handleConfirmPause} />}
    </div>
  );
}

export default TechnicianHomePage;