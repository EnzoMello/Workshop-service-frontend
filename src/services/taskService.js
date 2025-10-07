/**
 * @file taskService.js
 * @brief Módulo de serviço para as operações de API relacionadas às Tarefas Padrão.
 * @author Enzo Mello
 */
import api from './api';

/**
 * @brief Busca todas as tarefas padrão cadastradas no sistema.
 * @returns {Promise<Array<object>>} Uma promessa que resolve para uma lista de objetos de tarefa.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const getAllTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Cria uma nova tarefa padrão.
 * @param {object} taskData - Objeto com os dados da nova tarefa a ser criada.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto da tarefa recém-criada.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Deleta uma tarefa padrão específica pelo seu ID.
 * @param {string} taskId - O ID da tarefa a ser deletada.
 * @returns {Promise<any>} Uma promessa que resolve com a resposta da API após a deleção.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Atualiza os dados de uma tarefa padrão existente.
 * @param {object} taskData - Objeto com os dados da tarefa a ser atualizada, devendo incluir o ID.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto da tarefa atualizada.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const updateTask = async (taskData) => {
  try {
    const response = await api.put(`/tasks/${taskData.id}`, taskData);
    return response.data;
  } catch (error) { throw error; }
};