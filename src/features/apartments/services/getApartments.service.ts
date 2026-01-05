import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { Response } from "@/api/types";
import { IApartment } from "../types/apartments";

interface GetApartmentsParams {
  search: string;
  query?: string;
  page: number;
  limit: number;
}

interface ApartmentsList extends Response {
  data: {
    apartments: IApartment[];
    total: number;
    pages: number;
  };
}

export const getApartments = async ({
  search,
  query,
  page,
  limit,
}: GetApartmentsParams) => {
  let path = ENDPOINTS.apartments.getTable;
  if (query) {
    path += `?${query}`;
  }
  const r = await instance.post<ApartmentsList>(path, {
    search,
    page,
    limit,
  });
  return r.data.data;
};
