import { IApartment } from "../../types/apartments";
import Badge, { BadgeType } from "@/features/shared/components/Badge/Badge";
import { ApartmentStatus } from "../../schemas/createApartment.schema";
import { useTranslations } from "next-intl";

interface Props {
  apartment: IApartment;
}
const ApartmentMobileCard = ({ apartment }: Props) => {
  const t = useTranslations("Apartments");
  const { name, address, bathrooms, persons, rooms, status } = apartment;
  const badgeType: Record<ApartmentStatus, BadgeType> = {
    AVAILABLE: "success",
    LEASED: "error",
    MAINTENANCE: "warning",
  };
  return (
    <div className="border border-border-2 bg-bg-2 rounded-lg p-[14px] flex flex-col">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <h1 className="font-medium">{name}</h1>
          <Badge
            type={badgeType[status]}
            text={t(`apartmentCard.status.${status.toLowerCase()}`)}
          />
        </div>
        <h2 className="text-text-2 text-sm">{address}</h2>
      </div>
      <div className="flex gap-x-5 gap-y-1 mt-4 text-sm w-9/12 flex-wrap">
        <div className="flex gap-2 items-center">
          <span className="font-bold">{persons}</span>
          <span>{t("apartmentCard.items.persons")}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">{rooms}</span>
          <span>{t("apartmentCard.items.rooms")}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">{bathrooms}</span>
          <span>{t("apartmentCard.items.bathrooms")}</span>
        </div>
      </div>
    </div>
  );
};

export default ApartmentMobileCard;
