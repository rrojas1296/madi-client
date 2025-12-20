import { instance } from "@/api/instance";
import { ApiResponse } from "@/api/types";

export const deleteMultipleApartmentsService = async (ids: string[]) => {
  const res = await instance.post<ApiResponse<{ ids: string[] }>>(
    "/apartments/deleteMultiple",
    { ids },
  );
  return res.data;
};
