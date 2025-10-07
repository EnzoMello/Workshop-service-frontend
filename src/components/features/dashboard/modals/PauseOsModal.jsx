
/**
 * @file PauseOsModal.jsx
 * @brief Componente de modal para pausar uma Ordem de Serviço.
 * @author Enzo Mello
 *
 * @description Permite ao usuário selecionar um motivo pré-definido para a pausa
 * de uma OS antes de confirmar a ação.
 *
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onClose - Callback para fechar o modal.
 * @param {function} props.onConfirm - Callback executado com a string do motivo da pausa selecionado.
 *
 * @returns {JSX.Element} O modal de pausa de OS.
 */

import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';
import 'pages/technicians/update/UpdateTechniciansPage.css'; 

/**
 * @brief Lista de motivos de pausa pré-definidos.
 * @type {Array<string>}
 */
const pauseReasons = [
  'Aguardando Aprovação',
  'Aguardando Decisão',
  'Aguardando Peças',
  'Aguardando Serv. Terceiros'
];

function PauseOsModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState(pauseReasons[0]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h2>Pausar Ordem de Serviço</h2><button className="close-btn" onClick={onClose}>&times;</button></div>
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onConfirm(reason); onClose(); }}>
          <div className="form-group">
            <label htmlFor="reason">Selecione o motivo da pausa:</label>
            <select id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="filter-select">
              {pauseReasons.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="confirm-delete-btn">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PauseOsModal;