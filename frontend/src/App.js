import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "./components/screens/LoginScreen";
import WebScreen from "./components/screens/WebScreen";
import AuthContextProvider from "./components/provider/AuthContextProvider";
import RequireAuth from "./components/auth/RequireAuth";
import SocketContextProvider from "./components/provider/SocketContextProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="bg-gray-200">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthContextProvider>
            <SocketContextProvider>
              <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route element={<RequireAuth />}>
                  <Route path="/web" element={<WebScreen />} />
                </Route>
              </Routes>
            </SocketContextProvider>
          </AuthContextProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
