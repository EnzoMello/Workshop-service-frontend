// src/services/technicianService.js
import api from './api';


export const getAllTechnicians = async () => {
  try {
    const response = await api.get('/technicians');
    if (response.data && response.data.length > 0) {
      return response.data;
    } else {
      console.log("Nenhum técnico no banco, usando dados simulados.");
      return fallbackTechnicians;
    }
  } catch (error) {
    console.error("Falha ao buscar técnicos, usando dados simulados.", error);
    return fallbackTechnicians;
  }
};

// Cria um novo técnico
export const createTechnician = async (technicianData) => {
  try {
    const response = await api.post('/technicians', technicianData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar técnico:", error);
    throw error;
  }
};

// Deleta um técnico pelo ID
export const deleteTechnician = async (technicianId) => {
  try {
    const response = await api.delete(`/technicians/${technicianId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar técnico ${technicianId}:`, error);
    throw error;
  }
};

// Atualiza um técnico existente
export const updateTechnician = async (technicianData) => {
  try {
    // A API precisa receber o ID para saber quem atualizar
    const response = await api.put(`/technicians/${technicianData.id}`, technicianData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar técnico ${technicianData.id}:`, error);
    throw error;
  }
};