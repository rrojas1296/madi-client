import { instance } from "@/api/instance";
import { Response } from "@/api/types";

interface DeleteMultipleApartmentResponse extends Response {
  apartments: string[];
}

export const deleteMultipleApartmentsService = async (ids: string[]) => {
  const res = await instance.post<DeleteMultipleApartmentResponse>(
    "/apartments/deleteMultiple",
    { ids },
  );
  return res.data;
};
