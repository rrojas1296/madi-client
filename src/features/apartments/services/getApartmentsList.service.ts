import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { ApiResponse } from "@/api/types";
import { ApartmentsList } from "../types/api/apartmentsList";

export const getApartmentsList = async () => {
  const res = await instance.get<ApiResponse<ApartmentsList>>(
    ENDPOINTS.apartments.getList,
  );
  return res.data;
};
