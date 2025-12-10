"use client";

import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { GEORGIAN_CITIES } from "@/components/data/data";
import styles from "../../../styles/header/HeaderSearch.module.css";

const CitySelect = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={label} className={styles.label}>
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={onChange}
      className={styles.selectInput}
    >
      {GEORGIAN_CITIES.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>
);

export function HeaderSearch() {
  const { searchState, setSearchState, handleSearch, isLoading } =
    useTravelSearch();

  const handleInputChange = (
    field: keyof typeof searchState,
    value: string
  ) => {
    setSearchState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoTitle}>
          <span role="img" aria-label="airplane" className="text-2xl">
            ✈️
          </span>
          <h1 className={styles.title}>გამიყოლე</h1>
        </div>

        <div className={styles.formArea}>
          <CitySelect
            label="საიდან"
            value={searchState.fromCity}
            onChange={(e) => handleInputChange("fromCity", e.target.value)}
          />

          <CitySelect
            label="სად"
            value={searchState.toCity}
            onChange={(e) => handleInputChange("toCity", e.target.value)}
          />

          <div className={styles.formGroup}>
            <label htmlFor="travelDate" className={styles.label}>
              მგზავრობის თარიღი
            </label>
            <input
              id="travelDate"
              type="date"
              value={searchState.travelDate}
              onChange={(e) => handleInputChange("travelDate", e.target.value)}
              className={styles.selectInput}
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={styles.searchButton}
          >
            {isLoading ? "ვპოულობთ..." : "ძებნა"}
          </button>
        </div>
      </div>
    </header>
  );
}
