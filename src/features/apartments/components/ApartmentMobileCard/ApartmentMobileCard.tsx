import { IApartment } from "../../types/apartments";
import Badge, { BadgeType } from "@/features/shared/components/Badge/Badge";
import { ApartmentStatus } from "../../schemas/createApartment.schema";
import PersonsIcon from "@/features/shared/components/Icons/PersonsIcon";
import BedIcon from "@/features/shared/components/Icons/BedIcon";
import { useTranslations } from "next-intl";

interface Props {
  apartment: IApartment;
}
const ApartmentMobileCard = ({ apartment }: Props) => {
  const t = useTranslations("Apartments");
  const { name, address, persons, rooms, status } = apartment;
  const badgeType: Record<ApartmentStatus, BadgeType> = {
    AVAILABLE: "success",
    LEASED: "error",
    MAINTENANCE: "warning",
  };
  return (
    <div className="border border-border-2 bg-bg-2 rounded-lg p-[14px] flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="font-medium">{name}</h1>
        <Badge
          type={badgeType[status]}
          text={t(`apartmentCard.status.${status.toLowerCase()}`)}
        />
      </div>
      <h2 className="text-text-2 text-sm">{address}</h2>
      <div className="flex gap-5">
        <div className="flex gap-2">
          <PersonsIcon className="w-5 h-5 text-text-1" />
          <span className="text-sm">{persons}</span>
        </div>
        <div className="flex gap-2">
          <BedIcon className="w-5 h-5 text-text-1" />
          <span className="text-sm">{rooms}</span>
        </div>
      </div>
    </div>
  );
};

export default ApartmentMobileCard;
