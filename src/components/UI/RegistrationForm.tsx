"use client";

import React, { useState, FormEvent } from "react";
import { useAuth } from "@/components/context/AuthContext";
import styles from "@/styles/UI/Registration.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GEORGIAN_PHONE_REGEX = /^5[0-9]{8}$/;

interface FormErrors {
  gmail?: string;
  number?: string;
  driverName?: string;
  driverAge?: string;
  general?: string;
}

export function RegistrationForm() {
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    gmail: "",
    number: "",
    driverName: "",
    driverAge: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));

    if (name === "number") {
      newValue = value.replace(/[^0-9]/g, "");
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.driverName.trim()) {
      newErrors.driverName = "გთხოვთ შეიყვანოთ სახელი და გვარი.";
      isValid = false;
    }
    if (!formData.gmail.trim()) {
      newErrors.gmail = "გთხოვთ შეიყვანოთ ელ. ფოსტა.";
      isValid = false;
    }
    if (!formData.number.trim()) {
      newErrors.number = "გთხოვთ შეიყვანოთ ტელეფონის ნომერი.";
      isValid = false;
    }
    if (!formData.driverAge) {
      newErrors.driverAge = "გთხოვთ შეიყვანოთ ასაკი.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return false;
    }

    if (!EMAIL_REGEX.test(formData.gmail)) {
      newErrors.gmail =
        "გთხოვთ შეიყვანოთ სწორი ელ. ფოსტის ფორმატი (მაგ: example@gmail.com).";
      isValid = false;
    }

    if (!GEORGIAN_PHONE_REGEX.test(formData.number)) {
      newErrors.number = "გთხოვთ შეიყვანოთ სწორი ქართული მობილურის ნომერი.";
      isValid = false;
    }

    const age = parseInt(formData.driverAge);
    if (isNaN(age) || age < 18 || age > 100) {
      newErrors.driverAge =
        "ასაკი უნდა იყოს რიცხვი, მინიმუმ 18 და მაქსიმუმ 100.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrors((prev) => ({
        ...prev,
        general: "გთხოვთ შეასწოროთ ფორმაში არსებული შეცდომები.",
      }));
      return;
    }

    const age = parseInt(formData.driverAge);

    const submittedData = {
      surname: "",
      otherDetail: "",
      driverPhone: formData.number,

      gmail: formData.gmail,
      number: formData.number,
      driverName: formData.driverName.trim(),
      driverAge: age,
    };

    registerUser(submittedData);
  };

  const getInputClassName = (name: keyof FormErrors) =>
    `${styles.inputField} ${errors[name] ? styles.inputError : ""}`;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          რეგისტრაცია
        </h2>

        <input
          type="text"
          name="driverName"
          placeholder="სახელი და გვარი"
          value={formData.driverName}
          onChange={handleChange}
          className={getInputClassName("driverName")}
          required
        />
        {errors.driverName && (
          <p className={styles.errorMessage}>{errors.driverName}</p>
        )}

        <input
          type="email"
          name="gmail"
          placeholder="ელ. ფოსტა (Gmail)"
          value={formData.gmail}
          onChange={handleChange}
          className={getInputClassName("gmail")}
          required
        />
        {errors.gmail && <p className={styles.errorMessage}>{errors.gmail}</p>}

        <input
          type="tel"
          name="number"
          placeholder="ტელეფონის ნომერი"
          value={formData.number}
          onChange={handleChange}
          className={getInputClassName("number")}
          maxLength={9}
          required
        />
        {errors.number && (
          <p className={styles.errorMessage}>{errors.number}</p>
        )}

        <input
          type="number"
          name="driverAge"
          placeholder="ასაკი"
          value={formData.driverAge}
          onChange={handleChange}
          className={getInputClassName("driverAge")}
          min="18"
          max="100"
          required
        />
        {errors.driverAge && (
          <p className={styles.errorMessage}>{errors.driverAge}</p>
        )}

        {errors.general && (
          <p className={styles.generalErrorMessage}>{errors.general}</p>
        )}

        <button type="submit">რეგისტრაციის გავლა</button>
      </form>
    </div>
  );
}
