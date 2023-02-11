import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchCookie } from "../fetchers/loginCookie";
import { fetchProfile } from "../fetchers/userProfile";

export const useUser = () => {
  const [userError, setUserError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const addUser = async user => {
    try {
      await fetchCookie(user);
      checkUser();
    } catch (error) {
      setUserError(error);
    }
  };

  const checkUser = async () => {
    try {
      const user = await fetchProfile();
      setUser(user);
    } catch (error) {
      setUserError(error);
    }
  };

  const removeUser = () => {
    setUser(null);
  };

  return { user, setUser, addUser, userError, setUserError, removeUser };
};
