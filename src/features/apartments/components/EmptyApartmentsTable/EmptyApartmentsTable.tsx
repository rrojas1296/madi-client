import { useTranslations } from "next-intl";
import Button from "@/features/shared/components/Button/Button";
import Link from "next/link";
import BuildingOutlinedIcon from "@/features/shared/components/Icons/BuildingOutlinedIcon";

const EmptyApartmentsTable = () => {
  const t = useTranslations("Apartments");
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="bg-bg-2 h-12 w-12 grid place-items-center rounded-md border border-border-2">
          <BuildingOutlinedIcon className="w-8 h-8 stroke-current" />
        </div>

        <h1 className="font-medium text-xl text-center">
          {t(`emptyTable.title`)}
        </h1>
        <p className="text-sm text-center text-text-2">
          {t(`emptyTable.description`)}
        </p>
        <Link href="/apartments/create">
          <Button className="w-fit">{t(`emptyTable.button`)}</Button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default EmptyApartmentsTable;
