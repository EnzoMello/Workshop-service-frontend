/**
 * @file OsDetailsView.jsx
 * @brief Componente que exibe uma visão detalhada de uma Ordem de Serviço.
 * @author Enzo Mello
 *
 * @description Este componente é usado como o painel lateral no Dashboard para mostrar
 * informações completas de uma OS selecionada, como técnico, box, horários e status.
 */
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './OsDetailsView.css';

/**
 * @brief Mapeamento de status da API para texto e classes de CSS para o badge.
 * @type {object}
 */
const statusBadgeMap = {
  NOT_STARTED: { text: 'PENDENTE', className: 'badge-pending' },
  IN_PROGRESS: { text: 'EM ANDAMENTO', className: 'badge-in-progress' },
  FINISHED: { text: 'CONCLUÍDO', className: 'badge-finished' },
  PAUSED: { text: 'PAUSADO', className: 'badge-paused' }, 
};

/**
 * @brief Painel de Visão de Detalhes da OS.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.osDetails - Objeto contendo os detalhes completos da OS a ser exibida.
 * @param {function} props.onClose - Função de callback para fechar a visão de detalhes.
 * @returns {JSX.Element} O painel de detalhes da OS renderizado.
 */
function OsDetailsView({ osDetails, onClose }) {
  const statusInfo = statusBadgeMap[osDetails.status] || { text: osDetails.status, className: 'badge-pending' };

  return (
    <div className="os-details-view">
      <button className="back-button-icon" onClick={onClose} title="Voltar para o Layout">
        <FaArrowLeft />
      </button>

      <div className="details-header">
        <h3>OS-{osDetails.osNumber}</h3>
        <span className={`status-badge ${statusInfo.className}`}>{statusInfo.text}</span>
      </div>

      <div className="details-body">
        <div className="info-row"><span className="label">Técnico:</span><span>{osDetails.technicianName || 'Nenhum'}</span></div>
        <div className="info-row"><span className="label">Box:</span><span>{osDetails.boxName || 'Nenhum'}</span></div>
        <div className="info-row"><span className="label">Início:</span><span>{osDetails.startTime ? new Date(osDetails.startTime).toLocaleString('pt-BR') : 'Não iniciado'}</span></div>
        <div className="info-row"><span className="label">Fim:</span><span>{osDetails.endTime ? new Date(osDetails.endTime).toLocaleString('pt-BR') : 'Não finalizado'}</span></div>
        <div className="info-row"><span className="label">Motivo da Pausa:</span><span>{osDetails.pauseReason || 'Nenhum'}</span></div>
      </div>
    </div>
  );
}

export default OsDetailsView;