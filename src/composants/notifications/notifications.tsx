import './notifications.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Notifications() {
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null); // Déclarez la variable socket en tant que variable d'état

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Créez une nouvelle instance de socket
    setSocket(newSocket); // Mettez à jour la variable d'état socket

    newSocket.on('connect', () => {
      console.log('Connecté au serveur websocket');
    });

    newSocket.on('message', (message: any) => {
      console.log('Nouveau message reçu :', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Lorsque le composant est démonté, fermez la connexion websocket
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const message = {
      content: 'Hello, World!',
      sender: 'John',
    };
    // Envoyez le message au serveur websocket
    if (socket) {
      socket.emit('message', message);
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Envoyer un message</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
