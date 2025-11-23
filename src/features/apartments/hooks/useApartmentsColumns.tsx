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
import DotsIcon from "@/features/shared/components/Icons/DotsIcon";
import TrashIcon from "@/features/shared/components/Icons/TrashIcon";
import EditIcon from "@/features/shared/components/Icons/EditIcon";

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
  return { columns };
};

export default useApartmentsColumns;
