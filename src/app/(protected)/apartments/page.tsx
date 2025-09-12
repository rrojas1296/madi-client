import EmptyApartmentsTable from "@/features/apartments/components/emptyApartmentsTable/EmptyApartmentsTable";
import Button from "@/features/shared/components/button/button";
import PlusIcon from "@/features/shared/components/icons/PlusIcon";
import SearchIcon from "@/features/shared/components/icons/SearchIcon";
import Input from "@/features/shared/components/input/Input";
import { DownloadIcon, FilterIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Apartments");
  const data = [];
  return (
    <div className="animate-fade-in flex flex-col h-full relative">
      {data.length > 0 ? (
        <>
          <h1 className="text-xl lg:hidden font-medium">{t("title")}</h1>
          <p className="text-sm lg:hidden text-text-2 font-medium mt-1">
            {t("subtitle")}
          </p>
          <div className="flex gap-3 mt-6 lg:justify-between">
            <Input
              placeholder="Buscar un departamento"
              containerClassName="w-full lg:max-w-96"
              Icon={
                <SearchIcon className="shrink-0  w-5 h-5 stroke-current text-text-2" />
              }
            />
            <div className="gap-4 hidden lg:flex">
              <Button variant="outline" className="text-text-2 px-6">
                <FilterIcon className="w-5 h-5 text-text-2" />
                Filtrar
              </Button>
              <Button variant="outline" className="text-text-2 px-6">
                <DownloadIcon className="w-5 h-5 text-text-2" />
                Descargar
              </Button>
              <Button className="px-6">
                <PlusIcon className="w-5 h-5 text-text-3" />
                Agregar
              </Button>
            </div>

            <Button variant="icon" className="lg:hidden">
              <DownloadIcon className="w-5 h-5 stroke-current text-text-2" />
            </Button>
            <Button variant="icon" className="lg:hidden">
              <FilterIcon className="w-5 h-5 stroke-current text-text-2" />
            </Button>
          </div>
          <Button className="bg-primary lg:hidden hover:bg-primary/90 rounded-2xl w-12 h-12 fixed bottom-[84px] right-5 ">
            <PlusIcon className="w-5 h-5 text-text-3" />
          </Button>
        </>
      ) : (
        <EmptyApartmentsTable />
      )}
    </div>
  );
};

export default Page;
