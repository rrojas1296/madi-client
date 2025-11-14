import { ColumnDef } from "@tanstack/react-table";
import { IApartment } from "../types/apartments";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es.js";
import Badge, { BadgeType } from "@/features/shared/components/Badge/Badge";
import { ApartmentStatus } from "../schemas/createApartment.schema";
import CheckBox from "@/features/shared/components/CheckBox/CheckBox";
import DotsIcon from "@/features/shared/components/icons/DotsIcon";

dayjs.extend(relativeTime);
const badgeType: Record<ApartmentStatus, BadgeType> = {
  AVAILABLE: "success",
  LEASED: "error",
  MAINTENANCE: "warning",
};

const useApartmentsColumns = () => {
  const t = useTranslations("Apartments");
  const locale = useLocale();
  const columns: ColumnDef<IApartment, any>[] = [
    {
      id: "select",
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
      id: "name",
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: () => t("table.columns.name.header"),
    },
    {
      id: "address",
      accessorKey: "address",
      cell: (info) => info.getValue(),
      header: () => t("table.columns.address.header"),
    },
    {
      id: "rooms",
      accessorKey: "rooms",
      cell: (info) => info.getValue(),
      header: () => t("table.columns.rooms.header"),
    },
    {
      id: "floors",
      accessorKey: "floors",
      cell: (info) => info.getValue(),
      header: () => t("table.columns.floors.header"),
    },
    {
      id: "status",
      accessorKey: "status",
      cell: (info) => (
        <Badge
          type={badgeType[info.getValue() as ApartmentStatus]}
          text={t(`table.status.${info.getValue().toLowerCase()}`)}
        />
      ),
      header: () => t("table.columns.status.header"),
    },
    {
      id: "bathrooms",
      accessorKey: "bathrooms",
      cell: (info) => info.getValue(),
      header: () => t("table.columns.bathrooms.header"),
    },
    {
      id: "area",
      accessorKey: "area",
      cell: (info) => info.getValue(),
      header: () => t("table.columns.area.header"),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: () => t("table.columns.createdAt.header"),
      cell: (info) => {
        const time = dayjs(info.getValue());
        return time.locale(locale).fromNow();
      },
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: () => t("table.columns.updatedAt.header"),
      cell: (info) => {
        const time = dayjs(info.getValue());
        return time.locale(locale).fromNow();
      },
    },
    {
      id: "actions",
      cell: () => (
        <button className="p-2 outline-none cursor-pointer transition-colors hover:text-text-2 text-text-1">
          <DotsIcon className="w-5 h-5" />
        </button>
      ),
    },
  ];
  return { columns };
};

export default useApartmentsColumns;
