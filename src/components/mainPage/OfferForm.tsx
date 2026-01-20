"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { GEORGIAN_CITIES, TravelRoute } from "@/components/data/data";
import { useAuth } from "@/components/context/AuthContext";
import styles from "../../styles/Registration.module.css";

const initialFormData: Omit<TravelRoute, "id"> = {
  fromCity: GEORGIAN_CITIES[0],
  toCity: GEORGIAN_CITIES[1],
  date: new Date().toISOString().split("T")[0],
  price: "",
  carModel: "",
  driverName: "",
  driverAge: 0,
  driverPhone: "",
  freeSeats: 1,
};

export function OfferForm({ isModal = false }: { isModal?: boolean }) {
  const { handleAddRoute, isLoading: searchLoading } = useTravelSearch();
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        driverName: userProfile.driverName || "",
        driverAge: userProfile.driverAge || 0,
        driverPhone: userProfile.driverPhone || userProfile.number || "",
      }));
    }
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div className={styles.phoneBox}>
        <p style={{ color: "rgb(239 68 68)", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          შეცდომა: მომხმარებლის პროფილი ვერ მოიძებნა.
        </p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (["driverName", "driverAge", "driverPhone"].includes(name)) return;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" || name === "freeSeats" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("იტვირთება...");

    const priceValue = String(formData.price).trim().toUpperCase();
    const numericPart = priceValue.replace(/[^0-9.]/g, "");

    if (!numericPart) {
      setStatus("გთხოვთ შეიყვანოთ ფასი.");
      return;
    }

    const routeDataToSubmit = {
      ...formData,
      price: `${numericPart} GEL`,
    };

    const success = await handleAddRoute(routeDataToSubmit);

    if (success) {
      setStatus("✅ შეთავაზება წარმატებით დაემატა!");
      setFormData({
        ...initialFormData,
        driverName: userProfile.driverName || "",
        driverAge: userProfile.driverAge || 0,
        driverPhone: userProfile.driverPhone || userProfile.number || "",
      });
    } else {
      setStatus("შეცდომა დამატებისას.");
    }
  };

  return (
    <div className={isModal ? "" : styles.formSectionContainer}>
      <form onSubmit={handleSubmit} className={styles.modernForm}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>მძღოლის მონაცემები</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>სახელი</label>
              <input type="text" value={formData.driverName} className={styles.disabledInput} disabled />
            </div>
            <div className={styles.inputGroup}>
              <label>ასაკი</label>
              <input type="text" value={formData.driverAge > 0 ? formData.driverAge : ""} className={styles.disabledInput} disabled />
            </div>
            <div className={styles.inputGroup}>
              <label>ტელეფონი</label>
              <input type="text" value={formData.driverPhone} className={styles.disabledInput} disabled />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>მარშრუტის დეტალები</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>საიდან</label>
              <select name="fromCity" value={formData.fromCity} onChange={handleChange}>
                {GEORGIAN_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>სად</label>
              <select name="toCity" value={formData.toCity} onChange={handleChange}>
                {GEORGIAN_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>თარიღი</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>ავტომობილი და ფასი</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>მოდელი</label>
              <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>ადგილები</label>
              <input type="number" name="freeSeats" value={formData.freeSeats} onChange={handleChange} min="1" required />
            </div>
            <div className={styles.inputGroup}>
              <label>ფასი (GEL)</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={searchLoading}>
          {searchLoading ? "ვამატებთ..." : "გამოქვეყნება"}
        </button>
        {status && <p className={status.startsWith("✅") ? styles.statusSuccess : styles.statusError}>{status}</p>}
      </form>
    </div>
  );
}