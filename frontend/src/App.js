import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "./components/screens/LoginScreen";
import WebScreen from "./components/screens/WebScreen";
import RequireAuth from "./components/auth/RequireAuth";
import ContextProvider from "./components/provider/ContextProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route element={<RequireAuth />}>
              <Route path="/web" element={<WebScreen />} />
            </Route>
          </Routes>
        </ContextProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
