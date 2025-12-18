import { create } from "zustand";
import { IApartment } from "../types/apartments";

interface Column {
  selected: boolean;
  label: string;
  key: keyof IApartment;
}

interface ColumnsState {
  columns: Column[];
  setColumns: (columns: any[]) => void;
}
const initialState: Column[] = [
  {
    label: "selectColumns.columns.name",
    selected: true,
    key: "name",
  },
  {
    label: "selectColumns.columns.address",
    selected: true,
    key: "address",
  },
  {
    label: "selectColumns.columns.monthlyFee",
    selected: true,
    key: "monthlyFee",
  },
  {
    label: "selectColumns.columns.currency",
    selected: true,
    key: "currency",
  },

  {
    label: "selectColumns.columns.status",
    selected: true,
    key: "status",
  },
  {
    label: "selectColumns.columns.persons",
    selected: true,
    key: "persons",
  },
  {
    label: "selectColumns.columns.rooms",
    selected: true,
    key: "rooms",
  },
  {
    label: "selectColumns.columns.bathrooms",
    selected: true,
    key: "bathrooms",
  },
  {
    label: "selectColumns.columns.floors",
    selected: true,
    key: "floors",
  },
  {
    label: "selectColumns.columns.area",
    selected: true,
    key: "area",
  },
  {
    label: "selectColumns.columns.furnished",
    selected: true,
    key: "furnished",
  },
  {
    label: "selectColumns.columns.pets",
    selected: true,
    key: "pets",
  },
];

export const useApartmentsColumnsStore = create<ColumnsState>((set) => ({
  columns: initialState,
  setColumns: (columns) => set((state) => ({ ...state, columns })),
}));
