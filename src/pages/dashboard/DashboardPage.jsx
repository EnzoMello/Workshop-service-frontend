
/**
 * @file DashboardPage.jsx
 * @brief Define a página "Dashboard", a visão principal do layout da oficina em tempo real.
 * @author Enzo Mello
 *
 * @description O objetivo principal desta página é buscar os dados necessários (lista de todos os boxes e lista de OS ativas)
 * e passá-los para o componente RealtimeMonitor, que renderiza a visualização em tela cheia da oficina.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { getAllBoxes } from '../../services/boxService';
import { getActiveDashboardOS, getOrderServiceById } from '../../services/orderService';
import RealtimeMonitor from '../../components/features/dashboard/RealtimeMonitor';
import './DashboardPage.css';

function DashboardPage() {
  const [boxes, setBoxes] = useState([]);
  const [activeOsList, setActiveOsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @brief Busca os dados iniciais necessários para o layout da oficina.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [boxesData, activeOsData] = await Promise.all([
          getAllBoxes(),
          getActiveDashboardOS()
        ]);
        setBoxes(boxesData || []);
        setActiveOsList(activeOsData || []);
      } catch (err) {
        console.error("Não foi possível carregar os dados do dashboard.", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Carregando Dashboard...</p>;

  return (
    <div className="dashboard-page-full">
      <RealtimeMonitor 
        allBoxes={boxes} 
        initialActiveOs={activeOsList} 
        onFetchOsDetails={getOrderServiceById}
      />
    </div>
  );
}

export default DashboardPage;