// src/components/features/dashboard/RealtimeMonitor.jsx

import React, { useMemo } from 'react';
import { FaCar } from 'react-icons/fa';
import { useWebSocket } from '../../../hooks/useWebSocket'; // Mantém seu hook
import DashboardBoxCard from '../dashboardBoxCard/DashboardBoxCard';
import './RealtimeMonitor.css';

// 1. Recebe a lista completa de boxes e a lista inicial de OS ativas
function RealtimeMonitor({ allBoxes = [], initialActiveOs = [] }) {

  console.log("RealtimeMonitor RECEBEU:", { allBoxes, initialActiveOs });

  
  // 2. O hook WebSocket continua aqui, garantindo as atualizações em tempo real!
  const activeOsList = useWebSocket(initialActiveOs);

  // 3. A lógica para combinar os dados agora fica DENTRO deste componente.
  //    Ele vai re-calcular sempre que a lista de OS do WebSocket mudar.
  const boxStatuses = useMemo(() => {
    const activeOsMap = new Map(activeOsList.map(os => [os.boxName, os]));

    return allBoxes.map(box => {
      const activeOs = activeOsMap.get(box.identifier);
      if (activeOs) {
        return {
          id: box.id,
          name: box.identifier,
          statusColor: activeOs.statusColor?.toLowerCase() || 'gray',
          orderServiceNumber: activeOs.orderServiceNumber,
        };
      } else {
        return {
          id: box.id,
          name: box.identifier,
          statusColor: 'available',
          orderServiceNumber: null,
        };
      }
    });
    
  }, [allBoxes, activeOsList]); // Depende dos boxes e da lista de OS em tempo real

  // 4. A lógica para dividir em colunas e renderizar o layout visual
  // Esta nova versão remove QUALQUER caractere que não seja um dígito
  const getBoxNumber = (name) => {
    if (!name || typeof name !== 'string') {
      return 0;
    }
    const justNumbers = name.replace(/\D/g, ''); // Ex: "BOX-01" vira "01"
    return parseInt(justNumbers, 10);
  };

  const leftColumnBoxes = boxStatuses
    .filter(box => getBoxNumber(box.name) >= 11)
    .sort((a, b) => getBoxNumber(b.name) - getBoxNumber(a.name));

  const rightColumnBoxes = boxStatuses
    .filter(box => getBoxNumber(box.name) <= 10)
    .sort((a, b) => getBoxNumber(a.name) - getBoxNumber(b.name));

    console.log("COLUNAS PARA RENDERIZAR:", { leftColumnBoxes, rightColumnBoxes });

  return (
    <div className="workshop-layout-monitor">
      <h2 className="monitor-title">
        <FaCar /> Layout da Oficina
      </h2>
      <div className="layout-container">
        <div className="layout-column">
          {leftColumnBoxes.map(box => <DashboardBoxCard key={box.id} box={box} />)}
        </div>
        <div className="layout-column">
          {rightColumnBoxes.map(box => <DashboardBoxCard key={box.id} box={box} />)}
        </div>
      </div>
    </div>
  );
}

export default RealtimeMonitor;