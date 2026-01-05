import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { Response } from "@/api/types";

interface ApartmentsList extends Response {
  apartments: { id: string; name: string }[];
}

export const getApartmentsList = async () => {
  const res = await instance.get<ApartmentsList>(ENDPOINTS.apartments.getList);
  return res.data;
};
