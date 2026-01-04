import { useQuery } from "@tanstack/react-query";
import { getApartmentsList } from "../services/getApartmentsList.service";

const useGetApartmentsList = () => {
  return useQuery({
    queryKey: ["apartmentsList"],
    queryFn: () => getApartmentsList(),
  });
};

export default useGetApartmentsList;
