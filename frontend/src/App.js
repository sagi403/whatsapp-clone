import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { io } from "socket.io-client";
import LoginScreen from "./components/screens/LoginScreen";
import WebScreen from "./components/screens/WebScreen";
import AuthContentProvider from "./components/provider/AuthContentProvider";
import RequireAuth from "./components/auth/RequireAuth";

// const socket = io("ws://localhost:5000");

const App = () => {
  return (
    <Router>
      <AuthContentProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route element={<RequireAuth />}>
            <Route path="/web" element={<WebScreen />} />
          </Route>
        </Routes>
      </AuthContentProvider>
    </Router>
  );
};

export default App;
