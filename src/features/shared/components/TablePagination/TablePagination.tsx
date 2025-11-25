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
  const leftActive = pagination.pageIndex !== 0;
  const rightActive = pagination.pageIndex < totalPages - 1;
  return (
    <div className={cn("flex items-center lg:justify-between", className)}>
      <p className="text-sm text-text-1">
        Pagina {pagination.pageIndex + 1} de {totalPages}
      </p>
      <div className="flex items-center gap-4">
        <span className="text-sm">Mostar</span>
        <Select
          defaultValue="10"
          onValueChange={(val) => {
            setPagination({
              pageSize: parseInt(val),
              pageIndex: 0,
            });
          }}
        >
          <SelectTrigger className="dark:bg-transparent">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="icon"
          className={cn(!leftActive && "border-border-2")}
          disabled={!leftActive}
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
          variant="icon"
          disabled={!rightActive}
          className={cn(!rightActive && "border-border-2")}
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
