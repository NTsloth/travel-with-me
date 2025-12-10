"use client";

import React, { useState, FormEvent } from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { GEORGIAN_CITIES, TravelRoute } from "@/components/data/data";
import styles from "../../../styles/header/HeaderSearch.module.css";

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

export function OfferForm() {
  const { handleAddRoute, isLoading } = useTravelSearch();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "driverAge" || name === "freeSeats"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("იტვირთება...");

    if (formData.freeSeats < 1) {
      setStatus("თავისუფალი ადგილების რაოდენობა უნდა იყოს მინიმუმ 1.");
      return;
    }

    const success = await handleAddRoute(formData);

    if (success) {
      setStatus(
        "✅ შეთავაზება წარმატებით დაემატა! იპოვეთ თქვენი მარშრუტი ქვემოთ."
      );
      setFormData(initialFormData);
    } else {
      setStatus("❌ შეცდომა დამატებისას. სცადეთ თავიდან.");
    }
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.title} style={{ fontSize: "20px" }}>
        შექმენი ახალი შეთავაზება (მძღოლის რეგისტრაცია)
      </h2>
      <p style={{ color: "rgb(107 114 128)", marginTop: "4px" }}>
        შეავსეთ მონაცემები და დაამატეთ თქვენი მარშრუტი სისტემაში.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* ქალაქები და თარიღი */}
          <div>
            <label className={styles.label}>საიდან</label>
            <select
              name="fromCity"
              value={formData.fromCity}
              onChange={handleChange}
              className={styles.inputField}
            >
              {GEORGIAN_CITIES.map((city) => (
                <option key={`from-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>სად</label>
            <select
              name="toCity"
              value={formData.toCity}
              onChange={handleChange}
              className={styles.inputField}
            >
              {GEORGIAN_CITIES.map((city) => (
                <option key={`to-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>თარიღი</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div>
            <label className={styles.label}>მძღოლის სახელი</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div>
            <label className={styles.label}>ასაკი</label>
            <input
              type="number"
              name="driverAge"
              value={formData.driverAge}
              onChange={handleChange}
              className={styles.inputField}
              min="18"
              required
            />
          </div>
          <div>
            <label className={styles.label}>ტელეფონის ნომერი</label>
            <input
              type="tel"
              name="driverPhone"
              value={formData.driverPhone}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div>
            <label className={styles.label}>მანქანის მოდელი</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div>
            <label className={styles.label}>თავისუფალი ადგილები</label>
            <input
              type="number"
              name="freeSeats"
              value={formData.freeSeats}
              onChange={handleChange}
              className={styles.inputField}
              min="1"
              required
            />
          </div>
          <div>
            <label className={styles.label}>ფასი (GEL)</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="მაგ: 50 GEL"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "ვამატებთ..." : "შეთავაზების დამატება"}
        </button>

        {status && (
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: status.startsWith("✅")
                ? "rgb(22 163 74)"
                : "rgb(239 68 68)",
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
