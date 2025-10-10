
/**
 * @file orderService.js
 * @brief Módulo de serviço para todas as operações de API relacionadas a Ordens de Serviço.
 * @author Enzo Mello
 */
import api from './api';

/**
 * @brief Busca todas as Ordens de Serviço.
 * @returns {Promise<Array<object>>} Uma promessa que resolve para uma lista de OS.
 */
export const getAllOrderServices = async () => {
  try {
    const response = await api.get('/order-services');
    return response.data;
  } catch (error) { throw error; }
};


export const createOrderService = async (osData) => {
  try {
    const response = await api.post('/order-services', osData);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Busca uma Ordem de Serviço específica pelo seu ID.
 * @param {string} id - O ID da OS a ser buscada.
 * @returns {Promise<object>} Uma promessa que resolve para o objeto de detalhes da OS.
 */
export const getOrderServiceById = async (osId) => {
  try {
    const response = await api.get(`/order-services/${osId}`);
    return response.data;
  } catch (error) { throw error; }
};

/// Envia requisição para pausar ordem de serviço
export const pauseOrderService = async (osId, reason) => {
  try {
    const response = await api.post(`/order-services/${osId}/pause`, {
      pauseReason: reason
    });
    return response.data;
  } catch (error) { throw error; }
};


export const assignTechnicianAndBox = async (osId, technicianId, boxId) => {
  try {
    /// Faz a chamada POST para /api/order-services/assign
    /// O corpo da requisição precisa corresponder ao que o back-end espera
    const response = await api.post(`/order-services/${osId}/assign`, {
      technicianId: technicianId,
      boxId: boxId
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao vincular técnico e box à OS ${osId}:`, error);
    throw error;
  }
};

export const getActiveDashboardOS = async () => {
  try {
    /// Faz a chamada GET para /api/dashboard
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard em tempo real:", error);
    throw error;
  }
};


/**
 * @brief Inicia uma Ordem de Serviço.
 * @param {string} osId O ID da OS a ser iniciada.
 * @returns {Promise<object>} A OS atualizada.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const startOs = async (osId) => {
  try {
    const response = await api.post(`/service-orders/${osId}/start`);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Retoma uma Ordem de Serviço que estava pausada.
 * @param {string} osId O ID da OS a ser retomada.
 * @returns {Promise<object>} A OS atualizada.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const resumeOs = async (osId) => {
  try {
    const response = await api.post(`/service-orders/${osId}/resume`);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * @brief Finaliza uma Ordem de Serviço.
 * @param {string} osId O ID da OS a ser finalizada.
 * @returns {Promise<object>} A OS atualizada.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
export const finishOs = async (osId) => {
  try {
    const response = await api.post(`/service-orders/${osId}/finish`);
    return response.data;
  } catch (error) { throw error; }
};

