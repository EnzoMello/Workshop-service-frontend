import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Ícone de sucesso
import './SuccessToast.css'; 

function SuccessToast({ message, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // 4 segundos pra aparecer na tela

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-toast">
      <FaCheckCircle className="success-icon" />
      <p className="success-message">{message}</p>
      <button className="close-btn" onClick={onClose}>&times;</button>
    </div>
  );
}

export default SuccessToast;