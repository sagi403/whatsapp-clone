import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";
import WebScreen from "./screens/WebScreen";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

// const socket = io("ws://localhost:5000");

const App = () => {
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/web" element={<WebScreen />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
