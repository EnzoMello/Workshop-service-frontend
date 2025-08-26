// src/pages/dashboard/DashboardPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { getAllTasks } from '../../services/taskService';
import { getAllTechnicians } from '../../services/technicianService';
import { getAllBoxes } from '../../services/boxService';
import { createOrderService, getAllOrderServices, getOrderServiceById, pauseOrderService, assignTechnicianAndBox, getActiveDashboardOS } from '../../services/orderService';

import RealtimeMonitor from '../../components/features/dashboard/RealtimeMonitor';
import ServiceOrderList from '../../components/features/dashboard/ServiceOrderList';
import ServiceOrderDetails from '../../components/features/dashboard/ServiceOrderDetails';
import CreateOsModal from '../../components/features/dashboard/CreateOsModal';
import ErrorToast from '../../components/features/dashboard/ErrorToast';
import SuccessToast from '../../components/features/dashboard/SuccessToast';

import './DashboardPage.css';

function DashboardPage() {
  const [osList, setOsList] = useState([]);
  const [activeOsList, setActiveOsList] = useState([]); // Lista para a coluna 3
  const [toastError, setToastError] = useState(null); // Adicione um estado para o erro do toast
  const [successMessage, setSuccessMessage] = useState(null);


  const [taskCatalog, setTaskCatalog] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOsId, setSelectedOsId] = useState(null);
  const [selectedOsDetails, setSelectedOsDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCreateOsModalOpen, setIsCreateOsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [osData, tasksData, techniciansData, boxesData, activeOsData] = await Promise.all([
        getAllOrderServices(),
        getAllTasks(),
        getAllTechnicians(),
        getAllBoxes(),
        getActiveDashboardOS()
      ]);
      setOsList(osData || []);
      setTaskCatalog(tasksData || []);
      setTechnicians(techniciansData || []);
      setBoxes(boxesData || []);
      setActiveOsList(activeOsData || []); // Salva os dados de monitoramento no estado

      if (osData && osData.length > 0 && !selectedOsId) {
        handleOsSelect(osData[0].id);
      }
    } catch (err) {
      setError("Não foi possível carregar os dados do dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  
  const handleOsSelect = async (osId) => {
    if (!osId || selectedOsId === osId) return;
    setSelectedOsId(osId);
    setIsDetailsLoading(true);
    setSelectedOsDetails(null);
    try {
      const details = await getOrderServiceById(osId);
      setSelectedOsDetails(details);
      
    } catch (err) {setToastError("Não foi possível carregar os detalhes da OS."); } 
    finally { setIsDetailsLoading(false); }
  };
  
  const handleCreateOs = async (osData) => {
    try {
      await createOrderService(osData);
      setIsCreateOsModalOpen(false);
      fetchData();
      setSuccessMessage("Ordem de Serviço criada com sucesso!");
    } catch (error) { setToastError("Falha ao criar a Ordem de Serviço."); }
  };

  const refreshSelectedOsDetails = async () => {
  // Se não houver OS selecionada, não faz nada
  if (!selectedOsId) return;

  setIsDetailsLoading(true);
  try {
    const details = await getOrderServiceById(selectedOsId);
    setSelectedOsDetails(details); // Atualiza o estado com os novos dados
  } catch (err) { 
    console.error("Falha ao atualizar detalhes da OS", err);
    setToastError("Não foi possível atualizar os detalhes da OS.");
  } finally { 
    setIsDetailsLoading(false); 
  }
};

  const handlePauseOs = async (reason) => {
  if (!selectedOsId) return;
  try {
    await pauseOrderService(selectedOsId, reason);
    fetchData(); // Mantemos para atualizar a lista da esquerda
    await refreshSelectedOsDetails(); // 
    setToastError(null);
    setSuccessMessage("OS pausada com sucesso!");
  } catch (error) { 
    setToastError("Falha ao pausar a Ordem de Serviço."); 
  }
};


  const handleLinkTechnicianAndBox = async (technicianId, boxId) => {
  if (!selectedOsId || !technicianId || !boxId) return;
  try {
    await assignTechnicianAndBox(selectedOsId, technicianId, boxId);
    fetchData(); // Mantemos para atualizar a lista
    await refreshSelectedOsDetails(); 
    setToastError(null);
    setSuccessMessage("Técnico e Box vinculados com sucesso!");
  } catch (error) {
    setToastError("Falha ao vincular técnico e box."); 
  }
};

  if (isLoading) return <p>Carregando dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
     <div className="dashboard-grid">
      {toastError && (
        <ErrorToast 
          message={toastError}
          onClose={() => setToastError(null)}
        />
      )}
      
      {successMessage && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {/* Coluna 1: Lista de Ordens de Serviço */}
      <div className="dashboard-column col-1">
        <ServiceOrderList 
          orderServices={osList}
          selectedOsId={selectedOsId}
          onOsSelect={handleOsSelect}
          onAddOsClick={() => setIsCreateOsModalOpen(true)}
        />
      </div>

      {/* Coluna 2: Detalhes da OS Selecionada */}
      <div className="dashboard-column col-2">
        <ServiceOrderDetails 
          selectedOsDetails={selectedOsDetails}
          isLoading={isDetailsLoading}
          technicians={technicians}
          boxes={boxes}
          onPauseOs={handlePauseOs}
          onLinkTechnicianAndBox={handleLinkTechnicianAndBox}
        />
      </div>

      {/* Coluna 3: Placeholder que existia antes */}
      <div className="dashboard-column col-3">
        <RealtimeMonitor initialOsList={activeOsList} />

      </div>

      {/* Modal para criar OS */}
      {isCreateOsModalOpen && (
        <CreateOsModal
          onClose={() => setIsCreateOsModalOpen(false)}
          onConfirm={handleCreateOs}
          availableTasks={taskCatalog}
        />
      )}
    </div>
  );
}

export default DashboardPage;