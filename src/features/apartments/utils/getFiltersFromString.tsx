import {
  ApartmentCurrencies,
  ApartmentStatus,
} from "../schemas/createApartment.schema";
import { ApartmentFilters } from "../store/useFilters";

export const getFiltersFromString = (p: string): ApartmentFilters => {
  const params = new URLSearchParams(p);
  return {
    status:
      (params.get("status")?.split(",") as ApartmentStatus[]) || undefined,
    currency:
      (params.get("currency")?.split(",") as ApartmentCurrencies[]) ||
      undefined,
    monthlyFee: {
      min: Number(params.get("monthlyFeeMin")) || NaN,
      max: Number(params.get("monthlyFeeMax")) || NaN,
    },
    rooms: {
      min: Number(params.get("roomsMin")) || NaN,
      max: Number(params.get("roomsMax")) || NaN,
    },
    area: {
      min: Number(params.get("areaMin")) || NaN,
      max: Number(params.get("areaMax")) || NaN,
    },
    pets: params.get("pets") === "true",
    furnished: params.get("furnished") === "true",
  };
};
