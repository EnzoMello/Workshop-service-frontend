/**
 * @file GeralPage.jsx
 * @brief Define a página "Geral", o painel principal para gerenciamento de Ordens de Serviço (OS).
 * @author Enzo Mello
 *
 * @description Esta página renderiza um layout de duas colunas. A coluna da esquerda contém a lista de todas as OS.
 * A coluna da direita exibe, por padrão, cartões de resumo (KPIs e Status dos Técnicos) e, ao selecionar uma OS,
 * exibe os detalhes completos daquela OS. Gerencia todo o estado e as chamadas de API para esta funcionalidade.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { getAllTasks } from '../../services/taskService';
import { getAllTechnicians } from '../../services/technicianService';
import { getAllBoxes } from '../../services/boxService';
import { createOrderService, getAllOrderServices, getOrderServiceById, pauseOrderService, assignTechnicianAndBox } from '../../services/orderService';

import ServiceOrderList from '../../components/features/dashboard/ServiceOrderList';
import ServiceOrderDetails from '../../components/features/dashboard/ServiceOrderDetails';
import CreateOsModal from '../../components/features/dashboard/modals/CreateOsModal';
import SuccessToast from '../../components/features/dashboard/toasts/SuccessToast';
import ErrorToast from '../../components/features/dashboard/toasts/ErrorToast';
import DailySummaryCard from '../../components/features/geral/DailySummaryCard';
import TechnicianStatusCard from '../../components/features/geral/TechnicianStatusCard';

import './GeralPage.css'; 

function GeralPage() {
  const [osList, setOsList] = useState([]);
  const [taskCatalog, setTaskCatalog] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const [toastError, setToastError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedOsId, setSelectedOsId] = useState(null);
  const [selectedOsDetails, setSelectedOsDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCreateOsModalOpen, setIsCreateOsModalOpen] = useState(false);

  /**
   * @brief Calcula os dados para o card de "Resumo do Dia".
   * @description Processa a lista 'osList' para extrair KPIs como total de OS, em andamento, pausadas e concluídas hoje.
   * @type {object}
   */
  const summaryData = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const inProgress = osList.filter(os => os.status === 'IN_PROGRESS').length;
    const paused = osList.filter(os => os.status === 'PAUSED').length;
    const finishedToday = osList.filter(os => 
      os.status === 'FINISHED' && new Date(os.endTime).getTime() >= todayStart
    ).length;

    return {
      total: osList.length,
      inProgress,
      paused,
      finishedToday,
    };
  }, [osList]);

  /**
   * @brief Calcula o status de 'Livre' ou 'Ocupado' para cada técnico.
   * @description Compara a lista de técnicos com as OS ativas para determinar o status de cada um.
   * @type {Array<object>}
   */
  const technicianStatuses = useMemo(() => {
    const busyTechnicianIds = new Set(
      osList
        .filter(os => os.status === 'IN_PROGRESS' || os.status === 'PAUSED')
        .map(os => os.technicianId)
    );

    return technicians.map(tech => ({
      ...tech,
      isBusy: busyTechnicianIds.has(tech.id)
    }));
  }, [osList, technicians]);

  /**
   * @brief Busca os dados iniciais da página na API.
   * @description Utiliza Promise.all para buscar OS, tarefas, técnicos e boxes em paralelo.
   */
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [osData, tasksData, techniciansData, boxesData] = await Promise.all([
        getAllOrderServices(),
        getAllTasks(),
        getAllTechnicians(),
        getAllBoxes(),
      ]);
      setOsList(osData || []);
      setTaskCatalog(tasksData || []);
      setTechnicians(techniciansData || []);
      setBoxes(boxesData || []);

    /** if (osData && osData.length > 0 && !selectedOsId) {
        handleOsSelect(osData[0].id);
      } */
     
    } catch (err) {
      setPageError("Não foi possível carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  

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

/**
   * @brief Controla a seleção e desseleção de uma OS na lista.
   * @description Se uma OS já selecionada for clicada novamente, ela é desselecionada para mostrar a visão de resumo.
   * Caso contrário, busca e exibe os detalhes da nova OS selecionada.
   * @param {string} osId - O ID da OS que foi clicada.
   */
const handleOsSelect = async (osId) => {
    if (selectedOsId === osId) {
      setSelectedOsId(null);
      setSelectedOsDetails(null);
      return;
    }
    setSelectedOsId(osId);
    setIsDetailsLoading(true);
    setSelectedOsDetails(null);
    try {
      const details = await getOrderServiceById(osId);
      setSelectedOsDetails(details);
    } catch (err) { 
        console.error("Falha ao buscar detalhes da OS", err);
    } finally { 
        setIsDetailsLoading(false); 
    }
  };

  
  const handleCreateOs = async (osData) => {
      try {
        await createOrderService(osData);
        setIsCreateOsModalOpen(false);
        fetchData();
        setSuccessMessage("Ordem de Serviço criada com sucesso!");
      } catch (error) { setToastError("Falha ao criar a Ordem de Serviço."); }
    };


const handlePauseOs = async (reason) => {
  if (!selectedOsId) return;
  try {
    await pauseOrderService(selectedOsId, reason);
    fetchData(); 
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
      fetchData();
      await refreshSelectedOsDetails();
      setSuccessMessage("Técnico e Box vinculados com sucesso!");
    } catch (error) {
      setToastError("Falha ao vincular técnico e box."); 
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (pageError) return <p style={{ color: 'red' }}>{pageError}</p>;

   return (

    <div className="geral-page-grid">
      {toastError && <ErrorToast message={toastError} onClose={() => setToastError(null)} />}
      {successMessage && <SuccessToast message={successMessage} onClose={() => setSuccessMessage(null)} />}

      <div className="column-geral">
        <ServiceOrderList 
          orderServices={osList}
          selectedOsId={selectedOsId}
          onOsSelect={handleOsSelect}
          onAddOsClick={() => setIsCreateOsModalOpen(true)}
        />
      </div>

      <div className="column-geral right-column-content">
        {selectedOsId ? (
          <ServiceOrderDetails 
            selectedOsDetails={selectedOsDetails}
            isLoading={isDetailsLoading}
            technicians={technicians}
            boxes={boxes}
            onPauseOs={handlePauseOs}
            onLinkTechnicianAndBox={handleLinkTechnicianAndBox}
          />
        ) : (
          <>
            <DailySummaryCard data={summaryData} />
            <TechnicianStatusCard technicians={technicianStatuses} />
          </>
        )}
      </div>

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

export default GeralPage;