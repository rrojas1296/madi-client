import { create } from "zustand";
import {
  ApartmentCurrencies,
  ApartmentStatus,
} from "../schemas/createApartment.schema";

export const apartmentFiltersInitialState = {
  area: {
    max: undefined,
    min: undefined,
  },
  monthlyFee: {
    max: undefined,
    min: undefined,
  },
  rooms: {
    max: undefined,
    min: undefined,
  },
  status: undefined,
  currency: undefined,
  pets: false,
  furnished: false,
};

export interface ApartmentFilters {
  area: {
    max?: number;
    min?: number;
  };
  monthlyFee: {
    max?: number;
    min?: number;
  };
  rooms: {
    max?: number;
    min?: number;
  };
  status?: ApartmentStatus[];
  currency?: ApartmentCurrencies[];
  pets?: boolean;
  furnished?: boolean;
}

interface FiltersState {
  filters: ApartmentFilters;
  setFilters: (filters: ApartmentFilters) => void;
}

export const useApartmentFilters = create<FiltersState>((set) => ({
  filters: apartmentFiltersInitialState,
  setFilters: (filters: ApartmentFilters) => set({ filters }),
}));
