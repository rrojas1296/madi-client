import { useTranslations } from "next-intl";
import { useApartmentFilters } from "../../store/useFilters";
import XIcon from "@/features/shared/components/Icons/XIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { filtersToQueryParams } from "../../utils/filtersToQueryParams";
import { useEffect } from "react";
import { getFiltersFromString } from "../../utils/getFiltersFromString";
import { cn } from "@/features/shared/lib/shadcn";

const ApartmentsActiveFilters = () => {
  const t = useTranslations("Apartments");
  const router = useRouter();
  const params = useSearchParams();
  const { filters, setFilters } = useApartmentFilters();

  useEffect(() => {
    const s = params.toString();
    const f = getFiltersFromString(s);
    setFilters(f);
  }, []);
  console.log({ filters });

  return (
    <div
      className={cn(
        "tems-center gap-3 mt-4 hidden lg:flex",
        !filters.status?.length || !filters.currency?.length ? "hidden" : "",
      )}
    >
      <span className="text-sm">{t("activeFilters.label")}</span>
      {filters.status?.map((s) => (
        <div
          key={s}
          className="text-xs bg-bg-2 border border-border-1 rounded-lg px-3 py-[6px] w-fit flex items-center gap-[10px]"
        >
          {t("activeFilters.status.label")}{" "}
          {t(`activeFilters.status.${s.toLowerCase()}`)}
          <XIcon
            onClick={() => {
              filters.status = filters.status?.filter((status) => status !== s);
              const params = filtersToQueryParams(filters);
              router.push(`/apartments?${params.toString()}`);
            }}
            className="w-5 h-5 text-text-2 stroke-current cursor-pointer hover:text-text-1 transition-colors"
          />
        </div>
      ))}
      {filters.currency?.map((currency) => (
        <div
          key={currency}
          className="text-xs bg-bg-2 border border-border-1 rounded-lg px-3 py-[6px] w-fit flex items-center gap-[10px]"
        >
          {t("activeFilters.currency.label")}{" "}
          {t(`activeFilters.currency.${currency.toLowerCase()}`)}
          <XIcon
            onClick={() => {
              filters.currency = filters.currency?.filter(
                (c) => c !== currency,
              );
              const params = filtersToQueryParams(filters);
              router.push(`/apartments?${params.toString()}`);
            }}
            className="w-5 h-5 text-text-2 stroke-current cursor-pointer hover:text-text-1 transition-colors"
          />
        </div>
      ))}
    </div>
  );
};

export default ApartmentsActiveFilters;
