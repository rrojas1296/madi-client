"use client";
import LoadingIcon from "@/features/shared/components/Icons/LoadingIcon";
import PlusIcon from "@/features/shared/components/Icons/PlusIcon";
import ApartmentMobileCard from "@/features/apartments/components/ApartmentMobileCard/ApartmentMobileCard";
import EmptyApartmentsTable from "@/features/apartments/components/EmptyApartmentsTable/EmptyApartmentsTable";
import SearchAndFilters from "@/features/apartments/components/SearchAndFilters/SearchAndFilters";
import TableApartments from "@/features/apartments/components/TableApartments/TableApartments";
import Button from "@/features/shared/components/Button/Button";
import useDebounce from "@/features/shared/hooks/useDebounce";
import { useSidebar } from "@/features/shared/hooks/useSidebar";
import { PaginationState } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useApartmentsTable from "@/features/apartments/hooks/useApartmentsTable";
import SnackbarTable from "@/features/apartments/components/SnackbarTable/SnackbarTable";
import DeleteMultipleApartments from "@/features/apartments/components/DeleteMultipleApartments/DeleteMultipleApartments";

const Page = () => {
  const t = useTranslations("Apartments");
  const params = useSearchParams();
  const query = params.toString();
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText, 300);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  const { table, rowSelection, setRowSelection, isLoading, data } =
    useApartmentsTable(debouncedText, query, pagination);
  const itemsSelected = Object.keys(rowSelection).length;

  const { setElement } = useSidebar();

  useEffect(() => () => setElement(null), []);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setRowSelection({});
  }, [debouncedText]);

  if (isLoading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <LoadingIcon className="w-5 h-5 animate-spin text-text-1" />
      </div>
    );
  }
  return (
    <>
      {(data?.apartments && data.apartments?.length > 0) ||
      (data?.total && data?.total > 0) ? (
        <div className="animate-fade-in flex flex-col h-full">
          <h1 className="text-xl lg:hidden font-medium">{t("title")}</h1>
          <p className="text-sm lg:hidden text-text-2 font-medium mt-1">
            {t("subtitle")}
          </p>
          <SearchAndFilters setText={setSearchText} searchText={searchText} />
          <div className="grid gap-3 mt-6 md:grid-cols-2 lg:hidden">
            {data.apartments.map((apartment) => (
              <ApartmentMobileCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
          {data.pages > 0 && (
            <TableApartments
              totalPages={data.pages}
              setPagination={setPagination}
              pagination={pagination}
              table={table}
            />
          )}
          <Link href="/apartments/create">
            <Button className="bg-primary-500 lg:hidden hover:bg-primary-400 rounded-xl w-12 h-12 fixed bottom-[84px] right-5 ">
              <PlusIcon className="w-5 h-5 text-text-3" />
            </Button>
          </Link>
          <SnackbarTable
            itemsSelected={itemsSelected}
            text={t("snackbar.text")}
            dialogContent={
              <DeleteMultipleApartments
                ids={Object.keys(rowSelection)}
                setRowSelection={setRowSelection}
              />
            }
          />
        </div>
      ) : (
        <EmptyApartmentsTable />
      )}
    </>
  );
};

export default Page;
