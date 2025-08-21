import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';

const WS_URL = 'wss://day6.duckdns.org/api/v1/ws';

export default function Base64ImageStreamer() {
  const [videoFragment, setVideoFragment] = useState(null);
  const [file, setFile] = useState(null);
  const stompClient = useRef(null);

  useEffect(() => {
    const client = new Client({ brokerURL: WS_URL, reconnectDelay: 5000 });
    client.onConnect = () => {
      client.subscribe('/api/v1/sub/records/1/streaming', frame => {
        try {
          const { videoFragment: base64 } = JSON.parse(frame.body);
          setVideoFragment(`data:image/png;base64,${base64}`);
        } catch (e) {
          console.error('Failed to parse incoming message', e);
        }
      });
    };
    client.activate();
    stompClient.current = client;
    return () => client.deactivate();
  }, []);

  const sendVideoFragment = () => {
    if (!file) return alert('파일을 선택하세요');
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result === "data:<mime>;base64,<base64>"
      const base64 = reader.result.split(',')[1];
      stompClient.current.publish({
        destination: '/api/v1/pub/records/1/streaming',
        body: JSON.stringify({ videoFragment: base64 }),
      });
      setFile(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h3>Base64 Image Streaming</h3>

      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={sendVideoFragment} disabled={!file}>
        전송
      </button>

      {videoFragment && (
        <div style={{ marginTop: 16 }}>
          <img src={videoFragment} alt="Received" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}
