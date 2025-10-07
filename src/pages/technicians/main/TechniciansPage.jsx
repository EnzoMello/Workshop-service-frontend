

/**
 * @file TechniciansPage.jsx
 * @brief Página principal para gerenciamento de Técnicos.
 * @author Enzo Mello
 *
 * @description Esta página exibe todos os técnicos cadastrados em um layout de cards.
 * Ela permite ao usuário adicionar novos técnicos, navegar para a página de atualização
 * e deletar técnicos em lote através de modais.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTechnicians, createTechnician, deleteTechnician } from '../../../services/technicianService';
import TechnicianCard from '../../../components/features/technicians/Card/TechnicianCard';
import AddTechnicianModal from '../../../components/features/technicians/AddModal/AddTechnicianModal';
import BatchDeleteModal from '../../../components/features/technicians/DeleteModal/BatchDeleteModal';
import './TechniciansPage.css';


/**
 * @file TechniciansPage.jsx
 * @brief Página principal para gerenciamento de Técnicos.
 * @author Enzo Mello
 *
 * @description Esta página exibe todos os técnicos cadastrados em um layout de cards.
 * Ela permite ao usuário adicionar novos técnicos, navegar para a página de atualização
 * e deletar técnicos em lote através de modais.
 */

function TechniciansPage() {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);

  /**
   * @brief Busca a lista de todos os técnicos da API e atualiza o estado do componente.
   */
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTechnicians();
      setTechnicians(data);
      setError(null);
    } catch (err) {
      setError('Falha ao comunicar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @brief Efeito que chama a função fetchData uma vez quando o componente é montado.
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * @brief Manipula a submissão do modal de adição de técnico.
   * @param {object} technicianData - Os dados do novo técnico a ser criado.
   */
  const handleAddTechnician = async (technicianData) => {
    try {
      await createTechnician(technicianData);
      fetchData();
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Erro ao salvar o técnico.");
    }
  };

  /**
   * @brief Manipula a confirmação de deleção em lote de técnicos.
   * @param {Array<string>} idsToDelete - Um array com os IDs dos técnicos a serem deletados.
   */
  const handleConfirmBatchDelete = async (idsToDelete) => {
    try {
      const deletePromises = idsToDelete.map(id => deleteTechnician(id));
      await Promise.all(deletePromises);
      fetchData();
      setIsBatchDeleteModalOpen(false);
    } catch (err) {
      alert("Erro ao deletar os técnicos.");
    }
  };

  if (isLoading) { return <p>Carregando técnicos...</p>; }
  if (error) { return <p style={{ color: 'red' }}>{error}</p>; }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Gerenciamento de Técnicos</h1>
        <div className="page-actions">
          <button className="add-technician-btn" onClick={() => setIsAddModalOpen(true)}>Adicionar Técnico</button>
          <button className="update-data-btn" onClick={() => navigate('/update')}>Atualizar Dados</button>
          <button className="delete-technician-btn" onClick={() => setIsBatchDeleteModalOpen(true)}>Deletar Técnicos</button>
        </div>
        <div className="technicians-container">
          {technicians.map((tech, index) => (
            <TechnicianCard key={tech.id} technician={tech} style={{ animationDelay: `${index * 100}ms` }} />
          ))}
        </div>
      </div>
      
      {isAddModalOpen && (<AddTechnicianModal onClose={() => setIsAddModalOpen(false)} onAddTechnician={handleAddTechnician} />)}
      
      {isBatchDeleteModalOpen && (
        <BatchDeleteModal 
          technicians={technicians} 
          onClose={() => setIsBatchDeleteModalOpen(false)} 
          onConfirm={handleConfirmBatchDelete} 
        />
      )}
    </div>
  );
}

export default TechniciansPage;