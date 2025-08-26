// src/pages/boxes/update/UpdateBoxesPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
// 1. IMPORTE O 'useNavigate' E O ÍCONE
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllBoxes, updateBox } from '../../../services/boxService';
import UpdateBoxModal from '../../../components/features/box/UpdateModal/UpdateBoxModal';
import 'pages/technicians/update/UpdateTechniciansPage.css'; // Reutiliza o CSS

function UpdateBoxesPage() {
  // 2. INICIALIZE O HOOK 'useNavigate'
  const navigate = useNavigate();
  
  const [allBoxes, setAllBoxes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
        const data = await getAllBoxes();
        setAllBoxes(data);
    } catch (error) {
        console.error("Falha ao buscar boxes", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

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