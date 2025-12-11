"use client";

import React, { useState, FormEvent } from "react";
import { useAuth } from "@/components/context/AuthContext";
import styles from "@/styles/UI/Registration.module.css";

export function RegistrationForm() {
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    gmail: "",
    number: "",
    driverName: "",
    driverAge: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "number") {
      newValue = value.replace(/[^0-9]/g, "");
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.gmail ||
      !formData.number ||
      !formData.driverName ||
      !formData.driverAge
    ) {
      alert("გთხოვთ შეავსოთ ყველა აუცილებელი ველი.");
      return;
    }

    if (formData.number.length < 5) {
      alert("გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი.");
      return;
    }

    const age = parseInt(formData.driverAge);
    if (isNaN(age) || age < 18) {
      alert("მძღოლის ასაკი უნდა იყოს მინიმუმ 18 წელი.");
      return;
    }

    const submittedData = {
      surname: "",

      gmail: formData.gmail,
      number: formData.number,

      otherDetail: "",
      driverPhone: formData.number,

      driverName: formData.driverName,
      driverAge: age,
    };

    registerUser(submittedData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          რეგისტრაცია
        </h2>

        <input
          type="text"
          name="driverName"
          placeholder="მძღოლის სახელი და გვარი"
          value={formData.driverName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="gmail"
          placeholder="ელ. ფოსტა (Gmail)"
          value={formData.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="number"
          placeholder="პირადი ტელეფონის ნომერი"
          value={formData.number}
          onChange={handleChange}
          required
          pattern="\d*"
        />

        <input
          type="number"
          name="driverAge"
          placeholder="ასაკი"
          value={formData.driverAge}
          onChange={handleChange}
          min="18"
          required
        />
        <button type="submit">რეგისტრაციის გავლა</button>
      </form>
    </div>
  );
}
