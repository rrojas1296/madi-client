import BookingsFilledIcon from "../components/Icons/BookingsFilledIcon";
import BookingsOutlinedIcon from "../components/Icons/BookingsOutlinedIcon";
import BuildingFilledIcon from "../components/Icons/BuildingFilledIcon";
import BuildingOutlinedIcon from "../components/Icons/BuildingOutlinedIcon";
import CreditCardFilledIcon from "../components/Icons/CreditCardFilledIcon";
import CreditCardOutlinedIcon from "../components/Icons/CreditCardOutlinedIcon";
import DashboardFilledIcon from "../components/Icons/DashboardFilledIcon";
import DashboardOutlinedIcon from "../components/Icons/DashboardOutlinedIcon";
import SettingsFilledIcon from "../components/Icons/SettingsFilledIcon";
import SettingsOutlinedIcon from "../components/Icons/SettingsOutlinedIcon";
import UsersFilledIcon from "../components/Icons/UsersFilledIcon";
import UsersOutlinedIcon from "../components/Icons/UsersOutlinedIcon";

export const links = [
  {
    id: 1,
    filledIcon: DashboardFilledIcon,
    outlinedIcon: DashboardOutlinedIcon,
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
