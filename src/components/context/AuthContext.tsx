"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  driverName: string;
  driverAge: number;
  driverPhone: string;
  number: string;
  gmail: string;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  registerUser: (data: any) => Promise<{ success: boolean; message?: string }>;
  loginUser: (identifier: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("activeUser");
    if (savedUser) setUserProfile(JSON.parse(savedUser));
  }, []);

  const registerUser = async (data: any) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) return { success: false, message: result.message };

      const newUser = { ...result.user, driverPhone: result.user.number };
      localStorage.setItem("activeUser", JSON.stringify(newUser));
      setUserProfile(newUser);
      return { success: true };
    } catch {
      return { success: false, message: "სერვერთან კავშირი ვერ დამყარდა" };
    }
  };

  const loginUser = async (identifier: string, pass: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: pass }),
      });
      const result = await response.json();
      if (result.success) {
        const loggedInUser = { ...result.user, driverPhone: result.user.number };
        localStorage.setItem("activeUser", JSON.stringify(loggedInUser));
        setUserProfile(loggedInUser);
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch {
      return { success: false, message: "ავტორიზაციის შეცდომა" };
    }
  };

  const logout = () => {
    localStorage.removeItem("activeUser");
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ userProfile, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth error");
  return context;
};