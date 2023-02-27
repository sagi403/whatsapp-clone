import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
});
