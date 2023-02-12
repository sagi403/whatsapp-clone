import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../fetchers/getCurrentUser";
import { loginUser } from "../fetchers/loginUser";
import { AuthContext } from "../context/AuthContext";

const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    getCurrentUser()
      .then(user => setUser(user))
      .catch(_error => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  const login = ({ email, password }) => {
    setLoading(true);

    loginUser({ email, password })
      .then(user => setUser(user))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default AuthContentProvider;
