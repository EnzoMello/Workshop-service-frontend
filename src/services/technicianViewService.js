/**
 * @file technicianViewService.js
 * @brief Módulo de serviço para buscar dados específicos da visão do técnico.
 */
import api from './api';

/**
 * @brief Busca a fila de Ordens de Serviço atribuídas a um técnico específico.
 * @description O backend deve retornar as OS que estão 'NOT_STARTED', 'IN_PROGRESS' ou 'PAUSED' para este técnico.
 * @param {string} technicianId O ID do técnico.
 * @returns {Promise<Array<object>>} Uma promessa que resolve para uma lista de objetos de OS (cada um deve incluir suas 'tasks' aninhadas).
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const getTechinicianOsForToday = async (rfid_code) => {
    // Este endpoint deve retornar a lista de OS de um técnico com as tarefas aninhadas
    const response = await api.get(`/technicians/rfid/${rfid_code}/order-services/today`);
    return response.data;
};

// Busca os detalhes de uma OS com uma lista de tarefas
export const getOsWithTasks = async (osId) => {
  const response = await api.get(`/order-services/${osId}`);
  return response.data;
}

// Busca os detalhes de uma tarefa específica
export const getTaskDetails = async (taskId) => {
  const response = await api.get(`/order-tasks/${taskId}`);
  return response.data;
}

// ---------> Ações sobre uma tarefa

export const selectTask = async (taskId) => {
  const response = await api.put(`/order-tasks/${taskId}/select`);
  return response.data;
}

export const pauseTask = async (taskId, reason) => {
  const response = await api.put(`/order-tasks/${taskId}/pause`, {reason});
  return response.data;
}

export const completeTask = async (taskId) => {
  const response = await api.put(`/order-tasks/${taskId}/complete`);
  return response.data;
}



