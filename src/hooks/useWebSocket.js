import { useState, useEffect, useRef } from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setIsOpen(true);
      console.log("WebSocket connection opened");
    };

    wsRef.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, newData]);
    };

    wsRef.current.onclose = () => {
      setIsOpen(false);
      console.log("WebSocket connection closed");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (wsRef.current && isOpen) {
      wsRef.current.send(message);
    }
  };

  return { messages, sendMessage, isOpen };
};

export default useWebSocket;
