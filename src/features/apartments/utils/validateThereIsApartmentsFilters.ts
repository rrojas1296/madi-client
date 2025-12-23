import { FiltersSchema } from "../schemas/filterApartments.schema";

export const validateThereIsApartmentsFilters = (filters: FiltersSchema) => {
  return (
    filters.status?.length ||
    filters.currency?.length ||
    filters.monthlyFee?.min ||
    filters.monthlyFee?.max ||
    filters.rooms?.min ||
    filters.rooms?.max ||
    filters.area?.min ||
    filters.area?.max ||
    filters.pets ||
    filters.furnished
  );
};
