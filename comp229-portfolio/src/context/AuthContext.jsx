/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AUTH_STORAGE_KEY } from "../api/api";

const AuthContext = createContext(null);

function readInitialAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { token: "", user: null };
  } catch {
    return { token: "", user: null };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readInitialAuth);

  const persist = useCallback((nextState) => {
    setAuthState(nextState);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
  }, []);

  const signInWithToken = useCallback((token, user) => {
    persist({ token, user });
  }, [persist]);

  const signOut = useCallback(() => {
    const empty = { token: "", user: null };
    setAuthState(empty);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token: authState.token,
      user: authState.user,
      isAuthenticated: Boolean(authState.token),
      signInWithToken,
      signOut,
    }),
    [authState, signInWithToken, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
