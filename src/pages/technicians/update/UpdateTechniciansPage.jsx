// src/pages/UpdateTechniciansPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllTechnicians } from '../../../services/technicianService';
import UpdateTechnicianModal from '../../../components/features/technicians/UpdateModal/UpdateTechnicianModal';
import './UpdateTechniciansPage.css';

const LOCAL_STORAGE_KEY = 'workshop_technicians';

function UpdateTechniciansPage() {
  // Estados da Página
  const [allTechnicians, setAllTechnicians] = useState([]); // Lista original de técnicos
  const [searchTerm, setSearchTerm] = useState(''); // Termo da busca
  const [sortOrder, setSortOrder] = useState('none'); // Ordem de filtro ('none', 'asc', 'desc')
  const [selectedTechnicianId, setSelectedTechnicianId] = useState(null); // ID do técnico selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Visibilidade do modal
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const navigate = useNavigate(); // 3. Inicialize o hook de navegação


  // Busca os dados iniciais uma vez
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTechnicians();
      setAllTechnicians(data);
    };
    fetchData();
  }, []);

  const handleSortChange = (order) => {
    setSortOrder(order); // Define a nova ordem (ex: 'asc', 'desc')
    setIsFilterMenuOpen(false); // Fecha o menu de filtro
  };

  // --- Lógica de Busca e Filtro ---
  const filteredAndSortedTechnicians = useMemo(() => {
    let result = [...allTechnicians];

    // 1. Filtrar pela busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(tech =>
        tech.name.toLowerCase().includes(term) ||
        String(tech.id).includes(term) ||
        tech.rfidCode.toLowerCase().includes(term)
      );
    }

    // 2. Ordenar
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [allTechnicians, searchTerm, sortOrder]); // Recalcula apenas quando uma dessas dependências mudar

  // --- Funções Handler ---
  const handleSave = (updatedTechnician) => {
    // Encontra e atualiza o técnico na lista
    const updatedList = allTechnicians.map(tech =>
      tech.id === updatedTechnician.id ? updatedTechnician : tech
    );
    setAllTechnicians(updatedList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
    setIsModalOpen(false);
    setSelectedTechnicianId(null); // Desmarca a seleção
  };
  
  const selectedTechnician = allTechnicians.find(tech => tech.id === selectedTechnicianId);

  return (
    <div>
      <div className="page-header"><h1>Atualizar Funcionários</h1></div>
      <div className="page-title-container">
          <button className="back-button" onClick={() => navigate('/technicians')}>
            <FaArrowLeft /> Voltar para a Lista
          </button>
      </div>
      <div className="page-content">
        <div className="update-page-controls">
          <div className="search-filter-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Pesquisar por nome, ID ou RFID..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* NOVO: Container para o botão de filtro e seu dropdown */}
            <div className="filter-container">
              {/* O botão agora abre e fecha o menu */}
              <button className="filter-btn" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
                Aplicar Filtro ▾
              </button>
              
              {/* O menu dropdown só aparece se isFilterMenuOpen for true */}
              {isFilterMenuOpen && (
                <div className="filter-dropdown">
                  <div className="filter-option" onClick={() => handleSortChange('asc')}>
                    Ordem Alfabética: A-Z
                  </div>
                  <div className="filter-option" onClick={() => handleSortChange('desc')}>
                    Ordem Alfabética: Z-A
                  </div>
                  <div className="filter-option" onClick={() => handleSortChange('none')}>
                    Resetar Ordem
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="update-action-btn"
            disabled={!selectedTechnicianId} // Desabilitado se ninguém for selecionado
            onClick={() => setIsModalOpen(true)}
          >
            Atualizar Técnico
          </button>
        </div>

      <ul className="update-list">
      {filteredAndSortedTechnicians.map(tech => (
      // O onClick agora está no <li>, o que torna a linha inteira clicável
        <li 
        key={tech.id} 
        className="update-list-item"
        onClick={() => setSelectedTechnicianId(tech.id)}
       >
        <input
          type="radio"
          name="technician-select"
          checked={selectedTechnicianId === tech.id}
          // O onChange agora apenas lê o estado, o onClick no <li> faz a mágica
          readOnly 
        />
        <span className="item-name">{tech.name}</span>
        <span className="item-details">
          <strong>ID:</strong> {tech.id} | <strong>RFID:</strong> {tech.rfidCode} | <strong>Função:</strong> {tech.role}
        </span>
      </li>
    ))}
        </ul>
      </div>

      {isModalOpen && (
        <UpdateTechnicianModal
          technician={selectedTechnician}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default UpdateTechniciansPage;