import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "./components/screens/LoginScreen";
import WebScreen from "./components/screens/WebScreen";
import AuthContentProvider from "./components/provider/AuthContentProvider";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
