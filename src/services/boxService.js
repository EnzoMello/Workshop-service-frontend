// src/services/boxService.js
import api from './api';

export const getAllBoxes = async () => {
  try {
    const response = await api.get('/boxes');
    return response.data;
  } catch (error) { throw error; }
};

export const createBox = async (boxData) => {
  try {
    // Apenas repassa o objeto boxData para o back-end
    console.log("Enviando para POST /boxes:", boxData); // Log para depuração
    const response = await api.post('/boxes', boxData);
    return response.data;
  } catch (error) { 
    console.error("Erro em createBox:", error.response?.data || error);
    throw error; 
  }
};

export const deleteBox = async (boxId) => {
  try {
    const response = await api.delete(`/boxes/${boxId}`);
    return response.data;
  } catch (error) { throw error; }
};

export const updateBox = async (boxData) => {
  try {
    const response = await api.put(`/boxes/${boxData.id}`, boxData);
    return response.data;
  } catch (error) { throw error; }
};