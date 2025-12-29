"use client";

import React from "react";
import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { OfferForm } from "./OfferForm";
import styles from "@/styles/UI/Registration.module.css";

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
        <button onClick={closeOfferModal} className={styles.closeX}>
          &times;
        </button>
        
        <div className={styles.modalHeader}>
          <h2>🚗 ახალი შეთავაზება</h2>
          <p className={styles.subtitle}>შეავსეთ მარშრუტის მონაცემები</p>
        </div>

        <OfferForm isModal={true} />
      </div>
    </div>
  );
}