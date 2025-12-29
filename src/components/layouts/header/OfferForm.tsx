"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { GEORGIAN_CITIES, TravelRoute } from "@/components/data/data";
import { useAuth } from "@/components/context/AuthContext";
import styles from "../../../styles/UI/Registration.module.css";

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

  if (!userProfile) {
    return (
      <div className={styles.phoneBox}>
        <p style={{ color: "rgb(239 68 68)", fontWeight: "700" }}>
          შეცდომა: მომხმარებლის პროფილი ვერ მოიძებნა.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (userProfile && userProfile.driverName) {
      setFormData((prev) => ({
        ...prev,
        driverName: userProfile.driverName,
        driverAge: userProfile.driverAge,
        driverPhone: userProfile.driverPhone,
      }));
    }
  }, [userProfile]);

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

    if (formData.freeSeats < 1) {
      setStatus("თავისუფალი ადგილების რაოდენობა უნდა იყოს მინიმუმ 1.");
      return;
    }

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
      setFormData(initialFormData);
    } else {
      setStatus("შეცდომა დამატებისას. სცადეთ თავიდან.");
    }
  };

  return (
    <div className={isModal ? "" : styles.formSectionContainer}>
      <form onSubmit={handleSubmit} className={styles.modernForm}>
        
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>👤 მძღოლის მონაცემები</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-driver-name">სახელი</label>
              <input 
                id="offer-driver-name"
                name="driverName"
                type="text" 
                value={userProfile.driverName} 
                className={styles.disabledInput} 
                disabled 
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-driver-age">ასაკი</label>
              <input 
                id="offer-driver-age"
                name="driverAge"
                type="text" 
                value={userProfile.driverAge} 
                className={styles.disabledInput} 
                disabled 
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-driver-phone">ტელეფონი</label>
              <input 
                id="offer-driver-phone"
                name="driverPhone"
                type="text" 
                value={userProfile.driverPhone} 
                className={styles.disabledInput} 
                disabled 
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>📍 მარშრუტის დეტალები</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-from-city">საიდან</label>
              <select 
                id="offer-from-city"
                name="fromCity" 
                value={formData.fromCity} 
                onChange={handleChange}
              >
                {GEORGIAN_CITIES.map((city) => <option key={`from-${city}`} value={city}>{city}</option>)}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-to-city">სად</label>
              <select 
                id="offer-to-city"
                name="toCity" 
                value={formData.toCity} 
                onChange={handleChange}
              >
                {GEORGIAN_CITIES.map((city) => <option key={`to-${city}`} value={city}>{city}</option>)}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-date">თარიღი</label>
              <input 
                id="offer-date"
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>🚘 ავტომობილი და ღირებულება</h3>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-car-model">მანქანის მოდელი</label>
              <input 
                id="offer-car-model"
                type="text" 
                name="carModel" 
                value={formData.carModel} 
                onChange={handleChange} 
                placeholder="მაგ: Toyota Prius" 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-seats">ადგილები</label>
              <input 
                id="offer-seats"
                type="number" 
                name="freeSeats" 
                value={formData.freeSeats} 
                onChange={handleChange} 
                min="1" 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="offer-price">ფასი (GEL)</label>
              <input 
                id="offer-price"
                type="text" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="მაგ: 20" 
                required 
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={searchLoading}>
          {searchLoading ? "ვამატებთ..." : "შეთავაზების გამოქვეყნება"}
        </button>

        {status && (
          <p className={status.startsWith("✅") ? styles.statusSuccess : styles.statusError}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}