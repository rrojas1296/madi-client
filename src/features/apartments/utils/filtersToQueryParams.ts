import { FiltersSchema } from "../schemas/filterApartments.schema";

export const filtersToQueryParams = (data: FiltersSchema) => {
  const params: Record<string, string> = {};
  if (data.status?.length) params.status = data.status?.join(",");
  if (data.currency?.length) params.currency = data.currency?.join(",");

  const ranges = ["monthlyFee", "rooms", "area"] as const;
  for (const key of ranges) {
    const r = data[key];
    if (!r) continue;

    if (r.min && !Number.isNaN(r.min)) {
      params[`${key}Min`] = r.min.toString();
    }
    if (r.max && !Number.isNaN(r.max)) {
      params[`${key}Max`] = r.max.toString();
    }
  }

  if (data.pets?.length) params.pets = data.pets?.join(",");
  if (data.furnished?.length) params.furnished = data.furnished?.join(",");

  return params;
};
