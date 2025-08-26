import React, { useState } from 'react';
import 'components/features/technicians/AddModal/AddTechnicianModal.css';
import 'components/features/technicians/DeleteModal/BatchDeleteModal.css';
import 'pages/technicians/update/UpdateTechniciansPage.css'; // Reutiliza estilo do <select>

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
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onConfirm(reason); }}>
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