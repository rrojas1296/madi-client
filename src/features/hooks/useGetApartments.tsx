import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApartments } from "../apartments/services/getApartments.service";
import { PaginationState } from "@tanstack/react-table";

interface Props {
  search: string;
  query?: string;
  pagination: PaginationState;
}

const useGetApartments = ({ search, query, pagination }: Props) => {
  return useQuery({
    queryKey: ["apartments", query, pagination, search],
    queryFn: () =>
      getApartments({
        search,
        query,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      }),
    placeholderData: keepPreviousData,
  });
};

export default useGetApartments;
