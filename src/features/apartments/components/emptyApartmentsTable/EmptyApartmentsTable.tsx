import { useTranslations } from "next-intl";
import BuildingVector from "../vectors/buildingVector";
import Button from "@/features/shared/components/button/button";
import PlusIcon from "@/features/shared/components/icons/PlusIcon";

const EmptyApartmentsTable = () => {
  const t = useTranslations("Apartments.emptyTable");
  return (
    <div className="grid place-items-center h-container-center lg:h-full overflow-hidde">
      <div className="flex flex-col items-center gap-4 max-w-[300px] lg:max-w-[460px] w-full">
        <BuildingVector className="max-w-52 lg:max-w-72" />
        <h1 className="font-medium text-xl text-text-1 text-center">
          {t("title")}
        </h1>
        <p className="font-medium text-sm text-text-2 w-11/12 lg:w-9/12 text-center">
          {t("subtitle")}
        </p>
        <Button
          variant="outline"
          className="text-text-2 bg-bg-1 hover:bg-bg-2 w-fit px-6"
        >
          <PlusIcon className="stroke-current" />
          {t("button")}
        </Button>
      </div>
    </div>
  );
};

export default EmptyApartmentsTable;
