"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchTravelData, addTravelRoute } from "../data/data";

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
    const data = await fetchTravelData(searchState);
    setSearchResults(data);
    setIsLoading(false);
  }, [searchState]);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <TravelSearchContext.Provider value={{
      searchState, setSearchState, searchResults, isLoading,
      handleSearch: () => loadData(),
      handleAddRoute: async (data: any) => {
        const success = await addTravelRoute(data);
        if (success) { await loadData(); setIsOfferModalOpen(false); return true; }
        return false;
      },
      isOfferModalOpen, 
      openOfferModal: () => setIsOfferModalOpen(true), 
      closeOfferModal: () => setIsOfferModalOpen(false),
      isModalOpen, 
      selectedRoute, 
      openModal: (route: any) => { setSelectedRoute(route); setIsModalOpen(true); }, 
      closeModal: () => { setIsModalOpen(false); setSelectedRoute(null); }
    }}>
      {children}
    </TravelSearchContext.Provider>
  );
};

export const useTravelSearch = () => useContext(TravelSearchContext);