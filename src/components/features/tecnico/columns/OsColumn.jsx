import React from 'react';
import './Columns.css';

function OsColumn({ osList, onOsSelect, selectedOsId }) {
  return (
    <div className="tech-column">
      <div className="column-header">Ordens de Serviço</div>
      <div className="column-content">
        {osList.map(os => (
          <div 
            key={os.id} 
            className={`list-item ${selectedOsId === os.id ? 'selected' : ''}`}
            onClick={() => onOsSelect(os.id)}
          >
            <span className="item-title">OS-{os.osNumber}</span>
            <span className={`item-status status-${os.status}`}>{os.status.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default OsColumn;