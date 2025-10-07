/**
 * @file boxService.js
 * @brief Módulo de serviço para todas as operações de API relacionadas aos Boxes da oficina.
 * @author Enzo Mello
 */
import api from './api';

/**
 * @brief Busca todos os boxes cadastrados.
 * @returns {Promise<Array<object>>} Uma promessa que resolve para uma lista de objetos de box.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const getAllBoxes = async () => {
  try {
    const response = await api.get('/boxes');
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Cria um novo box no sistema.
 * @param {object} boxData - Objeto com os dados do novo box a ser criado.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto do box recém-criado.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const createBox = async (boxData) => {
  try {
    console.log("Enviando para POST /boxes:", boxData); // Log para depuração
    const response = await api.post('/boxes', boxData);
    return response.data;
  } catch (error) { 
    console.error("Erro em createBox:", error.response?.data || error);
    throw error; 
  }
};

/**
 * @brief Deleta um box específico pelo seu ID.
 * @param {string} boxId - O ID do box a ser deletado.
 * @returns {Promise<any>} Uma promessa que resolve com a resposta da API após a deleção.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const deleteBox = async (boxId) => {
  try {
    const response = await api.delete(`/boxes/${boxId}`);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Atualiza os dados de um box existente.
 * @param {object} boxData - Objeto com os dados do box a ser atualizado, devendo incluir o ID.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto do box atualizado.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const updateBox = async (boxData) => {
  try {
    const response = await api.put(`/boxes/${boxData.id}`, boxData);
    return response.data;
  } catch (error) { throw error; }
};