/**
 * @file technicianService.js
 * @brief Módulo de serviço para as operações de API relacionadas aos Técnicos.
 * @author Enzo Mello
 */
import api from './api';

/**
 * @brief Dados simulados de técnicos para uso em caso de falha da API.
 * @type {Array<object>}
 */
const fallbackTechnicians = [
    { id: 1, name: 'João Victor', rfidCode: 'RFID-0001', role: 'MECHANIC', status: 'red' },
    { id: 2, name: 'Maria Oliveira', rfidCode: 'RFID-0002', role: 'MECHANIC_LEADER', status: 'red' },
    { id: 3, name: 'Pedro Souza', rfidCode: 'RFID-0003', role: 'ELECTRICIAN', status: 'red' },
];

/**
 * @brief Busca todos os técnicos cadastrados.
 * @details Se a chamada à API falhar ou retornar uma lista vazia, retorna uma lista de dados simulados (fallback) para garantir que a aplicação continue funcional para demonstração.
 * @returns {Promise<Array<object>>} Uma promessa que resolve para uma lista de objetos de técnico.
 */
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

/**
 * @brief Cria um novo técnico.
 * @param {object} technicianData - Objeto com os dados do novo técnico a ser criado.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto do técnico recém-criado.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const createTechnician = async (technicianData) => {
  try {
    const response = await api.post('/technicians', technicianData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar técnico:", error);
    throw error;
  }
};

/**
 * @brief Deleta um técnico específico pelo seu ID.
 * @param {string} technicianId - O ID do técnico a ser deletado.
 * @returns {Promise<any>} Uma promessa que resolve com a resposta da API após a deleção.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const deleteTechnician = async (technicianId) => {
  try {
    const response = await api.delete(`/technicians/${technicianId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar técnico ${technicianId}:`, error);
    throw error;
  }
};

/**
 * @brief Atualiza os dados de um técnico existente.
 * @param {object} technicianData - Objeto com os dados do técnico a ser atualizado, devendo incluir o ID.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto do técnico atualizado.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const updateTechnician = async (technicianData) => {
  try {
    const response = await api.put(`/technicians/${technicianData.id}`, technicianData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar técnico ${technicianData.id}:`, error);
    throw error;
  }
};

/**
 * @brief Busca um técnico específico pelo seu código RFID.
 * @param {string} rfidCode - O código RFID a ser verificado.
 * @returns {Promise<object>} Os dados do técnico encontrado.
 * @throws {Error} Lança um erro se o técnico não for encontrado ou a API falhar.
 */
export const getTechnicianByRfid = async (rfidCode) => {
  // Este endpoint precisa existir no seu backend: ex: GET /api/technicians/rfid/{rfidCode}
  const response = await api.get(`/technicians/rfid/${rfidCode}`);
  return response.data;
};