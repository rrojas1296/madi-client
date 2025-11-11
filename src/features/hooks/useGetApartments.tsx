import { useQuery } from "@tanstack/react-query";
import { getApartments } from "../apartments/services/getApartments.service";

const useGetApartments = () => {
  return useQuery({
    queryKey: ["apartments"],
    queryFn: () => getApartments(),
  });
};

export default useGetApartments;
