import { useEffect, useMemo, useRef } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";
import { useAuth } from "../../hooks/useAuth";

const SocketContextProvider = ({ children }) => {
  const socket = useRef();

  const { user } = useAuth();

  useEffect(() => {
    socket.current = io(`ws://localhost:8000`, { query: { userId: user.id } });
  }, []);

  const memoedValue = useMemo(
    () => ({
      socket,
    }),
    [socket]
  );

  return (
    <SocketContext.Provider value={memoedValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
