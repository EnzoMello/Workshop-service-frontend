// src/components/features/box/Card/BoxCard.jsx
import React from 'react';
import 'components/features/technicians/Card/TechnicianCard.css'; // Reutiliza o estilo

// Mapeia os status que vêm do back-end para o texto que queremos exibir
const statusTextMap = {
  AVAILABLE: 'Disponível',
  // Adicione outros mapeamentos de status aqui se necessário
  // ex: IN_USE: 'Em Uso'
};

function BoxCard({ box, style }) {
  // Define a cor do cartão com base no status. Se o status for 'AVAILABLE', a cor será verde.
  // Para qualquer outro status, a cor será vermelha, como no seu sistema de semáforo.
  const cardStatus = box.status === 'AVAILABLE' ? 'green' : 'red';
  
  const cardClasses = `technician-card status-${cardStatus}`;
  const headerClasses = `card-header status-${cardStatus}`;

  return (
    <div className={cardClasses} style={style}>
      <div className={headerClasses}>
        {/* O 'identifier' (ex: "BOX-01") agora é o título principal */}
        <h3 className="card-name">{box.identifier}</h3>
      </div>
      <div className="card-body">
        {/* Exibe o 'esp32Id' e o 'status' no corpo do cartão */}
        <p className="card-info"><strong>Status:</strong> {statusTextMap[box.status] || box.status}</p>
      </div>
    </div>
  );
}

export default BoxCard;