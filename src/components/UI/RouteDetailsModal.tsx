"use client";
import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import styles from "../../styles/UI/Registration.module.css";

export function RouteDetailsModal() {
  const { isModalOpen, closeModal, selectedRoute } = useTravelSearch();

  if (!isModalOpen || !selectedRoute) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={styles.closeX}>&times;</button>
        
        <h2 className={styles.title}>{selectedRoute.fromCity} ➔ {selectedRoute.toCity}</h2>
        <p className={styles.subtitle}>📅 {selectedRoute.date}</p>

        <div className={styles.detailsGrid}>
          <div className={styles.infoBox}><strong>👤 მძღოლი</strong><p>{selectedRoute.driverName}</p></div>
          <div className={styles.infoBox}><strong>🎂 ასაკი</strong><p>{selectedRoute.driverAge} წლის</p></div>
          <div className={styles.infoBox}><strong>🚘 მანქანა</strong><p>{selectedRoute.carModel}</p></div>
          <div className={styles.infoBox}><strong>💺 ადგილები</strong><p>{selectedRoute.freeSeats} თავისუფალი</p></div>
        </div>

        <div className={styles.priceFooter}>
          <span>ფასი: {selectedRoute.price}</span>
        </div>

        <a href={`tel:${selectedRoute.driverPhone}`} className={styles.submitButton} style={{ textDecoration: 'none', textAlign: 'center', display: 'block', marginTop: '10px' }}>
          დაკავშირება: {selectedRoute.driverPhone}
        </a>
      </div>
    </div>
  );
}