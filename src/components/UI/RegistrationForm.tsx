"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/context/AuthContext";
import styles from "@/styles/UI/Registration.module.css"; 

export function RegistrationForm() {
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({ 
    gmail: "", 
    number: "", 
    driverName: "", 
    password: "",
    birthDay: "",
    birthMonth: "",
    birthYear: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await registerUser(formData);

    if (!result.success) {
      setError(result.message || "შეცდომა რეგისტრაციისას");
    }
    setLoading(false);
  };

  return (
    <div className={styles.fullScreenOverlay}>
      <div className={styles.registrationCard}>
        <h2 className={styles.title}>რეგისტრაცია</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <input className={styles.input} placeholder="სახელი და გვარი" required 
            value={formData.driverName}
            onChange={(e) => setFormData({...formData, driverName: e.target.value})} />

          <input className={styles.input} type="email" placeholder="ელ-ფოსტა" required 
            value={formData.gmail}
            onChange={(e) => setFormData({...formData, gmail: e.target.value})} />

          <input className={styles.input} type="password" placeholder="პაროლი" required 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})} />

          <input className={styles.input} type="tel" maxLength={9} placeholder="5________" required 
            value={formData.number}
            onChange={(e) => setFormData({...formData, number: e.target.value.replace(/\D/g, '')})} />

          <div style={{ display: "flex", gap: "10px" }}>
            <select className={styles.input} required value={formData.birthDay}
              onChange={(e) => setFormData({...formData, birthDay: e.target.value})}>
              <option value="">დღე</option>
              {days.map(d => <option key={d} value={d.toString()}>{d}</option>)}
            </select>

            <select className={styles.input} required value={formData.birthMonth}
              onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}>
              <option value="">თვე</option>
              {months.map(m => <option key={m} value={m.toString()}>{m}</option>)}
            </select>

            <select className={styles.input} required value={formData.birthYear}
              onChange={(e) => setFormData({...formData, birthYear: e.target.value})}>
              <option value="">წელი</option>
              {years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
            </select>
          </div>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "იტვირთება..." : "რეგისტრაციის დასრულება"}
          </button>
        </form>
      </div>
    </div>
  );
}