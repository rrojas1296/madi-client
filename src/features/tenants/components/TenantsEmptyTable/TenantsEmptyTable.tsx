import useGetApartments from "@/features/hooks/useGetApartments";
import Button from "@/features/shared/components/Button/Button";
import UsersOutlinedIcon from "@/features/shared/components/Icons/UsersOutlinedIcon";
import { useTranslations } from "next-intl";

const TenantsEmptyTable = () => {
  const t = useTranslations("Tenants");
  const { data } = useGetApartments({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    search: "",
  });

  const hasTenants = data?.apartments.length > 0;
  const key = hasTenants ? "apartment" : "tenant";
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <div className="bg-bg-2 rounded h-12 w-12 grid place-items-center rounded-md border border-border-2">
          <UsersOutlinedIcon className="w-8 h-8 stroke-current" />
        </div>

        <h1 className="font-medium text-xl text-center">
          {t(`table.emptyState.${key}.title`)}
        </h1>
        <p className="text-sm text-center text-text-2">
          {t(`table.emptyState.${key}.description`)}
        </p>
        <Button className="w-fit">{t(`table.emptyState.${key}.button`)}</Button>
      </div>
    </div>
  );
};

export default TenantsEmptyTable;
