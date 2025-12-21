import Button from "@/features/shared/components/Button/Button";
import FiltersIcon from "@/features/shared/components/Icons/FiltersIcon";
import PlusIcon from "@/features/shared/components/Icons/PlusIcon";
import SearchIcon from "@/features/shared/components/Icons/SearchIcon";
import Input from "@/features/shared/components/Input/Input";
import { useSidebar } from "@/features/shared/hooks/useSidebar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FiltersApartmentsForm from "../FiltersApartmentsForm/FiltersApartmentsForm";
import FileOutlinedIcon from "@/features/shared/components/Icons/FileOutlinedIcon";
import TableOutlinedIcon from "@/features/shared/components/Icons/TableOutlinedIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/shared/components/shadcn/popover";
import CheckBox from "@/features/shared/components/CheckBox/CheckBox";
import { useApartmentsColumnsStore } from "../../store/useApartmentsColumsStore";

interface Props {
  setText: (text: string) => void;
  searchText: string;
}

const SearchAndFilters = ({ searchText, setText }: Props) => {
  const t = useTranslations("Apartments");

  const { setOpen, setElement } = useSidebar();
  const { columns, setColumns } = useApartmentsColumnsStore();

  const openSidebar = () => {
    setElement(<FiltersApartmentsForm />);
    setOpen(true);
  };

  const setActiveColumn = (label: string) => {
    const newColumns = columns.map((c) => {
      if (c.label === label) return { ...c, selected: !c.selected };
      return c;
    });
    setColumns(newColumns);
  };
  return (
    <div className="flex gap-3 lg:justify-between">
      <Input
        placeholder={t("searchAndFilters.inputPlaceholder")}
        containerClassName="w-full lg:max-w-96"
        value={searchText}
        onChange={(e) => setText(e.target.value)}
        Icon={
          <SearchIcon className="shrink-0  w-5 h-5 stroke-current text-text-2" />
        }
      />
      <div className="gap-4 hidden lg:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-text-2 px-3">
              <TableOutlinedIcon className="w-5 h-5 text-text-2" />
              {t("searchAndFilters.columns")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1 className="font-medium">{t("selectColumns.title")}</h1>
            <p className="text-text-2 text-sm">{t("selectColumns.subtitle")}</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {columns.map((co) => (
                <div key={co.label} className="flex items-center gap-2">
                  <CheckBox
                    active={co.selected}
                    size="sm"
                    setActive={() => setActiveColumn(co.label)}
                  />
                  <label
                    onClick={() => setActiveColumn(co.label)}
                    className="text-sm"
                  >
                    {t(co.label)}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
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
        <FileOutlinedIcon className="w-5 h-5 stroke-current text-text-2 shrink-0" />
      </Button>
      <Button variant="icon" className="lg:hidden" onClick={openSidebar}>
        <FiltersIcon className="w-5 h-5 stroke-current text-text-2 shrink-0" />
      </Button>
    </div>
  );
};

export default SearchAndFilters;
