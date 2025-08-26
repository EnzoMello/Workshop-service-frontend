// src/services/orderService.js
import api from './api';

/**
 * Busca todas as Ordens de Serviço do back-end.
 */
export const getAllOrderServices = async () => {
  try {
    const response = await api.get('/order-services');
    return response.data;
  } catch (error) { throw error; }
};

/**
 * Cria uma nova Ordem de Serviço.
 */
export const createOrderService = async (osData) => {
  try {
    const response = await api.post('/order-services', osData);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * Busca uma Ordem de Serviço específica pelo seu ID.
 */
export const getOrderServiceById = async (osId) => {
  try {
    const response = await api.get(`/order-services/${osId}`);
    return response.data;
  } catch (error) { throw error; }
};

/**
 * Envia uma requisição para pausar uma Ordem de Serviço.
 */
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
    // Faz a chamada POST para /api/order-services/assign
    // O corpo da requisição precisa corresponder ao que o back-end espera
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
    // Faz a chamada GET para /api/dashboard
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard em tempo real:", error);
    throw error;
  }
};
