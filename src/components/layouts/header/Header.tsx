import { TravelSearchProvider } from "@/components/context/TravelSearchContext";
import { HeaderSearch } from "./HeaderSearch";
import { OfferForm } from "./OfferForm";
import { SearchResults } from "./SearchResults";

export default function Header() {
  return (
    <TravelSearchProvider>
      <main className="min-h-screen" style={{ backgroundColor: "#f3f4f6" }}>
        <HeaderSearch />
        <div className="container mx-auto p-4">
          <OfferForm />
          <SearchResults />
        </div>
      </main>
    </TravelSearchProvider>
  );
}
