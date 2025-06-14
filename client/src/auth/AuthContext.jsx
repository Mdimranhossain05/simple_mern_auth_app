import { createContext, useContext, useState } from "react";
import { login as apiLogin, register as apiRegister, logout as apiLogout } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    localStorage.setItem("user", JSON.stringify(res.data.payload));
    setUser(res.data.payload);
  };

  const register = async (info) => {
    const res = await apiRegister(info);
    localStorage.setItem("user", JSON.stringify(res.data.payload));
    setUser(res.data.payload);
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
