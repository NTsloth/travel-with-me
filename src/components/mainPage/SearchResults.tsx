"use client";
import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import styles from "@/styles/SearchResults.module.css";

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
            
            <h3 className={styles.routeName} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {route.fromCity} 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              {route.toCity}
            </h3>

            <div className={styles.metaInfo}>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {route.driverName}
              </p>
              
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {route.date}
              </p>
              
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {route.freeSeats} თავისუფალი ადგილი
              </p>
            </div>
            
            <button className={styles.detailsButton}>დეტალები</button>
          </div>
        ))}
      </div>
    </div>
  );
}