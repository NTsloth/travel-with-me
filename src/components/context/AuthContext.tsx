"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface RegistrationData {
  surname: string;
  gmail: string;
  number: string;
  otherDetail: string;
  driverName: string;
  driverAge: number;
  driverPhone: string;
}

interface AuthContextType {
  isRegistered: boolean;
  registerUser: (userData: RegistrationData) => void;
  resetRegistration: () => void;
  userProfile: RegistrationData | null;
}

const initialProfile: RegistrationData = {
  surname: "",
  gmail: "",
  number: "",
  otherDetail: "",
  driverName: "",
  driverAge: 0,
  driverPhone: "",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState<RegistrationData | null>(
    initialProfile
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStatus = localStorage.getItem("isRegistered") === "true";
      const storedProfile = localStorage.getItem("userProfile");

      if (storedStatus && storedProfile) {
        setIsRegistered(true);
        try {
          setUserProfile(JSON.parse(storedProfile));
        } catch (e) {
          console.error("Failed to parse user profile:", e);
          setIsRegistered(false);
        }
      }
      setIsClientLoaded(true);
    }
  }, []);

  const registerUser = (userData: RegistrationData) => {
    console.log("Registered User Data:", userData);

    setIsRegistered(true);
    setUserProfile(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("userProfile", JSON.stringify(userData));
    }
  };

  const resetRegistration = () => {
    setIsRegistered(false);
    setUserProfile(initialProfile);
    if (typeof window !== "undefined") {
      localStorage.removeItem("isRegistered");
      localStorage.removeItem("userProfile");
    }
    window.location.reload();
  };

  if (!isClientLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <p>იტვირთება...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isRegistered, registerUser, resetRegistration, userProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
