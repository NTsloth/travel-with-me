"use client";
import { useAuth } from "@/components/context/AuthContext";
import { RegistrationForm } from "@/components/UI/RegistrationForm";
import Header from "@/components/mainPage/Header";
import { TravelSearchProvider } from "@/components/context/TravelSearchContext";

export default function Home() {
  const { userProfile, logout } = useAuth();

  if (!userProfile) {
    return <RegistrationForm />;
  }

  return (
    <TravelSearchProvider>
      <main style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
        <Header />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            backgroundColor: "white",
            padding: "15px 25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            marginBottom: "20px"
          }}>
            <div>
              <h1 style={{ fontSize: "18px", margin: 0 }}>
                მოგესალმებით, <span style={{ color: "#3b82f6" }}>{userProfile.driverName}</span>!
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "5px 0 0 0" }}>
                {userProfile.gmail}
              </p>
            </div>

            <button 
              onClick={logout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
            >
              გამოსვლა
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p>@NTsloth</p>
          </div>
        </div>
      </main>
    </TravelSearchProvider>
  );
}