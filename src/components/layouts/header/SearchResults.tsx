"use client";
import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import styles from "@/styles/header/SearchResults.module.css";

export function SearchResults() {
  const { searchResults, openModal } = useTravelSearch();

  if (!searchResults || searchResults.length === 0) return null;

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>ნაპოვნია {searchResults.length} რეისი</h2>
      <div className={styles.grid}>
        {searchResults.map((route: any) => (
          <div key={route.id} className={styles.card} onClick={() => openModal(route)}>
            <div className={styles.cardHeader}>
              <span className={styles.routeBadge}>მარშრუტი</span>
              <span className={styles.price}>{route.price}</span>
            </div>
            <h3 className={styles.routeName}>{route.fromCity} → {route.toCity}</h3>
            <div className={styles.metaInfo}>
              <p>👤 {route.driverName}</p>
              <p>📅 {route.date}</p>
              <p>💺 {route.freeSeats} თავისუფალი ადგილი</p>
            </div>
            <button className={styles.detailsButton}>დეტალები</button>
          </div>
        ))}
      </div>
    </div>
  );
}