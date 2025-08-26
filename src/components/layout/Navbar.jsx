// src/components/Navbar.jsx

import React, { useState } from 'react';
// 1. Importa o componente 'Link' para a navegação
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // Estado para controlar qual menu dropdown está visível
  const [activeMenu, setActiveMenu] = useState(null);

  // 2. Os caminhos ('path') foram atualizados para corresponder às nossas rotas
  const menuItems = {
    tecnicos: [
      { label: 'Gerenciar Técnicos', path: '/' },
      { label: 'Atualizar Funcionários', path: '/update' },
    ],
    boxes: [
      { label: 'Gerenciar Boxes', path: '/boxes' }, 
      { label: 'Atualizar Boxes', path: '/boxes/update' },     
    ],
    tarefas: [
      { label: 'Gerenciar Tarefas', path: '/tasks' },      
      { label: 'Atualizar Tarefa', path: '/tasks/update' },  
    ],
  };

  // Função para fechar qualquer menu que esteja aberto
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="navbar">
      {/* Seção do logo à esquerda */}
      <div className="nav-section nav-logo">
        {/* 3. A tag <a> foi trocada por <Link> */}
        <Link to="/">Grupo New Toyota</Link>
      </div>
      
      {/* Seção dos links no centro */}
      <div className="nav-section nav-links" onMouseLeave={handleMouseLeave}>
        <ul className="nav-list">
          <li className="nav-item" onMouseEnter={() => setActiveMenu('tecnicos')}>
            <span>Técnicos</span>
            {activeMenu === 'tecnicos' && (
              <div className="dropdown-menu">
                {/* 4. As tags <a> dentro do menu também foram trocadas por <Link> */}
                {menuItems.tecnicos.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li className="nav-item" onMouseEnter={() => setActiveMenu('boxes')}>
            <span>Boxes</span>
            {activeMenu === 'boxes' && (
              <div className="dropdown-menu">
                {menuItems.boxes.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li className="nav-item" onMouseEnter={() => setActiveMenu('tarefas')}>
            <span>Tarefas (OS)</span>
            {activeMenu === 'tarefas' && (
              <div className="dropdown-menu">
                {menuItems.tarefas.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Seção vazia à direita para manter o equilíbrio do layout */}
      <div className="nav-section nav-placeholder"></div>
    </nav>
  );
}

export default Navbar;