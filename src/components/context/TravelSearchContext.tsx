"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  TravelSearchState,
  initialSearchState,
  fetchTravelData,
  TravelRoute,
  addTravelRoute,
} from "../data/data";
interface TravelContextType {
  searchState: TravelSearchState;
  setSearchState: React.Dispatch<React.SetStateAction<TravelSearchState>>;
  searchResults: TravelRoute[] | null;
  isLoading: boolean;
  handleSearch: () => void;

  isModalOpen: boolean;
  selectedRoute: TravelRoute | null;
  openModal: (route: TravelRoute) => void;
  closeModal: () => void;

  handleAddRoute: (routeData: Omit<TravelRoute, "id">) => Promise<boolean>;
}

const TravelSearchContext = createContext<TravelContextType | undefined>(
  undefined
);

export const TravelSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchState, setSearchState] =
    useState<TravelSearchState>(initialSearchState);
  const [searchResults, setSearchResults] = useState<TravelRoute[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TravelRoute | null>(null);

  const openModal = (route: TravelRoute) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(null);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchResults(null);
    try {
      const data = await fetchTravelData(searchState);
      setSearchResults(data);
    } catch (error) {
      console.error("ძებნა ვერ მოხერხდა:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRoute = async (
    routeData: Omit<TravelRoute, "id">
  ): Promise<boolean> => {
    try {
      await addTravelRoute(routeData);
      handleSearch();
      return true;
    } catch (error) {
      console.error("მარშრუტის დამატება ვერ მოხერხდა:", error);
      return false;
    }
  };

  const contextValue: TravelContextType = {
    searchState,
    setSearchState,
    searchResults,
    isLoading,
    handleSearch,
    isModalOpen,
    selectedRoute,
    openModal,
    closeModal,
    handleAddRoute,
  };

  return (
    <TravelSearchContext.Provider value={contextValue}>
      {children}
    </TravelSearchContext.Provider>
  );
};

export const useTravelSearch = () => {
  const context = useContext(TravelSearchContext);
  if (context === undefined) {
    throw new Error(
      "useTravelSearch must be used within a TravelSearchProvider"
    );
  }
  return context;
};
