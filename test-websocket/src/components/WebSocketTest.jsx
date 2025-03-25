import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

const WS_URL = 'wss://day6.duckdns.org/api/v1/ws';

const StompChat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      debug: msg => console.log('[STOMP]', msg),
    });

    stompClient.onConnect = () => {
      console.log('✅ STOMP 연결됨');

      stompClient.subscribe('/api/v1/sub/test', frame => {
        const payload = JSON.parse(frame.body);
        setMessages(prev => [...prev, payload]);
      });

      stompClient.publish({
        destination: '/api/v1/pub/test',
        body: JSON.stringify({ message: '안녕하세요, 서버!' }),
      });
    };

    stompClient.onStompError = frame =>
      console.error('❌ STOMP 에러:', frame.headers['message'], frame.body);

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log('🛑 STOMP 연결 해제됨');
    };
  }, []);

  return (
    <div>
      <h3>Received Messages</h3>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default StompChat;
