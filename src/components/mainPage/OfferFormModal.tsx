"use client";

import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { OfferForm } from "./OfferForm";
import styles from "@/styles/Registration.module.css";

export function OfferFormModal() {
  const { isOfferModalOpen, closeOfferModal } = useTravelSearch();

  if (!isOfferModalOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeOfferModal}>
      <div 
        className={styles.modalContent} 
        style={{ maxWidth: "700px" }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeOfferModal} className={styles.closeX} aria-label="Close">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className={styles.modalHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 17h1a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
              <path d="M5 7l1.5-3.5A2 2 0 0 1 8.3 2h7.4a2 2 0 0 1 1.8 1.5L19 7" />
            </svg>
            <h2 style={{ margin: 0 }}>ახალი შეთავაზება</h2>
          </div>
          <p className={styles.subtitle}>შეავსეთ მარშრუტის მონაცემები</p>
        </div>

        <OfferForm isModal={true} />
      </div>
    </div>
  );
}