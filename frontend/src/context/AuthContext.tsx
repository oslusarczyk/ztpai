import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../utils/request";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!sessionStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    sessionStorage.getItem("isAdmin") === "true"
  );
  const [userId, setUserId] = useState<string>(
    sessionStorage.getItem("userId") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const adminFlag = sessionStorage.getItem("isAdmin") === "true";
    const userId = sessionStorage.getItem("userId") || "";
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminFlag);
      setUserId(userId);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await sendRequest("/auth/login", {
        method: "POST",
        data: { email, password },
        requiresAuth: false,
      });
      const { access_token, user } = response;

      if (!access_token || !user) {
        throw new Error("Invalid response from server");
      }

      sessionStorage.setItem("token", access_token);
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem(
        "isAdmin",
        JSON.stringify(user.has_admin_privileges)
      );
      setIsAuthenticated(true);
      setIsAdmin(user.has_admin_privileges);
      setUserId(user.id);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("userId");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
