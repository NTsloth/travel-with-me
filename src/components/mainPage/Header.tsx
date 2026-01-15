"use client";

import React, { useState } from "react";
import { TravelSearchProvider } from "@/components/context/TravelSearchContext";
import { HeaderSearch } from "./HeaderSearch";
import { SearchResults } from "./SearchResults";
import { OfferFormModal } from "./OfferFormModal";
import { RouteDetailsModal } from "@/components/UI/RouteDetailsModal";
import styles from "@/styles/HeaderSearch.module.css"; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <TravelSearchProvider>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={refreshPage} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <div className={styles.logoIcon}>
              <svg 
                width="50" 
                height="28" 
                viewBox="0 0 45 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 10C12 10 15 3 24 3C33 3 36 10 36 10L42 14V22H3M3 14L12 10Z" 
                  stroke="#1e293b" 
                  strokeWidth="2.5" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M15 11C15 11 17 6 24 6C31 6 33 11 33 11" 
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />
                <circle cx="12" cy="22" r="3" fill="#1e293b" />
                <circle cx="33" cy="22" r="3" fill="#1e293b" />
                <line x1="0" y1="13" x2="6" y2="13" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <line x1="2" y1="17" x2="7" y2="17" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            <div className={styles.logoTextWrapper} style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ 
                fontSize: "24px", 
                fontWeight: "800", 
                color: "#1e293b", 
                fontFamily: "sans-serif" 
              }}>
                Travel
              </span>
              <span style={{ 
                fontSize: "24px", 
                fontWeight: "400", 
                color: "#3b82f6", 
                fontFamily: "sans-serif" 
              }}>
                WithMe
              </span>
            </div>
          </div>
          
          <button className={styles.burgerBtn} onClick={toggleMenu}>
            <div className={`${styles.line} ${isMenuOpen ? styles.line1 : ""}`}></div>
            <div className={`${styles.line} ${isMenuOpen ? styles.line2 : ""}`}></div>
            <div className={`${styles.line} ${isMenuOpen ? styles.line3 : ""}`}></div>
          </button>

          <div className={`${styles.navWrapper} ${isMenuOpen ? styles.active : ""}`}>
            <HeaderSearch />
          </div>
        </div>
      </header>

      <SearchResults />
      <RouteDetailsModal />
      <OfferFormModal />
    </TravelSearchProvider>
  );
}