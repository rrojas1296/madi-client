import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { ApiResponse } from "@/api/types";
import { IApartment } from "../types/apartments";

export const getApartments = async (searchText: string, query?: string) => {
  let path = ENDPOINTS.apartments.getTable;
  if (query) {
    path += `?${query}`;
  }
  const r = await instance.post<
    ApiResponse<{ apartments: IApartment[]; total: number }>
  >(path, {
    searchText,
  });
  return r.data.data;
};
