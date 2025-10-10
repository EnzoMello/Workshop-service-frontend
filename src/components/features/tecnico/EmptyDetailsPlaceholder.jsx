import React from 'react';
import { FaMousePointer } from 'react-icons/fa';
import './EmptyDetailsPlaceholder.css';

function EmptyDetailsPlaceholder() {
  return (
    <div className="empty-details-placeholder">
      <FaMousePointer size={40} />
      <h2>Nenhuma OS Selecionada</h2>
      <p>Selecione uma Ordem de Serviço na lista à esquerda para ver os detalhes, tarefas e iniciar o trabalho.</p>
    </div>
  );
}
export default EmptyDetailsPlaceholder;