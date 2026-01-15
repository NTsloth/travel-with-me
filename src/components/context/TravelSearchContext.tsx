"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const TravelSearchContext = createContext<any>(undefined);

export const TravelSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchState, setSearchState] = useState({ fromCity: "", toCity: "", travelDate: "" });
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(searchState).toString();
      const response = await fetch(`/api/travel?${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchState]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleAddRoute = async (routeData: any) => {
    try {
      const response = await fetch("/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routeData),
      });

      if (response.ok) {
        await loadData();
        setIsOfferModalOpen(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Add route error:", error);
      return false;
    }
  };

  return (
    <TravelSearchContext.Provider value={{
      searchState, setSearchState, searchResults, isLoading,
      handleSearch: () => loadData(),
      handleAddRoute,
      isOfferModalOpen, 
      openOfferModal: () => setIsOfferModalOpen(true), 
      closeOfferModal: () => setIsOfferModalOpen(false),
      isModalOpen, selectedRoute, 
      openModal: (route: any) => { setSelectedRoute(route); setIsModalOpen(true); }, 
      closeModal: () => { setIsModalOpen(false); setSelectedRoute(null); }
    }}>
      {children}
    </TravelSearchContext.Provider>
  );
};

export const useTravelSearch = () => useContext(TravelSearchContext);