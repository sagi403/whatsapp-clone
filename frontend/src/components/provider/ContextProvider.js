import AuthContextProvider from "./AuthContextProvider";
import SocketContextProvider from "./SocketContextProvider";

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>{children}</SocketContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
