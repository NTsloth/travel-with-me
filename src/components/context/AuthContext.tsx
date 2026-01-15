"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserProfile {
  gmail: string;
  driverName: string;
  driverPhone: string;
  driverAge: number;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  registerUser: (data: any) => Promise<{ success: boolean; message: string }>;
  loginUser: (identifier: string, password: any) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("travel_user");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("travel_user");
      }
    }
  }, []);

  const registerUser = async (userData: any) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (!response.ok) return { success: false, message: result.message || "შეცდომა" };

      const user = { 
        gmail: result.user.gmail, 
        driverName: result.user.driverName, 
        driverPhone: result.user.number, 
        driverAge: result.user.driverAge 
      };
      
      setUserProfile(user);
      localStorage.setItem("travel_user", JSON.stringify(user));
      return { success: true, message: "" };
    } catch {
      return { success: false, message: "კავშირის შეცდომა" };
    }
  };

  const loginUser = async (identifier: string, password: any) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const result = await response.json();
      if (!response.ok) return { success: false, message: result.message || "მონაცემები არასწორია" };

      const user = { 
        gmail: result.user.gmail, 
        driverName: result.user.driverName, 
        driverPhone: result.user.number, 
        driverAge: result.user.driverAge 
      };

      setUserProfile(user);
      localStorage.setItem("travel_user", JSON.stringify(user));
      return { success: true, message: "" };
    } catch {
      return { success: false, message: "კავშირის შეცდომა" };
    }
  };

  const logout = () => { 
    setUserProfile(null); 
    localStorage.removeItem("travel_user");
    window.location.reload(); 
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