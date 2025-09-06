// src/components/features/dashboard/DashboardBoxCard.jsx
import React from 'react';
import './DashboardBoxCard.css'; // Usará seu próprio arquivo CSS

function DashboardBoxCard({ box }) {
  // A classe de cor (ex: 'status-green', 'status-red') vem direto dos dados
  const statusColorClass = `status-${box.statusColor}`;

  return (
    <div className={`dashboard-box-card ${statusColorClass}`}>
      <span className="dashboard-box-name">{box.name}</span>
      {box.orderServiceNumber && (
        <span className="dashboard-box-os-number">OS-{box.orderServiceNumber}</span>
      )}
    </div>
  );
}

export default DashboardBoxCard;