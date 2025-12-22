import { FiltersSchema } from "../schemas/filterApartments.schema";

export const filtersToQueryParams = (data: FiltersSchema) => {
  const p = new URLSearchParams();
  if (data.status?.length) p.set("status", data.status?.join(","));
  if (data.currency?.length) p.set("currency", data.currency?.join(","));

  const ranges = ["monthlyFee", "rooms", "area"] as const;
  for (const key of ranges) {
    const r = data[key];
    if (!r) continue;

    if (r.min && !Number.isNaN(r.min)) {
      p.set(`${key}Min`, r.min.toString());
    }
    if (r.max && !Number.isNaN(r.max)) {
      p.set(`${key}Max`, r.max.toString());
    }
  }

  if (data.pets) p.set("pets", "true");
  if (data.furnished) p.set("furnished", "true");

  return p;
};
