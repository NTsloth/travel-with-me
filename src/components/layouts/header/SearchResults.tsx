"use client";

import { useTravelSearch } from "@/components/context/TravelSearchContext";
import { RouteDetailsModal } from "@/components/UI/RouteDetailsModal";
import styles from "../../../styles/header/SearchResults.module.css";
import { TravelRoute } from "@/components/data/data";

export function SearchResults() {
  const { searchResults, isLoading, searchState, openModal } =
    useTravelSearch();

  if (isLoading) {
    return (
      <div className={styles.infoMessage}>
        <p className="text-xl">
          ვტვირთავთ შედეგებს {searchState.fromCity}-დან {searchState.toCity}
          -მდე...
        </p>
      </div>
    );
  }

  if (searchResults === null) {
    return (
      <div className={styles.infoMessage}>
        <p>
          შეიყვანეთ თქვენი სამგზავრო დეტალები და დააჭირეთ 'ძებნა' ღილაკს
          მარშრუტების სანახავად.
        </p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className={styles.errorMessage}>
        <p className="text-xl">
          თქვენი შერჩეული კრიტერიუმებისთვის სამგზავრო მარშრუტები არ მოიძებნა.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>
        ნაპოვნი მარშრუტები {searchState.travelDate} თარიღისთვის:
      </h2>
      <ul className={styles.list}>
        {searchResults.map((result: TravelRoute) => (
          <li key={result.id} className={styles.listItem}>
            <div className={styles.routeInfo}>
              <p className={styles.route}>
                {result.fromCity} - {result.toCity}
              </p>
              <p className={styles.date}>მანქანა: {result.carModel}</p>
              <p className={styles.date}>
                თავისუფალი ადგილები: {result.freeSeats}
              </p>
            </div>

            <div className={styles.priceButtonContainer}>
              <span className={styles.price}>{result.price}</span>
              <button
                onClick={() => openModal(result)}
                className={styles.detailsButton}
              >
                ვრცლად
              </button>
            </div>
          </li>
        ))}
      </ul>
      <RouteDetailsModal />
    </div>
  );
}
