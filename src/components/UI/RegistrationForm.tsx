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
    driverAge: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await registerUser({
      ...formData,
      driverAge: parseInt(formData.driverAge)
    });

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
          <div className={styles.inputGroup}>
            <label htmlFor="reg-name">სახელი და გვარი</label>
            <input 
              id="reg-name"
              name="driverName"
              className={styles.input} 
              placeholder="მაგ: გიორგი დვალი" 
              onChange={(e) => setFormData({...formData, driverName: e.target.value})} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="reg-email">ელ-ფოსტა</label>
            <input 
              id="reg-email"
              name="gmail"
              className={styles.input} 
              type="email" 
              placeholder="example@gmail.com" 
              onChange={(e) => setFormData({...formData, gmail: e.target.value})} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="reg-phone">ტელეფონის ნომერი</label>
            <input 
              id="reg-phone"
              name="number"
              className={styles.input} 
              type="tel"
              maxLength={9}
              placeholder="5________" 
              onChange={(e) => setFormData({...formData, number: e.target.value.replace(/\D/g, '')})} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="reg-age">ასაკი (მინ. 18)</label>
            <input 
              id="reg-age"
              name="driverAge"
              className={styles.input} 
              type="number" 
              placeholder="18" 
              onChange={(e) => setFormData({...formData, driverAge: e.target.value})} 
              required 
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "იტვირთება..." : "რეგისტრაციის დასრულება"}
          </button>
        </form>
      </div>
    </div>
  );
}