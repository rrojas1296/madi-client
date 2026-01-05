import { instance } from "@/api/instance";
import { Response } from "@/api/types";

interface DeleteApartmentResponse extends Response {
  apartmentId: string;
}

export const deleteApartmentService = async (id: string) => {
  const res = await instance.delete<DeleteApartmentResponse>(
    "/apartments/" + id,
  );
  return res.data;
};
