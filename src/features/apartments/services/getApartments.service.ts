import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { ApiResponse } from "@/api/types";
import { IApartment } from "../types/apartments";

export const getApartments = async () => {
  const r = await instance.get<ApiResponse<IApartment[]>>(
    ENDPOINTS.apartments.get,
  );
  return r.data.data;
};
