"use client";

import { TravelSearchProvider } from "@/components/context/TravelSearchContext";
import { HeaderSearch } from "./HeaderSearch";
import { SearchResults } from "./SearchResults";
import { OfferFormModal } from "./OfferFormModal";
import { useAuth } from "@/components/context/AuthContext";

function HeaderContent() {
  const { resetRegistration } = useAuth();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f3f4f6" }}>
      <HeaderSearch />

      <div style={{ padding: "10px", textAlign: "right" }}>
        <button
          onClick={resetRegistration}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          რეგისტრაციის სტატუსის განულება (Test Reset)
        </button>
      </div>

      <div className="container mx-auto p-4">
        <SearchResults />
      </div>
      <OfferFormModal />
    </main>
  );
}

export default function Header() {
  return (
    <TravelSearchProvider>
      <HeaderContent />
    </TravelSearchProvider>
  );
}
