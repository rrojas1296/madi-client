import BookingsFilledIcon from "../components/icons/BookingsFilledIcon";
import BookingsOutlinedIcon from "../components/icons/BookingsOutlinedIcon";
import BuildingFilledIcon from "../components/icons/BuildingFilledIcon";
import BuildingOutlinedIcon from "../components/icons/BuildingOutlinedIcon";
import CreditCardFilledIcon from "../components/icons/CreditCardFilledIcon";
import CreditCardOutlinedIcon from "../components/icons/CreditCardOutlinedIcon";
import HomeFilledIcon from "../components/icons/HomeFilledIcon";
import HomeOutlinedIcon from "../components/icons/HomeOutlinedIcon";
import SettingsFilledIcon from "../components/icons/SettingsFilledIcon";
import SettingsOutlinedIcon from "../components/icons/SettingsOutlinedIcon";
import UsersFilledIcon from "../components/icons/UsersFilledIcon";
import UsersOutlinedIcon from "../components/icons/UsersOutlinedIcon";

export const links = [
  {
    id: 1,
    filledIcon: HomeFilledIcon,
    outlinedIcon: HomeOutlinedIcon,
    label: "sections.dashboard.label",
    headerText: "sections.dashboard.headerText",
    href: "/dashboard",
  },
  {
    id: 2,
    filledIcon: BuildingFilledIcon,
    outlinedIcon: BuildingOutlinedIcon,
    label: "sections.apartments.label",
    headerText: "sections.apartments.headerText",
    href: "/apartments",
  },
  {
    id: 3,
    filledIcon: UsersFilledIcon,
    outlinedIcon: UsersOutlinedIcon,
    label: "sections.tenants.label",
    headerText: "sections.tenants.headerText",
    href: "/tenants",
  },
  {
    id: 4,
    filledIcon: CreditCardFilledIcon,
    outlinedIcon: CreditCardOutlinedIcon,
    label: "sections.payments.label",
    headerText: "sections.payments.headerText",
    href: "/payments",
  },
  {
    id: 5,
    filledIcon: BookingsFilledIcon,
    outlinedIcon: BookingsOutlinedIcon,
    label: "sections.bookings.label",
    headerText: "sections.bookings.headerText",
    href: "/bookings",
  },
  {
    id: 6,
    filledIcon: SettingsFilledIcon,
    outlinedIcon: SettingsOutlinedIcon,
    label: "sections.settings.label",
    headerText: "sections.settings.headerText",
    href: "/settings",
    className: "hidden lg:flex",
  },
];
