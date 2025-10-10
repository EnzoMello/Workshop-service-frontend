/**
 * @file TechnicianRfidLogin.jsx
 * @brief Componente para o formulário de login via código RFID para técnicos.
 */
import React, { useState } from 'react';
import './TechnicianRfidLogin.css';

function TechnicianRfidLogin({ onLogin, error, isLoading }) {
  const [rfidCode, setRfidCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rfidCode.trim()) {
      onLogin(rfidCode.trim());
    }
  };

  return (
    <div className="tech-login-container">
      <div className="tech-login-box">
        <h2>Identificação do Técnico</h2>
        <p>Por favor, digite seu código RFID para acessar sua fila de trabalho.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="rfid-input"
            placeholder="Código RFID"
            value={rfidCode}
            onChange={(e) => setRfidCode(e.target.value)}
            autoFocus
            disabled={isLoading}
          />
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Acessar Fila'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default TechnicianRfidLogin;