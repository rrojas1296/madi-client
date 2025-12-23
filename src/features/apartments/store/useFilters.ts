import { create } from "zustand";
import { FiltersSchema } from "../schemas/filterApartments.schema";

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

interface FiltersState {
  filters: FiltersSchema;
  setFilters: (filters: FiltersSchema) => void;
}

export const useApartmentFilters = create<FiltersState>((set) => ({
  filters: apartmentFiltersInitialState,
  setFilters: (filters) => set({ filters }),
}));
