import useGetApartments from "@/features/hooks/useGetApartments";
import Button from "@/features/shared/components/Button/Button";
import UsersOutlinedIcon from "@/features/shared/components/Icons/UsersOutlinedIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TenantsEmptyTable = () => {
  const t = useTranslations("Tenants");
  const { data } = useGetApartments({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    search: "",
  });

  const key = data?.apartments.length ? "tenant" : "apartment";
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <div className="bg-bg-2 h-12 w-12 grid place-items-center rounded-md border border-border-2">
          <UsersOutlinedIcon className="w-8 h-8 stroke-current" />
        </div>

        <h1 className="font-medium text-xl text-center">
          {t(`table.emptyState.${key}.title`)}
        </h1>
        <p className="text-sm text-center text-text-2">
          {t(`table.emptyState.${key}.description`)}
        </p>
        <Link
          href={key === "tenant" ? "/tenants/create" : "/apartments/create"}
        >
          <Button className="w-fit">
            {t(`table.emptyState.${key}.button`)}
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default TenantsEmptyTable;
