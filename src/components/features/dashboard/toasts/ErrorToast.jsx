// src/components/common/ErrorToast.jsx
import React, { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ErrorToast.css';

function ErrorToast({ message, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5 segundos

    // Limpa o timer se o componente for desmontado antes do tempo
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-toast">
      <FaExclamationTriangle className="error-icon" />
      <p className="error-message">{message}</p>
      <button className="close-btn" onClick={onClose}>&times;</button>
    </div>
  );
}

export default ErrorToast;