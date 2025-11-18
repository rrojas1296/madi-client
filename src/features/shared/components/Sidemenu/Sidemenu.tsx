"use client";
import { useTranslations } from "next-intl";
import { links } from "../../constants/links";
import { useState } from "react";
import { cn } from "../../lib/shadcn";
import { usePathname, useRouter } from "next/navigation";
import BuildingFilledIcon from "../icons/BuildingFilledIcon";

const SideMenu = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={cn(
        "bg-bg-1 hidden lg:block h-screen border-r border-r-border-2 z-10 fixed top-0 left-0 transition-[width] duration-200 py-4 overflow-x-hidden",
        open ? "w-66" : "w-17",
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-3 px-6 mb-10">
        <BuildingFilledIcon className="h-5 w-5 shrink-0 fill-current text-primary" />
        <p
          className={cn(
            "font-semibold text-xl shrink-0 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          {t("brand")}
        </p>
      </div>
      <div className="px-3 grid gap-3">
        <p
          className={cn(
            "text-text-2 text-sm px-3 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          {t("main")}
        </p>
        <div className="grid gap-1">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const ActiveIcon = link.filledIcon;
            const InactiveIcon = link.outlinedIcon;
            return (
              <div
                key={link.id}
                onClick={() => router.push(link.href)}
                className={cn(
                  "flex items-center cursor-pointer transition-all w-full text-text-2 gap-3 h-9 px-3 rounded-md",
                  isActive && "bg-primary text-text-3",
                  !open && "w-11",
                  !isActive && "hover:text-text-1",
                )}
              >
                {isActive ? (
                  <ActiveIcon className="w-5 shrink-0 h-5 fill-current" />
                ) : (
                  <InactiveIcon className="w-5 h-5 shrink-0 stroke-current" />
                )}
                <span
                  className={cn(
                    "text-sm shrink-0 transition-opacity",
                    open ? "opacity-100" : "opacity-0",
                    isActive && "font-semibold",
                  )}
                >
                  {t(link.label)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
