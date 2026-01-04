import { instance } from "@/api/instance";
import { CreateTenantSchema } from "../schemas/createTenant.schema";
import { ENDPOINTS } from "@/api/endpoints";
import { ApiResponse } from "@/api/types";

export const createTenantService = async (data: CreateTenantSchema) => {
  const res = await instance.post<ApiResponse<string>>(
    ENDPOINTS.tenants.create,
    data,
  );
  return res.data;
};
