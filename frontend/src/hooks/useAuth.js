import { useUser } from "./useUser";

export const useAuth = () => {
  const { user, setUser, addUser, removeUser } = useUser();

  const login = user => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, setUser, login, logout };
};
