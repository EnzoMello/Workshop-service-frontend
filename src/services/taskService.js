// src/services/taskService.js
import api from './api';

export const getAllTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) { throw error; }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) { throw error; }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) { throw error; }
};

export const updateTask = async (taskData) => {
  try {
    const response = await api.put(`/tasks/${taskData.id}`, taskData);
    return response.data;
  } catch (error) { throw error; }
};