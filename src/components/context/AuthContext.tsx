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

  useEffect(() => {
    const savedUser = localStorage.getItem("travel_user");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("travel_user");
      }
    }
  }, []);

  const registerUser = async (data: any) => {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, message: result.message || "შეცდომა რეგისტრაციისას" };
      }

      // Map the backend 'number' to frontend 'driverPhone'
      const newUser: UserProfile = {
        gmail: result.user.gmail,
        driverName: result.user.driverName,
        driverPhone: result.user.number, 
        driverAge: result.user.driverAge,
      };

      setUserProfile(newUser);
      localStorage.setItem("travel_user", JSON.stringify(newUser));
      return { success: true };

    } catch (err) {
      console.error("Fetch Error:", err);
      return { success: false, message: "სერვერთან კავშირი ვერ დამყარდა" };
    }
  };

  const logout = () => {
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