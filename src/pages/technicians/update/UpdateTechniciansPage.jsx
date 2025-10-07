/**
 * @file UpdateTechniciansPage.jsx
 * @brief Página para atualização de dados dos funcionários (técnicos).
 * @author Enzo Mello
 *
 * @description Esta página apresenta uma lista detalhada de todos os técnicos,
 * com funcionalidades de busca por termo e ordenação alfabética. O usuário pode
 * selecionar um técnico na lista para abrir um modal e atualizar suas informações.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllTechnicians } from '../../../services/technicianService';
import UpdateTechnicianModal from '../../../components/features/technicians/UpdateModal/UpdateTechnicianModal';
import './UpdateTechniciansPage.css';

const LOCAL_STORAGE_KEY = 'workshop_technicians';

/**
 * @brief Componente da página de atualização de técnicos.
 * @description Gerencia o estado da lista de técnicos, filtros de busca/ordem e a seleção
 * para atualização através de um modal.
 * @returns {JSX.Element} A página de atualização de técnicos renderizada.
 */
function UpdateTechniciansPage() {
  // Estados da Página
  const [allTechnicians, setAllTechnicians] = useState([]); // Lista original de técnicos
  const [searchTerm, setSearchTerm] = useState(''); // Termo da busca
  const [sortOrder, setSortOrder] = useState('none'); // Ordem de filtro ('none', 'asc', 'desc')
  const [selectedTechnicianId, setSelectedTechnicianId] = useState(null); // ID do técnico selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Visibilidade do modal
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const navigate = useNavigate(); 


  /**
   * @brief Efeito que busca os dados iniciais dos técnicos ao montar o componente.
   */  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTechnicians();
      setAllTechnicians(data);
    };
    fetchData();
  }, []);

  /**
   * @brief Manipula a mudança de ordenação da lista.
   * @param {('asc'|'desc'|'none')} order 
   */
  const handleSortChange = (order) => {
    setSortOrder(order); 
    setIsFilterMenuOpen(false); 
  };

  /**
   * @brief Memoiza o resultado da filtragem e ordenação da lista de técnicos.
   * @description Esta função é recalculada apenas quando a lista original, o termo de busca ou a ordem mudam,
   * otimizando a performance da aplicação.
   * @returns {Array<object>} A lista de técnicos filtrada e ordenada.
   */
  const filteredAndSortedTechnicians = useMemo(() => {
    let result = [...allTechnicians];

    // Filtrar pela busca
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
  }, [allTechnicians, searchTerm, sortOrder]); 

  /**
   * @brief Salva as informações atualizadas de um técnico no estado local e no localStorage.
   * @param {object} updatedTechnician - O objeto do técnico com os dados atualizados.
   */
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

            <div className="filter-container">
              <button className="filter-btn" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
                Aplicar Filtro ▾
              </button>
              
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
        <li 
        key={tech.id} 
        className="update-list-item"
        onClick={() => setSelectedTechnicianId(tech.id)}
       >
        <input
          type="radio"
          name="technician-select"
          checked={selectedTechnicianId === tech.id}
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