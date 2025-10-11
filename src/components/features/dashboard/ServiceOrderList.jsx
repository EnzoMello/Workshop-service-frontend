
/**
 * @file ServiceOrderList.jsx
 * @brief Componente que exibe a lista de Ordens de Serviço na página Geral.
 * @author Enzo Mello
 *
 * @param {object} props - Propriedades do componente.
 * @param {Array<object>} props.orderServices - A lista de OS a ser exibida.
 * @param {string|null} props.selectedOsId - O ID da OS atualmente selecionada, para destaque visual.
 * @param {function} props.onOsSelect - Função de callback chamada quando uma OS é selecionada.
 * @param {function} props.onAddOsClick - Função de callback para abrir o modal de criação de OS.
 *
 * @returns {JSX.Element} O card com a lista de Ordens de Serviço.
 */

import React, { useMemo } from 'react';
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import ServiceOrderCard from './cards/ServiceOrderCard';
import './ServiceOrderList.css';

/// Recebe as props da DashboardPage
function ServiceOrderList({ orderServices, selectedOsId, onOsSelect, onAddOsClick, showAddButton = true }) {

  /// Lógica para ordenar a lista de OS com base no status
  const sortedOs = useMemo(() => {
    // Define a prioridade de cada status
    const order = {
      IN_PROGRESS: 1,
      PAUSED: 2,
      NOT_STARTED: 3,
      FINISHED: 4,
    };
    // Cria uma cópia do array e o ordena
    return [...(orderServices || [])].sort((a, b) => {
      const orderA = order[a.status] || 99; // Se o status for desconhecido, joga para o final
      const orderB = order[b.status] || 99;
      return orderA - orderB;
    });
  }, [orderServices]);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h2 className="card-title"><FaClipboardList /> Ordens de Serviço</h2>
         {showAddButton && (
          <button className="add-os-btn" onClick={onAddOsClick}>
            <FaPlus /> Adicionar OS
          </button>
        )}
      </div>

      {/* Conteúdo com a lista de cartões */}
      <div className="card-content os-list-content">
        <div className="os-card-list">
          {sortedOs.map(os => (
            <ServiceOrderCard 
              key={os.id} 
              os={os}
              isSelected={os.id === selectedOsId}
              onClick={() => onOsSelect(os.id)}
            />
          ))}
        </div>
        
        {sortedOs.length === 0 && <p style={{textAlign: 'center', color: '#666', marginTop: '20px'}}>Nenhuma OS encontrada.</p>}
      </div>
    </div>
  );
}

export default ServiceOrderList;