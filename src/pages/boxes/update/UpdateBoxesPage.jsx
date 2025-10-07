/**
 * @file UpdateBoxesPage.jsx
 * @brief Página para atualização de dados dos Boxes.
 * @author Enzo Mello
 *
 * @description Apresenta uma lista detalhada de todos os boxes, com funcionalidades
 * de busca e ordenação. Permite ao usuário selecionar um box na lista para abrir
 * um modal e atualizar suas informações.
 */


import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllBoxes, updateBox } from '../../../services/boxService';
import UpdateBoxModal from '../../../components/features/box/UpdateModal/UpdateBoxModal';
import 'pages/technicians/update/UpdateTechniciansPage.css'; 

/**
 * @brief Componente da página de atualização de boxes.
 * @description Gerencia o estado da lista de boxes, filtros de busca/ordem e a seleção
 * para atualização via modal.
 * @returns {JSX.Element} A página de atualização de boxes renderizada.
 */
function UpdateBoxesPage() {
  const navigate = useNavigate();
  
  const [allBoxes, setAllBoxes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  /**
   * @brief Busca os dados iniciais de todos os boxes.
   */
  const fetchData = async () => {
    try {
        const data = await getAllBoxes();
        setAllBoxes(data);
    } catch (error) {
        console.error("Falha ao buscar boxes", error);
    }
  };

  /**
   * @brief Efeito que busca os dados ao montar o componente.
   */
  useEffect(() => { fetchData(); }, []);

  /**
   * @brief Memoiza o resultado da filtragem e ordenação da lista de boxes para otimizar performance.
   * @returns {Array<object>} A lista de boxes filtrada e ordenada.
   */
  const filteredAndSortedBoxes = useMemo(() => {
    let result = [...allBoxes];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(box =>
        box.identifier.toLowerCase().includes(term) || String(box.id).includes(term) || box.esp32Id.toLowerCase().includes(term)
      );
    }
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.identifier.localeCompare(b.identifier));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.identifier.localeCompare(a.identifier));
    }
    return result;
  }, [allBoxes, searchTerm, sortOrder]);

  /**
   * @brief Salva as informações atualizadas de um box via API.
   * @param {object} updatedBox - O objeto do box com os dados atualizados.
   */
  const handleSave = async (updatedBox) => {
    try {
      await updateBox(updatedBox);
      fetchData();
      setIsModalOpen(false);
      setSelectedBoxId(null);
    } catch (err) {
      alert("Erro ao atualizar o box.");
    }
  };
  
  /**
   * @brief Manipula a mudança de ordenação da lista.
   * @param {('asc'|'desc'|'none')} order - A ordem de sorteio selecionada.
   */
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsFilterMenuOpen(false);
  };
  
  const selectedBox = allBoxes.find(box => box.id === selectedBoxId);

  return (
    <div>
      <div className="page-header">
        <div className="page-title-container">
          <button className="back-button" onClick={() => navigate('/boxes')}>
            <FaArrowLeft /> Voltar para a Lista
          </button>
        </div>
      </div>
      <div className="page-content">
        <div className="update-page-controls">
          <div className="search-filter-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Pesquisar por identificador, ID ou ESP32 ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-container">
              <button className="filter-btn" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
                Aplicar Filtro ▾
              </button>
              {isFilterMenuOpen && (
                <div className="filter-dropdown">
                  <div className="filter-option" onClick={() => handleSortChange('asc')}>Ordem Alfabética: A-Z</div>
                  <div className="filter-option" onClick={() => handleSortChange('desc')}>Ordem Alfabética: Z-A</div>
                  <div className="filter-option" onClick={() => handleSortChange('none')}>Resetar Ordem</div>
                </div>
              )}
            </div>
          </div>
          <button
            className="update-action-btn"
            disabled={!selectedBoxId}
            onClick={() => setIsModalOpen(true)}
          >
            Atualizar Selecionado
          </button>
        </div>
        <ul className="update-list">
          {filteredAndSortedBoxes.map(box => (
            <li key={box.id} className="update-list-item" onClick={() => setSelectedBoxId(box.id)}>
              <input type="radio" name="box-select" checked={selectedBoxId === box.id} readOnly />
              <span className="item-name">{box.identifier}</span>
              <span className="item-details">
                <strong>ID:</strong> {box.id} | <strong>ESP32 ID:</strong> {box.esp32Id}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && <UpdateBoxModal box={selectedBox} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
    </div>
  );
}

export default UpdateBoxesPage;