// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu'; // 1. IMPORTE o novo componente

import './Header.css';

function Header() {
  // --- Lógica para o Relógio em Tempo Real ---
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // A cada segundo (1000ms), atualiza o estado com a nova hora
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Função de limpeza: remove o intervalo quando o componente for desmontado
    // Isso evita vazamentos de memória.
    return () => clearInterval(timerId);
  }, []); // O `[]` vazio garante que este efeito rode apenas uma vez

  return (
    <header className="app-header">
      <div className="header-content">
        {/* --- LADO ESQUERDO --- */}
        <div className="header-left">
          <MobileMenu />
          <img src="/assets/logo.png" alt="Logo da Empresa" className="company-logo" />
          <h1 className="company-name">GRUPO NEW TOYOTA</h1>
        </div>

        {/* --- LADO DIREITO --- */}
        <div className="header-right">
          {/* O relógio que se atualiza em tempo real */}
          <div className="current-time">
            {currentTime.toLocaleString('pt-BR')}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;