"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserProfile {
  gmail: string;
  driverName: string;
  driverPhone: string;
  driverAge: number;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  registerUser: (data: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 1. Effect to load user from localStorage on initial boot
  useEffect(() => {
    const savedUser = localStorage.getItem("travel_user");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  }, []);

  const registerUser = async (data: any) => {
    console.log("Frontend Context: Sending data to backend ->", data);
    try {
      const response = await fetch("http://127.0.0.1:5001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Frontend Context: Server Response ->", result);

      if (response.ok) {
        const newUser: UserProfile = {
          gmail: result.user.gmail,
          driverName: result.user.driverName,
          driverPhone: result.user.number,
          driverAge: parseInt(result.user.driverAge),
        };

        // 2. Save to state AND localStorage
        setUserProfile(newUser);
        localStorage.setItem("travel_user", JSON.stringify(newUser));
        
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (err) {
      console.error("Frontend Context: Fetch Error ->", err);
      return { success: false, message: "სერვერთან კავშირი ვერ დამყარდა" };
    }
  };

  const logout = () => {
    // 3. Clear from state AND localStorage
    setUserProfile(null);
    localStorage.removeItem("travel_user");
  };

  return (
    <AuthContext.Provider value={{ userProfile, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};