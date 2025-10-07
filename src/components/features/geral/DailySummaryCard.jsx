/**
 * @file DailySummaryCard.jsx
 * @brief Componente de card que exibe um resumo dos indicadores (KPIs) do dia.
 * @author Enzo Mello
 *
 * @description Usado na página "Geral", este card mostra métricas chave da operação da oficina,
 * como o total de Ordens de Serviço, quantas estão em andamento, pausadas e as que foram concluídas no dia.
 */
import React from 'react';
import { FaChartBar, FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import './SummaryCard.css'; 

/**
 * @brief Card de Resumo do Dia.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.data - Objeto contendo os dados numéricos do resumo.
 * @param {number} props.data.total - Número total de OS.
 * @param {number} props.data.inProgress - Número de OS em andamento.
 * @param {number} props.data.paused - Número de OS pausadas.
 * @param {number} props.data.finishedToday - Número de OS concluídas hoje.
 * @returns {JSX.Element} O card de resumo renderizado.
 */
function DailySummaryCard({ data }) {
  return (
    <div className="summary-card">
      <h3 className="summary-card-title">
        <FaChartBar /> Resumo do Dia
      </h3>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-value">{data.total}</span>
          <span className="summary-label">Total de OS</span>
        </div>
        <div className="summary-item">
          <FaPlay className="summary-icon green" />
          <span className="summary-value">{data.inProgress}</span>
          <span className="summary-label">Em Andamento</span>
        </div>
        <div className="summary-item">
          <FaPause className="summary-icon yellow" />
          <span className="summary-value">{data.paused}</span>
          <span className="summary-label">Pausadas</span>
        </div>
        <div className="summary-item">
          <FaCheck className="summary-icon gray" />
          <span className="summary-value">{data.finishedToday}</span>
          <span className="summary-label">Concluídas Hoje</span>
        </div>
      </div>
    </div>
  );
}

export default DailySummaryCard;