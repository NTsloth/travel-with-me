"use client";

import { useAuth } from "@/components/context/AuthContext";
import { RegistrationForm } from "@/components/UI/RegistrationForm";
import Header from "@/components/layouts/header/Header";

export default function Home() {
  const { userProfile, logout } = useAuth();

  if (!userProfile) {
    return <RegistrationForm />;
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Header />

      <div style={{ maxWidth: "1200px", margin: "0px auto", padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#1e293b", fontSize: "32px", fontWeight: "800" }}>
          გამარჯობა, {userProfile.driverName}! {":)"}
        </h1>
        <p style={{ color: "#64748b", margin: "10px 0 25px" }}>თქვენ წარმატებით გაიარეთ ავტორიზაცია.</p>
        
        <button 
          onClick={logout}
          style={{
            padding: "12px 24px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
          }}
        >
          🔄 ხელახალი რეგისტრაცია
        </button>
      </div>
    </main>
  );
}