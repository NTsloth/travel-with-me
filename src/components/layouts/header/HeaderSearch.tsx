"use client";

import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { useAuth } from "@/components/context/AuthContext";
import { GEORGIAN_CITIES } from "@/components/data/data";
import styles from "@/styles/header/HeaderSearch.module.css";

export function HeaderSearch() {
  const { searchState, setSearchState, handleSearch, openOfferModal } = useTravelSearch();
  const { logout } = useAuth(); 

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchState((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <div className={styles.inputWrapper}>
          <label htmlFor="from-city-select" className={styles.label}>საიდან</label>
          <select 
            id="from-city-select"
            name="fromCity" 
            value={searchState.fromCity} 
            onChange={handleChange} 
            className={styles.selectInput}
          >
            <option value="">ყველა ქალაქი</option>
            {GEORGIAN_CITIES.map((city) => <option key={`from-${city}`} value={city}>{city}</option>)}
          </select>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="to-city-select" className={styles.label}>სად</label>
          <select 
            id="to-city-select"
            name="toCity" 
            value={searchState.toCity} 
            onChange={handleChange} 
            className={styles.selectInput}
          >
            <option value="">ყველა ქალაქი</option>
            {GEORGIAN_CITIES.map((city) => <option key={`to-${city}`} value={city}>{city}</option>)}
          </select>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="date-input" className={styles.label}>თარიღი</label>
          <input 
            id="date-input"
            type="date" 
            name="travelDate" 
            value={searchState.travelDate} 
            onChange={handleChange} 
            className={styles.dateInput} 
          />
        </div>

        <button className={styles.searchButton} onClick={handleSearch} type="button">ძებნა</button>
      </div>

      <div className={styles.actions}>
        <button className={styles.offerButton} onClick={openOfferModal} type="button">
          ➕ დამატება
        </button>
      </div>
    </div>
  );
}