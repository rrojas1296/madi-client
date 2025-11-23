import { ReadonlyURLSearchParams } from "next/navigation";
import {
  ApartmentCurrencies,
  ApartmentStatus,
} from "../schemas/createApartment.schema";

export const getDefaultFiltersValues = (filters: ReadonlyURLSearchParams) => {
  const status = filters.get("status")?.split(",") as ApartmentStatus[];
  const currency = filters.get("currency")?.split(",") as ApartmentCurrencies[];

  const monthlyFee = getRangeFilter("monthlyFee", filters);
  const rooms = getRangeFilter("rooms", filters);
  const area = getRangeFilter("area", filters);

  const pets = filters.get("pets")?.split(",") as ("true" | "false")[];
  const furnished = filters.get("furnished")?.split(",") as (
    | "true"
    | "false"
  )[];

  return { status, currency, monthlyFee, rooms, area, pets, furnished };
};

const getRangeFilter = (key: string, filters: ReadonlyURLSearchParams) => {
  const valueMax = filters.get(`${key}Max`);
  const valueMin = filters.get(`${key}Min`);
  const max = valueMax ? parseInt(valueMax) : undefined;
  const min = valueMin ? parseInt(valueMin) : undefined;
  if (!max && !min) return undefined;
  return { min, max };
};
