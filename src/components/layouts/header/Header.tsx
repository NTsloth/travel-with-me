"use client";

import React, { useState } from "react";
import { TravelSearchProvider } from "@/components/context/TravelSearchContext";
import { HeaderSearch } from "./HeaderSearch";
import { SearchResults } from "./SearchResults";
import { OfferFormModal } from "./OfferFormModal";
import { RouteDetailsModal } from "@/components/UI/RouteDetailsModal";
import styles from "@/styles/header/HeaderSearch.module.css"; 

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
          <div className={styles.logo} onClick={refreshPage}>
            <span className={styles.logoIcon}>🚗</span>
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoMain}>Travel</span>
              <span className={styles.logoSub}>WithMe</span>
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