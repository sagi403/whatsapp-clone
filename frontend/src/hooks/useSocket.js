import { useContext } from "react";
import { SocketContext } from "../components/context/SocketContext";

export const useSocket = () => {
  return useContext(SocketContext);
};
