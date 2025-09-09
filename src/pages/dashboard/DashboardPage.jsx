// src/pages/dashboard/DashboardPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { getAllBoxes } from '../../services/boxService';
import { getActiveDashboardOS, getOrderServiceById } from '../../services/orderService';
import RealtimeMonitor from '../../components/features/dashboard/RealtimeMonitor';
import './DashboardPage.css';

function DashboardPage() {
  const [boxes, setBoxes] = useState([]);
  const [activeOsList, setActiveOsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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