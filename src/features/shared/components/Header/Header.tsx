"use client";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";
import BellIcon from "../Icons/BellIcon";
import BuildingFilledIcon from "../Icons/BuildingFilledIcon";
import SettingsOutlinedIcon from "../Icons/SettingsOutlinedIcon";

import Link from "next/link";
import Button from "../Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { useThemeStore } from "@/store/theme.store";
import Image from "next/image";
import { DEFAULT_USER_IMAGE } from "@/constants/defaults";
import { useLocale, useTranslations } from "next-intl";
import { getToday } from "../../utils/getToday";
import { links } from "../../constants/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { instance } from "@/api/instance";

const HeaderApp = () => {
  const router = useRouter();
  const t = useTranslations("Header");
  const { setTheme, theme } = useThemeStore();
  const locale = useLocale();
  const pathname = usePathname();
  const activeSection = links.find((l) =>
    l.href.startsWith("/" + pathname.split("/")[1]),
  );
  const date = getToday(locale as "en" | "es");

  const handleSwitchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = async () => {
    await instance.get("/auth/signout");
    router.push("/login");
  };
  return (
    <div className="h-header shrink-0 z-10 sticky flex py-4 border-b border-b-border-2 top-0 left-0 px-5 bg-bg-1 w-full lg:h-20 lg:px-6 lg:border-b lg:border-b-border-2 ">
      <div className="flex flex-1 justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-3 lg:hidden">
          <BuildingFilledIcon className="h-5 w-5 fill-current text-primary-400" />
          <span className="font-semibold text-xl">{t("brand")}</span>
        </Link>
        <div className="gap-1 hidden lg:grid">
          {activeSection?.href === "/dashboard" ? (
            <h1 className="font-semibold text-xl">
              {t("greeting")} Diego Rojas
            </h1>
          ) : (
            <h1 className="font-semibold text-xl">
              {t(activeSection!.headerText)}
            </h1>
          )}
          <p className="text-sm text-text-2">{date}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="icon" className="hidden lg:flex">
            <BellIcon className="w-5 h-5 shrink-0 stroke-current text-text-2" />
          </Button>
          <Button
            variant="icon"
            className="hidden lg:flex"
            onClick={handleSwitchTheme}
          >
            {theme === "dark" ? (
              <MoonIcon className="w-5 h-5 stroke-current shrink-0 text-text-2" />
            ) : (
              <SunIcon className="w-5 h-5 stroke-current shrink-0 text-text-2" />
            )}
          </Button>
          <Button
            variant="icon"
            className="lg:hidden"
            onClick={() => router.push("/settings")}
          >
            <SettingsOutlinedIcon className="w-5 h-5 stroke-current text-text-2 shrink-0" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={DEFAULT_USER_IMAGE}
                width={50}
                height={50}
                className="w-10 h-10 rounded-full hidden lg:block cursor-pointer"
                alt="User image profile"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleSignOut}>
                {t("actions.exit")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderApp;
