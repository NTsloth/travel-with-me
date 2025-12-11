"use client";

import React from "react";
import { useTravelSearch } from "../context/TravelSearchContext";
import styles from "../../styles/header/SearchResults.module.css";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    className={styles.driverPhotoSvg}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
      fill="#000000"
    />
  </svg>
);

export function RouteDetailsModal() {
  const { isModalOpen, selectedRoute, closeModal } = useTravelSearch();

  if (!isModalOpen || !selectedRoute) {
    return null;
  }

  const route = selectedRoute;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>მარშრუტის დეტალები</h3>
          <button onClick={closeModal} className={styles.modalCloseButton}>
            &times;
          </button>
        </div>

        <div className={styles.driverInfo}>
          <div className={styles.driverPhoto}>
            <UserIcon />
          </div>
          <div className={styles.infoGroup}>
            <p>
              <span className={styles.infoLabel}>მძღოლი:</span>
              {route.driverName}
            </p>
            <p>
              <span className={styles.infoLabel}>ასაკი:</span> {route.driverAge}
              წელი
            </p>
            <p>
              <span className={styles.infoLabel}>მანქანა:</span>
              {route.carModel}
            </p>
            <p>
              <span className={styles.infoLabel}>ფასი:</span> {route.price}
            </p>
            <p>
              <span className={styles.infoLabel}>თავისუფალი ადგილები:</span>
              {route.freeSeats}
            </p>
          </div>
        </div>

        <p>
          <span className={styles.infoLabel}>გზა:</span> {route.fromCity} -
          {route.toCity}
        </p>
        <p>
          <span className={styles.infoLabel}>თარიღი:</span> {route.date}
        </p>

        <button
          className={styles.contactButton}
          onClick={() => alert(`დაკავშირება: ${route.driverPhone}`)}
        >
          დაკავშირება ({route.driverPhone})
        </button>
      </div>
    </div>
  );
}
