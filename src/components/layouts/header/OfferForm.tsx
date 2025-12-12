"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { GEORGIAN_CITIES, TravelRoute } from "@/components/data/data";
import styles from "../../../styles/header/HeaderSearch.module.css";
import { useAuth } from "@/components/context/AuthContext";

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
  const { handleAddRoute, isLoading } = useTravelSearch();
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");

  if (!userProfile) {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        შეცდომა: მომხმარებლის პროფილი ვერ მოიძებნა.
      </p>
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (
      name === "driverName" ||
      name === "driverAge" ||
      name === "driverPhone"
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "freeSeats"
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

    const priceValue = String(formData.price).trim().toUpperCase();
    const numericPart = priceValue.replace(/[^0-9.]/g, "");

    if (!numericPart) {
      setStatus("გთხოვთ შეიყვანოთ ფასი.");
      return;
    }

    const formattedPrice = `${numericPart} GEL`;

    const routeDataToSubmit: Omit<TravelRoute, "id"> = {
      ...formData,
      price: formattedPrice,
      driverName: userProfile.driverName,
      driverAge: userProfile.driverAge,
      driverPhone: userProfile.driverPhone,
    };

    const success = await handleAddRoute(routeDataToSubmit);

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
    <div className={isModal ? "" : styles.formSection}>
      {!isModal && (
        <>
          <h2 className={styles.title} style={{ fontSize: "20px" }}>
            შექმენი ახალი შეთავაზება (მძღოლის პროფილი: **
            {userProfile.driverName}**)
          </h2>
          <p style={{ color: "rgb(107 114 128)", marginTop: "4px" }}>
            შეავსეთ მარშრუტის მონაცემები.
          </p>
        </>
      )}

      {isModal && (
        <p style={{ color: "rgb(107 114 128)", marginBottom: "16px" }}>
          შეავსეთ მარშრუტის მონაცემები.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>მძღოლის სახელი</label>
            <input
              type="text"
              name="driverName"
              value={userProfile.driverName}
              className={styles.inputField}
              disabled
            />
          </div>
          <div>
            <label className={styles.label}>ასაკი</label>
            <input
              type="text"
              name="driverAge"
              value={userProfile.driverAge}
              className={styles.inputField}
              disabled
            />
          </div>
          <div>
            <label className={styles.label}>ტელეფონის ნომერი</label>
            <input
              type="text"
              name="driverPhone"
              value={userProfile.driverPhone}
              className={styles.inputField}
              disabled
            />
          </div>

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
              placeholder="მაგ: 50"
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
