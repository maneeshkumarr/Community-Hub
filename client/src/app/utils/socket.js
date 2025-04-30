import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL);
      
      socket.on('connect', () => {
        setIsConnected(true);
      });
      
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
    }

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
      }
    };
  }, []);

  return socket;
};

export const usePostUpdates = (postId, callback) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !postId) return;

    socket.emit('joinPostRoom', postId);
    socket.on('newComment', callback);
    socket.on('voteUpdate', callback);

    return () => {
      socket.off('newComment', callback);
      socket.off('voteUpdate', callback);
      socket.emit('leavePostRoom', postId);
    };
  }, [socket, postId, callback]);
};