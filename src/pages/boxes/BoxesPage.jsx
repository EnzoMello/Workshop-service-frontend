// src/pages/boxes/BoxesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBoxes, createBox, deleteBox } from '../../services/boxService';
import BoxCard from '../../components/features/box/Card/BoxCard';
import AddBoxModal from '../../components/features/box/AddModal/AddBoxModal';
import BatchDeleteBoxModal from '../../components/features/box/DeleteModal/BatchDeleteBoxModal';
import SearchBoxModal from '../../components/features/box/SearchModal/SearchBoxModal';
import '../technicians/main/TechniciansPage.css';

function BoxesPage() {
  const navigate = useNavigate();
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllBoxes();
      setBoxes(data);
      setError(null);
    } catch (err) {
      setError('Falha ao comunicar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBox = async (boxData) => {
    try {
      await createBox(boxData);
      fetchData();
      setIsAddModalOpen(false);
    } catch (err) {
      // O alerta que você está vendo é acionado aqui
      alert("Erro ao salvar o novo box.");
    }
  };

  const handleConfirmBatchDelete = async (idsToDelete) => {
    try {
      const deletePromises = idsToDelete.map(id => deleteBox(id));
      await Promise.all(deletePromises);
      fetchData();
      setIsBatchDeleteModalOpen(false);
    } catch (err) {
      alert("Erro ao deletar os boxes.");
    }
  };

  if (isLoading) { return <p>Carregando boxes...</p>; }
  if (error) { return <p style={{ color: 'red' }}>{error}</p>; }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Gerenciamento de Boxes</h1>
        <div className="page-actions">
          <button className="add-technician-btn" onClick={() => setIsAddModalOpen(true)}>Adicionar Box</button>
          <button className="update-data-btn" onClick={() => navigate('/boxes/update')}>Atualizar Dados</button>
          <button className="delete-technician-btn" onClick={() => setIsBatchDeleteModalOpen(true)}>Deletar Boxes</button>
        </div>
        <div className="technicians-container">
          {boxes.map((box, index) => (
            <BoxCard key={box.id} box={box} style={{ animationDelay: `${index * 100}ms` }} />
          ))}
        </div>
        {boxes.length === 0 && !isLoading && <p>Nenhum box encontrado.</p>}
      </div>
      {isAddModalOpen && (<AddBoxModal onClose={() => setIsAddModalOpen(false)} onAddBox={handleAddBox} />)}
      {isSearchModalOpen && (<SearchBoxModal onClose={() => setIsSearchModalOpen(false)} boxes={boxes} />)}
      {isBatchDeleteModalOpen && (<BatchDeleteBoxModal boxes={boxes} onClose={() => setIsBatchDeleteModalOpen(false)} onConfirm={handleConfirmBatchDelete} />)}
    </div>
  );
}

export default BoxesPage;