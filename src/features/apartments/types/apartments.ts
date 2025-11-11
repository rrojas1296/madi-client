import {
  ApartmentCondition,
  ApartmentCurrencies,
  ApartmentStatus,
} from "../schemas/createApartment.schema";

export interface IApartment {
  address: string;
  area: number;
  bathrooms: number;
  condition: ApartmentCondition;
  currency: ApartmentCurrencies;
  floor: number;
  floors: number;
  furnished: boolean;
  garanty: number;
  id: string;
  internalCode: string;
  maintenanceFee?: number;
  monthlyFee: number;
  name: string;
  parking?: string;
  persons: number;
  pets: boolean;
  rooms: number;
  status: ApartmentStatus;
}
