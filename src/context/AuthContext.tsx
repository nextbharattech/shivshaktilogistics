"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  api,
  getStoredAccessToken,
  getStoredUser,
  setStoredAuth,
  clearStoredAuth,
} from "@/lib/api";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  status: "ACTIVE" | "INACTIVE";
  phone?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from local storage on mount
  useEffect(() => {
    try {
      const storedToken = getStoredAccessToken();
      const storedUser = getStoredUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (err) {
      console.error("Auth init error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await api.auth.login({ email, password });
      if (res.success && res.data) {
        const { user: loggedInUser, tokens } = res.data;
        setUser(loggedInUser);
        setToken(tokens.accessToken);
        setStoredAuth(tokens.accessToken, tokens.refreshToken, loggedInUser);
        return { success: true, message: res.message || "Login successful" };
      }
      return { success: false, message: res.message || "Login failed" };
    } catch (err: any) {
      return { success: false, message: err.message || "An error occurred during login" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await api.auth.logout().catch(() => {});
      }
    } finally {
      clearStoredAuth();
      setUser(null);
      setToken(null);
    }
  };

  const refreshProfile = async () => {
    try {
      if (!token) return;
      const res = await api.auth.getProfile();
      if (res.success && res.data) {
        setUser(res.data);
        if (typeof window !== "undefined") {
          localStorage.setItem("shivdocket_user", JSON.stringify(res.data));
        }
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  const isAdmin = user?.role === "ADMIN";
  const isEmployee = user?.role === "EMPLOYEE";
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        isAdmin,
        isEmployee,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
