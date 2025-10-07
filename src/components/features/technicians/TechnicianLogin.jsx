/**
 * @file TechnicianLogin.jsx
 * @brief Formulário de login para o técnico inserir seu código RFID.
 */
import React, { useState } from 'react';
import './TechnicianLogin.css';

function TechnicianLogin({ onLogin, error, isLoading }) {
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
        <p>Aproxime seu crachá ou digite o código RFID para acessar sua fila de trabalho.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="rfid-input"
            placeholder="Código RFID"
            value={rfidCode}
            onChange={(e) => setRfidCode(e.target.value)}
            autoFocus
          />
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Acessar'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default TechnicianLogin;