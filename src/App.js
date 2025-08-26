// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import DashboardPage from './pages/dashboard/DashboardPage';
import TechniciansPage from './pages/technicians/main/TechniciansPage';
import UpdateTechniciansPage from './pages/technicians/update/UpdateTechniciansPage';
import BoxesPage from './pages/boxes/BoxesPage';
import UpdateBoxesPage from './pages/boxes/update/UpdateBoxesPage';
import TasksPage from './pages/tasks/main/TasksPage';
import UpdateTasksPage from './pages/tasks/update/UpdateTasksPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/* Adicionamos de volta as rotas para as páginas de gerenciamento */}
            <Route path="/technicians" element={<TechniciansPage />} />
            <Route path="/update" element={<UpdateTechniciansPage />} />
            <Route path="/boxes" element={<BoxesPage />} />
            <Route path="/boxes/update" element={<UpdateBoxesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/update" element={<UpdateTasksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;