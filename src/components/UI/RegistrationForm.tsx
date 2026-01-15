"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/context/AuthContext";
import styles from "../../styles/Registration.module.css";

export function RegistrationForm() {
  const { registerUser, loginUser } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    gmail: "", number: "", driverName: "", password: "",
    birthDay: "", birthMonth: "", birthYear: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setError("პაროლი უნდა შეიცავდეს: დიდ და პატარა ასოს, ციფრს და სიმბოლოს (მინ. 8 ნიშანი)");
        return;
      }
    }

    setLoading(true);

    const result = isLogin 
      ? await loginUser(formData.gmail, formData.password)
      : await registerUser(formData);

    if (!result.success) {
      setError(result.message || "მოხდა შეცდომა");
    }
    setLoading(false);
  };

  return (
    <div className={styles.fullScreenOverlay}>
      <div className={styles.registrationCard}>
        <h2 className={styles.title}>{isLogin ? "ავტორიზაცია" : "რეგისტრაცია"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <input className={styles.input} placeholder="სახელი და გვარი" required 
              value={formData.driverName} onChange={(e) => setFormData({...formData, driverName: e.target.value})} />
          )}

          <input className={styles.input} type="text" placeholder={isLogin ? "ელ-ფოსტა ან ნომერი" : "ელ-ფოსტა"} required 
            value={formData.gmail} onChange={(e) => setFormData({...formData, gmail: e.target.value})} />
          
          <div style={{ position: "relative", width: "100%" }}>
            <input 
              className={styles.input} 
              type={showPassword ? "text" : "password"} 
              placeholder="პაროლი" 
              required 
              style={{ width: "100%", paddingRight: "40px" }}
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b"
              }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              ) : (                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              )}
            </button>
          </div>
          
          {!isLogin && (
            <>
              <input className={styles.input} type="tel" maxLength={9} placeholder="5________" required 
                value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value.replace(/\D/g, '')})} />

              <div style={{ display: "flex", gap: "10px" }}>
                <select className={styles.input} required value={formData.birthDay} onChange={(e) => setFormData({...formData, birthDay: e.target.value})}>
                  <option value="">დღე</option>
                  {days.map(d => <option key={d} value={d.toString()}>{d}</option>)}
                </select>
                <select className={styles.input} required value={formData.birthMonth} onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}>
                  <option value="">თვე</option>
                  {months.map(m => <option key={m} value={m.toString()}>{m}</option>)}
                </select>
                <select className={styles.input} required value={formData.birthYear} onChange={(e) => setFormData({...formData, birthYear: e.target.value})}>
                  <option value="">წელი</option>
                  {years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
                </select>
              </div>
            </>
          )}

          {error && <p style={{ color: "red", textAlign: "center", fontSize: "13px", marginTop: "10px" }}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "იტვირთება..." : (isLogin ? "შესვლა" : "რეგისტრაციის დასრულება")}
          </button>

          <p onClick={() => { setIsLogin(!isLogin); setError(""); setShowPassword(false); }} className={styles.toggleText}>
            {isLogin ? "არ გაქვთ ანგარიში? დარეგისტრირდით" : "უკვე გაქვთ ანგარიში? შესვლა"}
          </p>
        </form>
      </div>
    </div>
  );
}