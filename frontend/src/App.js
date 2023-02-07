import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import WebScreen from "./screens/WebScreen";
import { io } from "socket.io-client";

// const socket = io("ws://localhost:5000");

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/web" element={<WebScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
