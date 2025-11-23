import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApartments } from "../apartments/services/getApartments.service";

const useGetApartments = (searchText: string, query?: string) => {
  return useQuery({
    queryKey: ["apartments", query, searchText],
    queryFn: () => getApartments(searchText, query),
    placeholderData: keepPreviousData,
  });
};

export default useGetApartments;
