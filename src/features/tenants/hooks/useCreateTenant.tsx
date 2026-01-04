import { useMutation } from "@tanstack/react-query";
import { createTenantService } from "../services/createTenant.service";
import { CreateTenantSchema } from "../schemas/createTenant.schema";

const useCreateTenant = () => {
  return useMutation({
    mutationKey: ["createTenant"],
    mutationFn: (data: CreateTenantSchema) => createTenantService(data),
  });
};

export default useCreateTenant;
