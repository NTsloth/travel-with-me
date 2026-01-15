"use client";
import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import styles from "../../styles/Registration.module.css";

export function RouteDetailsModal() {
  const { isModalOpen, closeModal, selectedRoute } = useTravelSearch();

  if (!isModalOpen || !selectedRoute) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={styles.closeX} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2 className={styles.title} style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          {selectedRoute.fromCity} 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          {selectedRoute.toCity}
        </h2>

        <p className={styles.subtitle} style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {selectedRoute.date}
        </p>

        <div className={styles.detailsGrid}>
          <div className={styles.infoBox}>
            <strong style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              მძღოლი
            </strong>
            <p>{selectedRoute.driverName}</p>
          </div>

          <div className={styles.infoBox}>
            <strong style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <path d="M12 11l2 2-2 2"></path>
              </svg>
              ასაკი
            </strong>
            <p>{selectedRoute.driverAge} წლის</p>
          </div>

          <div className={styles.infoBox}>
            <strong style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polyline points="16 8 20 8 23 11 23 16 16 16 16 8"></polyline>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              მანქანა
            </strong>
            <p>{selectedRoute.carModel}</p>
          </div>

          <div className={styles.infoBox}>
            <strong style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              ადგილები
            </strong>
            <p>{selectedRoute.freeSeats} თავისუფალი</p>
          </div>
        </div>

        <div className={styles.priceFooter}>
          <span>ფასი: {selectedRoute.price}</span>
        </div>

        <a 
          href={`tel:${selectedRoute.driverPhone}`} 
          className={styles.submitButton} 
          style={{ 
            textDecoration: 'none', 
            textAlign: 'center', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px', 
            marginTop: '10px' 
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          დაკავშირება: {selectedRoute.driverPhone}
        </a>
      </div>
    </div>
  );
}