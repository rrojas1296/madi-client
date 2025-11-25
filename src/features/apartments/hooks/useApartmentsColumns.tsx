import { ColumnDef } from "@tanstack/react-table";
import { IApartment } from "../types/apartments";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es.js";
import Badge, { BadgeType } from "@/features/shared/components/Badge/Badge";
import { ApartmentStatus } from "../schemas/createApartment.schema";
import Button from "@/features/shared/components/Button/Button";
import CheckBox from "@/features/shared/components/CheckBox/CheckBox";
import TrashIcon from "@/features/shared/components/Icons/TrashIcon";
import EditIcon from "@/features/shared/components/Icons/EditIcon";
import { useColumnsStore } from "../store/useColumns";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);
const badgeType: Record<ApartmentStatus, BadgeType> = {
  AVAILABLE: "success",
  LEASED: "error",
  MAINTENANCE: "warning",
};

const useApartmentsColumns = () => {
  const { columns } = useColumnsStore();
  const t = useTranslations("Apartments");
  const [c, setColumns] = useState<ColumnDef<IApartment, any>[]>([]);
  const locale = useLocale();
  const fixedColumns: ColumnDef<IApartment, any>[] = [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="p-2">
          <CheckBox
            active={row.getIsSelected()}
            setActive={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      header: ({ table }) => (
        <div className="p-2">
          <CheckBox
            active={table.getIsAllRowsSelected()}
            setActive={table.getToggleAllRowsSelectedHandler()}
          />
        </div>
      ),
    },

    {
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" className="w-9 h-9">
            <TrashIcon className="w-5 h-5 shrink-0" />
          </Button>

          <Button variant="ghost" className="w-9 h-9">
            <EditIcon className="w-5 h-5 shrink-0" />
          </Button>
        </div>
      ),
    },
  ];

  // 🔹 Columnas dinámicas (se pueden mostrar/ocultar)
  const dynamicColumns: ColumnDef<IApartment, any>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: () => t("table.columns.name.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "address",
      accessorKey: "address",
      header: () => t("table.columns.address.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "monthlyFee",
      accessorKey: "monthlyFee",
      header: () => t("table.columns.monthlyFee.header"),
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "currency",
      accessorKey: "currency",
      header: () => t("table.columns.currency.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "rooms",
      accessorKey: "rooms",
      header: () => t("table.columns.rooms.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "floors",
      accessorKey: "floors",
      header: () => t("table.columns.floors.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "furnished",
      accessorKey: "furnished",
      header: () => t("table.columns.furnished.header"),
      cell: (info) =>
        info.getValue()
          ? t("table.columns.furnished.yes")
          : t("table.columns.furnished.no"),
    },
    {
      id: "pets",
      accessorKey: "pets",
      header: () => t("table.columns.pets.header"),
      cell: (info) =>
        info.getValue()
          ? t("table.columns.pets.yes")
          : t("table.columns.pets.no"),
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => t("table.columns.status.header"),
      cell: (info) => (
        <Badge
          type={badgeType[info.getValue() as ApartmentStatus]}
          text={t(`table.status.${info.getValue().toLowerCase()}`)}
        />
      ),
    },
    {
      id: "bathrooms",
      accessorKey: "bathrooms",
      header: () => t("table.columns.bathrooms.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "area",
      accessorKey: "area",
      header: () => t("table.columns.area.header"),
      cell: (info) => info.getValue(),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: () => t("table.columns.createdAt.header"),
      cell: (info) => dayjs(info.getValue()).locale(locale).fromNow(),
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: () => t("table.columns.updatedAt.header"),
      cell: (info) => dayjs(info.getValue()).locale(locale).fromNow(),
    },
  ];
  useEffect(() => {
    const selectedColumns = columns
      .filter((cl) => cl.selected)
      .map((cl) => cl.key);
    const filteredColumns = dynamicColumns.filter((dc) =>
      selectedColumns.includes(dc.id as keyof IApartment),
    );
    setColumns([fixedColumns[0], ...filteredColumns, fixedColumns[1]]);
  }, [columns]);

  return { columns: c };
};

export default useApartmentsColumns;
