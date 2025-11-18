import Button from "@/features/shared/components/button/button";
import FiltersIcon from "@/features/shared/components/icons/FiltersIcon";
import PlusIcon from "@/features/shared/components/icons/PlusIcon";
import SearchIcon from "@/features/shared/components/icons/SearchIcon";
import Input from "@/features/shared/components/input/Input";
import { useSidebar } from "@/features/shared/hooks/useSidebar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FiltersApartmentsForm from "../FiltersApartmentsForm/FiltersApartmentsForm";
import FileOutlinedIcon from "@/features/shared/components/icons/FileOutlinedIcon";
import TableOutlinedIcon from "@/features/shared/components/icons/TableOutlinedIcon";

const SearchAndFilters = () => {
  const t = useTranslations("Apartments");
  const { setOpen, setElement } = useSidebar();

  const openSidebar = () => {
    setElement(<FiltersApartmentsForm />);
    setOpen(true);
  };
  return (
    <div className="flex gap-3 mt-6 lg:justify-between">
      <Input
        placeholder={t("searchAndFilters.inputPlaceholder")}
        containerClassName="w-full lg:max-w-96"
        Icon={
          <SearchIcon className="shrink-0  w-5 h-5 stroke-current text-text-2" />
        }
      />
      <div className="gap-4 hidden lg:flex">
        <Button variant="outline" className="text-text-2 px-3">
          <TableOutlinedIcon className="w-5 h-5 text-text-2" />
          {t("searchAndFilters.columns")}
        </Button>
        <Button
          variant="outline"
          className="text-text-2 px-3"
          onClick={openSidebar}
        >
          <FiltersIcon className="w-5 h-5 text-text-2" />
          {t("searchAndFilters.filter")}
        </Button>
        <Button variant="outline" className="text-text-2 px-3">
          <FileOutlinedIcon className="w-5 h-5 text-text-2" />
          {t("searchAndFilters.export")}
        </Button>
        <Link href="/apartments/create">
          <Button className="px-3">
            <PlusIcon className="w-5 h-5 text-text-3" />
            {t("searchAndFilters.add")}
          </Button>
        </Link>
      </div>

      <Button variant="icon" className="lg:hidden">
        <FileOutlinedIcon className="w-5 h-5 stroke-current text-text-2" />
      </Button>
      <Button variant="icon" className="lg:hidden" onClick={openSidebar}>
        <FiltersIcon className="w-5 h-5 stroke-current text-text-2" />
      </Button>
    </div>
  );
};

export default SearchAndFilters;
