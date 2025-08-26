// src/pages/dashboard/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllTasks } from '../../services/taskService';
import { getAllTechnicians } from '../../services/technicianService';
import { getAllBoxes } from '../../services/boxService';
import { createOrderService, getAllOrderServices, getOrderServiceById, pauseOrderService, assignTechnicianAndBox } from '../../services/orderService';
import ServiceOrderList from '../../components/features/dashboard/ServiceOrderList';
import ServiceOrderDetails from '../../components/features/dashboard/ServiceOrderDetails';
import CreateOsModal from '../../components/features/dashboard/CreateOsModal';
import './DashboardPage.css';

function DashboardPage() {
  const [osList, setOsList] = useState([]);
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
      const [osData, tasksData, techniciansData, boxesData] = await Promise.all([
        getAllOrderServices(),
        getAllTasks(),
        getAllTechnicians(),
        getAllBoxes()
      ]);
      setOsList(osData || []);
      setTaskCatalog(tasksData || []);
      setTechnicians(techniciansData || []);
      setBoxes(boxesData || []);
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
    } catch (err) { console.error("Falha ao buscar detalhes da OS"); } 
    finally { setIsDetailsLoading(false); }
  };
  
  const handleCreateOs = async (osData) => {
    try {
      await createOrderService(osData);
      setIsCreateOsModalOpen(false);
      fetchData();
    } catch (error) { alert("Falha ao criar a Ordem de Serviço."); }
  };

  const handlePauseOs = async (reason) => {
    if (!selectedOsId) return;
    try {
      await pauseOrderService(selectedOsId, reason);
      handleOsSelect(selectedOsId);
    } catch (error) { alert("Falha ao pausar a Ordem de Serviço."); }
  };

  const handleLinkTechnicianAndBox = async (technicianId, boxId) => {
    if (!selectedOsId || !technicianId || !boxId) return;
    try {
      await assignTechnicianAndBox(selectedOsId, technicianId, boxId);
      handleOsSelect(selectedOsId);
    } catch (error) { alert("Falha ao vincular técnico e box."); }
  };
  
  if (isLoading) return <p>Carregando dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="dashboard-grid">
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
        <div className="dashboard-card"><h2 className="card-title">Monitoramento Individual</h2></div>
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