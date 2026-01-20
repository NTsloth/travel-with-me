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
    if (savedUser) {
      setUserProfile(JSON.parse(savedUser));
    }
  }, []);

  const registerUser = async (data: any) => {
    const users = JSON.parse(localStorage.getItem("allUsers") || "[]");
    
    if (users.find((u: any) => u.gmail === data.gmail)) {
      return { success: false, message: "ელ-ფოსტა უკვე გამოყენებულია" };
    }

    const newUser = {
      ...data,
      driverPhone: data.number,
    };

    users.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(users));
    localStorage.setItem("activeUser", JSON.stringify(newUser));
    setUserProfile(newUser);
    
    return { success: true };
  };

  const loginUser = async (identifier: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem("allUsers") || "[]");
    const user = users.find((u: any) => (u.gmail === identifier || u.number === identifier) && u.password === pass);

    if (user) {
      localStorage.setItem("activeUser", JSON.stringify(user));
      setUserProfile(user);
      return { success: true };
    }
    return { success: false, message: "მონაცემები არასწორია" };
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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};