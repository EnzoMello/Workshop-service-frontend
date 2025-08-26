// src/hooks/useWebSocket.js
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = "http://localhost:8080/ws"; // URL do seu endpoint WebSocket

export const useWebSocket = (initialData = []) => {
  // Estado para guardar os dados que chegam via WebSocket
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Cria um novo cliente STOMP
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log('WS Debug:', str); // Logs de depuração
      },
    });

    // O que fazer quando a conexão for estabelecida
    client.onConnect = () => {
      console.log('✅ Conectado ao WebSocket via React Hook!');
      
      // Assina o canal GERAL do dashboard para receber a lista de OS ativas
      client.subscribe('/topic/dashboard', (message) => {
        try {
          const updatedItems = JSON.parse(message.body);
          console.log("📩 Broadcast recebido:", updatedItems);
          // Atualiza o estado com a nova lista completa
          setData(updatedItems);
        } catch (e) {
          console.error("Erro ao processar mensagem do WebSocket:", e);
        }
      });
    };

    // O que fazer em caso de erro na conexão
    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    // Inicia a conexão
    client.activate();

    // Função de limpeza: desativa a conexão quando o componente for desmontado
    return () => {
      client.deactivate();
      console.log('🔌 WebSocket desconectado.');
    };
  }, []); // O `[]` vazio garante que a conexão seja feita apenas uma vez

  return data;
};