// src/hooks/useWebSocket.js
import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = "http://localhost:8080/ws";

export const useWebSocket = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const subscriptionsRef = useRef(new Map()); // Guarda as inscrições ativas

  // Efeito para sincronizar o estado com os dados iniciais que chegam da página
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      debug: (str) => { console.log('WS Debug:', str); },
    });

    // Função para atualizar um único card na lista
    const updateCard = (updatedDto) => {
      setData(currentData => {
        const cardExists = currentData.some(item => item.orderServiceId === updatedDto.orderServiceId);
        if (cardExists) {
          // Se o card já existe, atualiza
          return currentData.map(item =>
            item.orderServiceId === updatedDto.orderServiceId ? { ...item, ...updatedDto } : item
          );
        } else {
          // Se é um card novo, adiciona à lista
          return [...currentData, updatedDto];
        }
      });
    };
    
    // Função para se inscrever em um tópico de OS específico
    const subscribeToOs = (osId) => {
      // Evita se inscrever duas vezes no mesmo tópico
      if (client.active && !subscriptionsRef.current.has(osId)) {
        const subscription = client.subscribe(`/topic/dashboard/${osId}`, (message) => {
          try {
            const dto = JSON.parse(message.body);
            console.log(`📩 Update específico para OS ${osId}:`, dto);
            updateCard(dto);
          } catch (e) { console.error("Erro no update específico:", e); }
        });
        subscriptionsRef.current.set(osId, subscription);
      }
    };

    client.onConnect = () => {
      console.log('✅ Conectado ao WebSocket!');

      // --- Inscrição no Canal Geral ---
      // Escuta por novas OS ou atualizações de lista
      client.subscribe('/topic/dashboard', (message) => {
        try {
          const dto = JSON.parse(message.body);
          console.log("📩 Broadcast recebido (nova OS/update geral):", dto);
          // A função updateCard já sabe se deve criar um novo ou atualizar um existente
          updateCard(dto);
          // Se for um item novo, nos inscrevemos no seu tópico específico
          subscribeToOs(dto.orderServiceId);
        } catch (e) { console.error("Erro no broadcast:", e); }
      });

      // --- Inscrição inicial nos Canais Específicos ---
      initialData.forEach(os => subscribeToOs(os.orderServiceId));
    };

    client.activate();

    // Função de limpeza
    return () => {
      if (client.active) {
        client.deactivate();
      }
      subscriptionsRef.current.clear();
    };
  }, [initialData]); // A dependência na lista inicial é crucial

  return data;
};