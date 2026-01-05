import { instance } from "@/api/instance";
import { CreateTenantSchema } from "../schemas/createTenant.schema";
import { ENDPOINTS } from "@/api/endpoints";
import { Response } from "@/api/types";

interface CreateTenantResponse extends Response {
  tenantId: string;
}

export const createTenantService = async (data: CreateTenantSchema) => {
  const res = await instance.post<CreateTenantResponse>(
    ENDPOINTS.tenants.create,
    data,
  );
  return res.data;
};
