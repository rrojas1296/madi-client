import { useQuery } from "@tanstack/react-query";
import { getTenantsList } from "../services/getTenantsList.service";

const useGetTenantsList = () => {
  return useQuery({
    queryKey: ["tenantsList"],
    queryFn: () => getTenantsList(),
  });
};

export default useGetTenantsList;
