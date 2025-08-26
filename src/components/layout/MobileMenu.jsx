// src/components/layout/MobileMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

// ATUALIZADO: Lista de links de navegação com os caminhos corretos
const menuLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Gerenciar Técnicos', path: '/technicians' },
  { label: 'Gerenciar Boxes', path: '/boxes' },
  { label: 'Gerenciar Tarefas', path: '/tasks' },
  // A rota de "Atualizar" genérica foi removida para evitar confusão,
  // pois cada página terá seu próprio botão de atualização.
];

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
      <button className="burger" onClick={toggleMenu} aria-label="Abrir menu">
        <div className="burger-icon"></div>
      </button>
      <div className="menu">
        <nav>
          {menuLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;