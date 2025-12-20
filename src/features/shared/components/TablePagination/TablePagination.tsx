import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { PaginationState } from "@tanstack/react-table";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import ArrowRightIcon from "../Icons/ArrowRightIcon";
import Button from "../Button/Button";
import { cn } from "../../lib/shadcn";
import { useTranslations } from "next-intl";

interface Props {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
  className?: string;
  totalPages: number;
}

const TablePagination = ({
  setPagination,
  pagination,
  totalPages,
  className,
}: Props) => {
  const t = useTranslations("Apartments");
  const rightActive = pagination.pageIndex < totalPages - 1;
  const leftActive = pagination.pageIndex !== 0;
  const allButtons = [...Array(totalPages).keys()];

  const sliceHandler = () => {
    const t = 5;
    const half = Math.floor(t / 2);
    let start = pagination.pageIndex - half;
    if (start < 0) start = 0;
    if (start + t > allButtons.length) {
      start = Math.max(0, allButtons.length - t);
    }
    const end = start + t;
    return allButtons.slice(start, end);
  };

  const buttons = sliceHandler();

  return (
    <div className={cn("items-center lg:justify-between flex", className)}>
      <p className="text-sm text-text-1 hidden lg:block">
        {t("pagination.pages")}
        <span className="font-bold"> {totalPages}</span>
      </p>
      <div className="gap-3 hidden lg:flex">
        <Button
          variant={leftActive ? "outline" : "disabled"}
          disabled={!leftActive}
          isIcon
          onClick={() => {
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex < 1 ? 0 : prev.pageIndex - 1,
            }));
          }}
        >
          <ArrowLeftIcon className="w-5 h-5 shrink-0" />
        </Button>
        {buttons.map((n) => (
          <Button
            key={n}
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: n }))}
            variant={pagination.pageIndex === n ? "filled" : "outline"}
            isIcon
          >
            {n + 1}
          </Button>
        ))}
        <Button
          variant={rightActive ? "outline" : "disabled"}
          disabled={!rightActive}
          isIcon
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex:
                prev.pageIndex === totalPages - 1
                  ? totalPages - 1
                  : prev.pageIndex + 1,
            }))
          }
        >
          <ArrowRightIcon className="w-5 h-5 shrink-0" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <span className="text-sm">{t("pagination.show")}</span>
          <Select
            defaultValue={pagination.pageSize.toString()}
            onValueChange={(val) => {
              setPagination({
                pageSize: parseInt(val),
                pageIndex: 0,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant={!leftActive ? "disabled" : "icon"}
          disabled={!leftActive}
          className="lg:hidden"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex:
                prev.pageIndex === 0 ? prev.pageIndex : prev.pageIndex - 1,
            }))
          }
        >
          <ArrowLeftIcon className="w-5 h-5 shrink-0" />
        </Button>
        <Button
          variant={!rightActive ? "disabled" : "icon"}
          disabled={!rightActive}
          className="lg:hidden"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex:
                totalPages === prev.pageIndex + 1
                  ? prev.pageIndex
                  : prev.pageIndex + 1,
            }))
          }
        >
          <ArrowRightIcon className="w-5 h-5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
