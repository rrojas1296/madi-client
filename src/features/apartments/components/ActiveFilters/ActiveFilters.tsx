import XIcon from "@/features/shared/components/Icons/XIcon";
import { useApartmentFilters } from "../../store/useFilters";
import { filtersToQueryParams } from "../../utils/filtersToQueryParams";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ApartmentCurrencies,
  ApartmentStatus,
} from "../../schemas/createApartment.schema";
import { useEffect } from "react";
import { getFiltersFromString } from "../../utils/getFiltersFromString";
import { FiltersSchemaFields } from "../../schemas/filterApartments.schema";
import { validateThereIsApartmentsFilters } from "../../utils/validateThereIsApartmentsFilters";
import { cn } from "@/features/shared/lib/shadcn";

const ActiveFilters = () => {
  const { filters, setFilters } = useApartmentFilters();
  const params = useSearchParams();
  const router = useRouter();
  const t = useTranslations("Apartments");
  const show = validateThereIsApartmentsFilters(filters);

  const handleClearFilter = (
    s: ApartmentStatus | ApartmentCurrencies,
    key: "status" | "currency",
  ) => {
    const newFilters = { ...filters };
    if (key === "status")
      newFilters[key] = newFilters[key]?.filter((f) => f !== s);
    if (key === "currency")
      newFilters[key] = newFilters[key]?.filter((f) => f !== s);
    setFilters(newFilters);
    const params = filtersToQueryParams(newFilters);
    router.push(`/apartments?${params.toString()}`);
  };

  const handleClearRangeFilter = (
    key: "monthlyFee" | "rooms" | "area",
    g: "min" | "max",
  ) => {
    const newFilters = { ...filters };
    newFilters[key]![g] = NaN;
    setFilters(newFilters);
    const params = filtersToQueryParams(newFilters);
    router.push(`/apartments?${params.toString()}`);
  };

  const handleClearBooleanFilters = (key: "pets" | "furnished") => {
    const newFilters = { ...filters };
    newFilters[key] = false;
    setFilters(newFilters);
    const params = filtersToQueryParams(newFilters);
    router.push(`/apartments?${params.toString()}`);
  };

  useEffect(() => {
    const f = getFiltersFromString(params.toString());
    setFilters(f);
  }, []);

  const getBadges = (key: FiltersSchemaFields, g?: "min" | "max") => {
    if (key === "status" || key === "currency") {
      return filters[key]?.map((s) => (
        <div
          key={s}
          className="text-xs bg-bg-2 border border-border-1 rounded-lg px-3 py-[6px] w-fit flex items-center gap-[10px]"
        >
          {t(`activeFilters.${key}.label`)}
          {t(`activeFilters.${key}.${s.toLowerCase()}`)}
          <XIcon
            onClick={() => handleClearFilter(s, key)}
            className="w-5 h-5 text-text-2 stroke-current cursor-pointer hover:text-text-1 transition-colors"
          />
        </div>
      ));
    }
    if (
      g &&
      (key === "monthlyFee" || key === "rooms" || key === "area") &&
      filters[key] &&
      filters[key][g]
    ) {
      return (
        <div
          key={`${key}Range${g}`}
          className="text-xs bg-bg-2 border border-border-1 rounded-lg px-3 py-[6px] w-fit flex items-center gap-[10px]"
        >
          {t(`activeFilters.${key}.label`)}
          {t(`activeFilters.${key}.${g === "min" ? "greater" : "less"}`)}
          {filters[key]?.[g]}
          <XIcon
            onClick={() => handleClearRangeFilter(key, g)}
            className="w-5 h-5 text-text-2 stroke-current cursor-pointer hover:text-text-1 transition-colors"
          />
        </div>
      );
    }
    if ((key === "pets" || key === "furnished") && filters[key]) {
      return (
        <div
          key={key}
          className="text-xs bg-bg-2 border border-border-1 rounded-lg px-3 py-[6px] w-fit flex items-center gap-[10px]"
        >
          {t(`activeFilters.${key}.${filters[key] ? "true" : "false"}`)}
          <XIcon
            onClick={() => handleClearBooleanFilters(key)}
            className="w-5 h-5 text-text-2 stroke-current cursor-pointer hover:text-text-1 transition-colors"
          />
        </div>
      );
    }
  };
  return (
    <div className={cn("flex items-center gap-3 mt-4", !show && "hidden")}>
      <span className="text-sm">{t("activeFilters.label")}</span>
      {getBadges("status")}
      {getBadges("currency")}
      {getBadges("monthlyFee", "min")}
      {getBadges("monthlyFee", "max")}
      {getBadges("rooms", "min")}
      {getBadges("rooms", "max")}
      {getBadges("area", "min")}
      {getBadges("area", "max")}
      {getBadges("pets")}
      {getBadges("furnished")}
    </div>
  );
};

export default ActiveFilters;
