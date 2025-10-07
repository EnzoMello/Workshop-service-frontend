/**
 * @file TechnicianStatusCard.jsx
 * @brief Componente de card que exibe o status de disponibilidade de cada técnico.
 * @author Enzo Mello
 *
 * @description Este card é usado na página "Geral" para mostrar uma lista de todos os técnicos
 * e indicar se eles estão 'Livres' ou 'Ocupados' com base nas Ordens de Serviço ativas.
 */
import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import './SummaryCard.css'; 

/**
 * @brief Card de Status dos Técnicos.
 * @param {object} props - Propriedades do componente.
 * @param {Array<object>} props.technicians - A lista de objetos de técnicos. Cada objeto deve conter id, name e uma flag isBusy.
 * @returns {JSX.Element} O card renderizado com a lista de técnicos e seus status.
 */
function TechnicianStatusCard({ technicians }) {
  return (
    <div className="summary-card">
      <h3 className="summary-card-title">
        <FaUserCog /> Status dos Técnicos
      </h3>
      <ul className="tech-status-list">
        {technicians.map(tech => (
          <li key={tech.id} className="tech-status-item">
            <span>{tech.name}</span>
            {tech.isBusy ? (
              <span className="tech-badge busy">Ocupado</span>
            ) : (
              <span className="tech-badge free">Livre</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechnicianStatusCard;