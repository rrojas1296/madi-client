import { useMutation } from "@tanstack/react-query";
import { createTenantService } from "../services/createTenant.service";
import { CreateTenantSchema } from "../schemas/createTenant.schema";
import { useRouter } from "next/navigation";

const useCreateTenant = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["createTenant"],
    mutationFn: (data: CreateTenantSchema) => createTenantService(data),
    onSuccess: () => {
      router.push("/tenants");
    },
  });
};

export default useCreateTenant;
