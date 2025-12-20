import { instance } from "@/api/instance";
import { ApiResponse } from "@/api/types";

export const deleteApartmentService = async (id: string) => {
  const res = await instance.delete<ApiResponse<string>>("/apartments/" + id);
  return res.data;
};
