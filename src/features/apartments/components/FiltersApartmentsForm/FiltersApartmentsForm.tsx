import Button from "@/features/shared/components/button/button";
import ArrowLeftIcon from "@/features/shared/components/icons/ArrowLeftIcon";
import { useSidebar } from "@/features/shared/hooks/useSidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  filterControls,
  FiltersSchema,
  filtersSchema,
} from "../../schemas/filterApartments.schema";
import { useTranslations } from "next-intl";
import FormField from "@/features/shared/components/formfield/FormField";
import { useURLSearchParams } from "@/features/shared/hooks/useURLSearchParams";
import { filtersToQueryParams } from "../../utils/filtersToQueryParams";
import ArrowRightIcon from "@/features/shared/components/icons/ArrowRightIcon";

const FiltersApartmentsForm = () => {
  const { setOpen } = useSidebar();
  const t = useTranslations("Apartments");
  const setParams = useURLSearchParams();
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(filtersSchema),
  });
  const setFiltersHandler = (data: FiltersSchema) => {
    const params = filtersToQueryParams(data);
    setParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit(setFiltersHandler)}
      className="px-5 pt-6 pb-18 lg:pb-6 h-full overflow-y-auto custom-scroll "
    >
      <header className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold">{t("filters.header.title")}</h1>
        <Button variant="icon" onClick={() => setOpen(false)}>
          <ArrowRightIcon className="w-5 h-5 stroke-current" />
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
          <Button variant="outline" type="button">
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
