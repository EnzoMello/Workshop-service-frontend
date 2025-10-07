/**
 * @file Header.jsx
 * @brief Componente que define o cabeçalho principal da aplicação.
 * @author Enzo Mello
 *
 * @description Este componente renderiza a barra superior fixa da aplicação,
 * que inclui o menu de navegação (MobileMenu), o logo e nome da empresa,
 * e um relógio que exibe a data e hora em tempo real.
 */
import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import './Header.css';

/**
 * @brief Componente de cabeçalho da aplicação.
 * @description Gerencia e exibe um relógio em tempo real e renderiza os
 * elementos principais do cabeçalho, como logo e menu.
 * @returns {JSX.Element} O elemento do cabeçalho da aplicação.
 */
function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  /**
   * @brief Efeito para atualizar o relógio a cada segundo.
   * @details Utiliza setInterval para atualizar o estado 'currentTime' e
   * clearInterval na função de limpeza para evitar vazamentos de memória.
   */
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <MobileMenu />
          <img src="/assets/logo.png" alt="Logo da Empresa" className="company-logo" />
          <h1 className="company-name">GRUPO NEW TOYOTA</h1>
        </div>

        <div className="header-right">
          <div className="current-time">
            {currentTime.toLocaleString('pt-BR')}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;