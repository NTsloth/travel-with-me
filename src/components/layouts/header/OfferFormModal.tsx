"use client";

import React from "react";
import { useTravelSearch } from "../../context/TravelSearchContext";
import { OfferForm } from "./OfferForm";
import styles from "../../../styles/header/SearchResults.module.css";

export function OfferFormModal() {
  const { isOfferModalOpen, closeOfferModal } = useTravelSearch();

  if (!isOfferModalOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={closeOfferModal}>
      <div
        className={styles.modalContent}
        style={{ maxWidth: "800px", width: "90%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>
            შექმენი ახალი შეთავაზება (მძღოლის რეგისტრაცია)
          </h3>
          <button onClick={closeOfferModal} className={styles.modalCloseButton}>
            &times;
          </button>
        </div>

        <OfferForm isModal={true} />
      </div>
    </div>
  );
}
