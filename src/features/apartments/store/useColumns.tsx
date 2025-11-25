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
    label: "Nombre",
    selected: true,
    key: "name",
  },
  {
    label: "Direccion",
    selected: true,
    key: "address",
  },
  {
    label: "Status",
    selected: true,
    key: "status",
  },
  {
    label: "Aforo",
    selected: true,
    key: "persons",
  },
  {
    label: "Cuartos",
    selected: true,
    key: "rooms",
  },
  {
    label: "Banos",
    selected: true,
    key: "bathrooms",
  },
  {
    label: "Pisos",
    selected: true,
    key: "floors",
  },
  {
    label: "Area",
    selected: true,
    key: "area",
  },
  {
    label: "Amoblado",
    selected: true,
    key: "furnished",
  },
  {
    label: "Mascotas",
    selected: true,
    key: "pets",
  },
];

export const useColumns = create<ColumnsState>((set) => ({
  columns: initialState,
  setColumns: (columns) => set((state) => ({ ...state, columns })),
}));
