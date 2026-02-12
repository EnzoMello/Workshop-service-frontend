/**
 * @file useWebSocket.js
 * @brief Fornece um hook customizado do React para gerenciar a conexão WebSocket do dashboard.
 *
 * @description Este hook abstrai toda a complexidade de conexão e gerenciamento de
 * inscrições (subscriptions) com um servidor WebSocket usando StompJS sobre SockJS.
 */
import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

/** @brief URL do endpoint do WebSocket no backend. */
const WS_URL = "http://localhost:8080/ws";

/**
 * @brief Hook customizado que gerencia a conexão com o WebSocket e mantém o estado dos dados em tempo real.
 * @description Este hook utiliza StompJS e SockJS para se conectar ao servidor.
 * *
 * @param {Array<object>} - A lista inicial de dados a ser exibida. Cada objeto deve conter 'orderServiceId' para a inscrição no tópico específico.
 * @returns {Array<object>} A lista de dados (OS ativas) que é atualizada em tempo real pelo WebSocket.
 */
export const useWebSocket = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const subscriptionsRef = useRef(new Map());

  /**
   * @brief Efeito para sincronizar o estado interno do hook com os dados iniciais passados como prop.
   * @details Garante que se a lista inicial de OS mudar (ex: após um refresh manual na página), o hook reflita essa mudança.
   */
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /**
   * @brief Efeito principal que gerencia o ciclo de vida da conexão WebSocket.
   * @details É executado quando o componente monta e se reconecta se 'initialData' mudar. A função de limpeza garante que a conexão seja desativada quando o componente desmonta.
   */
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      debug: (str) => { console.log('WS Debug:', str); },
    });

    /**
     * @brief Atualiza a lista de dados do estado, modificando um item existente ou adicionando um novo.
     * @param {object} updatedDto - O objeto de dados (DTO) recebido do WebSocket.
     */
    const updateCard = (updatedDto) => {
      setData(currentData => {
        // Busca pelo Box (chave fixa)
        const cardExists = currentData.some(item => item.boxIdentifier === updatedDto.boxIdentifier);
        
        if (cardExists) {
          return currentData.map(item =>
            // Substitui o objeto inteiro para garantir que estados antigos de alerta sejam limpos
            item.boxIdentifier === updatedDto.boxIdentifier ? updatedDto : item
          );
        } else {
          return [...currentData, updatedDto];
        }
      });
    };
    
    /**
     * @brief Inscreve-se em um tópico de uma OS específica para receber atualizações detalhadas.
     * @details Utiliza a ref 'subscriptionsRef' para garantir que não haja múltiplas inscrições para o mesmo tópico.
     * @param {string} osId - O ID da Ordem de Serviço para a qual se inscrever.
     */
    const subscribeToOs = (osId) => {
      // Proteção: Só inscreve se tiver um ID válido (evita erro quando chega alerta com id null)
      if (client.active && osId && !subscriptionsRef.current.has(osId)) {
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

    /**
     * @brief Callback executado quando a conexão com o WebSocket é estabelecida com sucesso.
     */
    client.onConnect = () => {
      console.log('✅ Conectado ao WebSocket!');

      client.subscribe('/topic/dashboard', (message) => {
        try {
          const dto = JSON.parse(message.body);
          console.log("📩 Broadcast recebido (nova OS/update geral):", dto);
          
          updateCard(dto);
          
          // Só tenta inscrever no tópico específico se houver um ID de OS válido
          if (dto.orderServiceId) {
            subscribeToOs(dto.orderServiceId);
          }
        } catch (e) { console.error("Erro no broadcast:", e); }
      });

      initialData.forEach(os => {
        if(os.orderServiceId) subscribeToOs(os.orderServiceId);
      });
    };

    client.activate();

    /**
     * @brief Função de limpeza do useEffect.
     * @details É executada quando o componente que usa o hook é desmontado. Garante que a conexão WebSocket seja fechada para evitar vazamentos de memória.
     */
    return () => {
      if (client.active) {
        client.deactivate();
        console.log('🔌 WebSocket desconectado.');
      }
      subscriptionsRef.current.clear();
    };
  }, [initialData]); 
  return data;
};