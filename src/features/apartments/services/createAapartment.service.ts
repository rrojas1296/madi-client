import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { CreateApartmentBody } from "../types/api/createApartment";

export const createApartmentService = async (data: CreateApartmentBody) => {
  const res = await instance.post(ENDPOINTS.apartments.create, data);
  return res.data;
};
