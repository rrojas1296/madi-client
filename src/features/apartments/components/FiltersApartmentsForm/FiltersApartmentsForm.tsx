import Button from "@/features/shared/components/Button/Button";
import { useSidebar } from "@/features/shared/hooks/useSidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  filterControls,
  FiltersSchema,
  filtersSchema,
} from "../../schemas/filterApartments.schema";
import { useTranslations } from "next-intl";
import FormField from "@/features/shared/components/FormField/FormField";
import { useURLSearchParams } from "@/features/shared/hooks/useURLSearchParams";
import { filtersToQueryParams } from "../../utils/filtersToQueryParams";
import XIcon from "@/features/shared/components/Icons/XIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { getDefaultFiltersValues } from "../../utils/getDefaultFiltersValues";
import { useEffect } from "react";

const undefinedFields = {
  area: {
    max: undefined,
    min: undefined,
  },
  monthlyFee: {
    max: undefined,
    min: undefined,
  },
  rooms: {
    max: undefined,
    min: undefined,
  },
  status: undefined,
  currency: undefined,
  pets: undefined,
  furnished: undefined,
};

const FiltersApartmentsForm = () => {
  const { setOpen } = useSidebar();
  const t = useTranslations("Apartments");
  const setParams = useURLSearchParams();
  const p = useSearchParams();
  const router = useRouter();
  const defaultValues = getDefaultFiltersValues(p);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
  } = useForm({
    resolver: zodResolver(filtersSchema),
  });
  const setFiltersHandler = (data: FiltersSchema) => {
    const params = filtersToQueryParams(data);
    setParams(params);
    setOpen(false);
  };

  const resetHandler = () => {
    router.replace("/apartments");
    setOpen(false);
    reset(undefinedFields);
  };

  useEffect(() => {
    reset(defaultValues);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(setFiltersHandler)}
      className="px-5 pt-6 pb-18 lg:pb-6 h-full overflow-y-auto custom-scroll "
    >
      <header className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold">{t("filters.header.title")}</h1>
        <Button
          variant="ghost"
          className="w-9 h-9"
          onClick={() => setOpen(false)}
        >
          <XIcon className="w-5 h-5 stroke-current shrink-0" />
        </Button>
      </header>
      <p className="text-sm text-text-2 mt-2">
        {t("filters.header.description")}
      </p>
      <div className="grid gap-6 mt-6">
        {filterControls.map((ctrl) => {
          const { name, label, type, options, placeholderMin, placeholderMax } =
            ctrl;
          const opts = options?.map((o) => ({ ...o, label: t(o.label) }));

          let error;

          if (type === "input-range") {
            error =
              (errors[name] as any)?.min?.message ||
              (errors[name] as any)?.max?.message;
          }

          return (
            <FormField
              key={name}
              options={opts}
              label={t(label)}
              placeholderMin={placeholderMin && t(placeholderMin)}
              placeholderMax={placeholderMax && t(placeholderMax)}
              error={error && t(error)}
              control={control}
              type={type}
              name={name}
              {...register}
            />
          );
        })}
        <div className="flex gap-4 absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-5">
          <Button variant="outline" onClick={resetHandler} type="button">
            {t("filters.buttons.reset")}
          </Button>
          <Button variant="filled" type="submit">
            {t("filters.buttons.apply")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FiltersApartmentsForm;
