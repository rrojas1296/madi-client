import { ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/instance";
import { Response } from "@/api/types";

interface TenantsList extends Response {
  tenants: { id: string; name: string }[];
}

export const getTenantsList = async () => {
  const res = await instance.get<TenantsList>(ENDPOINTS.tenants.getList);
  return res.data;
};
