
/**
 * @file BoxCard.jsx
 * @brief Componente de card para exibir informações de um Box.
 * @author Enzo Mello
 *
 * @description Exibe o identificador e o status de um box. A cor do card
 * muda com base no status (verde para 'AVAILABLE', vermelho para outros).
 * Reutiliza estilos do TechnicianCard.
 *
 * @param {object} props - Propriedades do componente.
 * @param {object} props.box - O objeto contendo os dados do box.
 * @param {object} [props.style] - Estilos em linha opcionais, usados para animações.
 *
 * @returns {JSX.Element} O card de box renderizado.
 */
import React from 'react';
import 'components/features/technicians/Card/TechnicianCard.css'; 

const statusTextMap = {
  AVAILABLE: 'Disponível',
  
};

function BoxCard({ box, style }) {

  const cardStatus = box.status === 'AVAILABLE' ? 'green' : 'red';
  
  const cardClasses = `technician-card status-${cardStatus}`;
  const headerClasses = `card-header status-${cardStatus}`;

  return (
    <div className={cardClasses} style={style}>
      <div className={headerClasses}>
        {}
        <h3 className="card-name">{box.identifier}</h3>
      </div>
      <div className="card-body">
        {}
        <p className="card-info"><strong>Status:</strong> {statusTextMap[box.status] || box.status}</p>
      </div>
    </div>
  );
}

export default BoxCard;