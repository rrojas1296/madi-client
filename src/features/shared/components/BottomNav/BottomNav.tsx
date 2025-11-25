"use client";
import Button from "../Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../lib/shadcn";
import { links } from "../../constants/links";
import { useTranslations } from "next-intl";

const BottomNav = () => {
  const pathname = usePathname();
  const t = useTranslations("BottomNav");
  const router = useRouter();
  return (
    <div className="lg:hidden bg-bg-1 fixed bottom-0 left-0 w-full h-16 border-t border-t-border-2 flex justify-between items-center px-8">
      {links.map(({ filledIcon, outlinedIcon, label, id, href, className }) => {
        const isActive = pathname.startsWith(href);
        const ActiveIcon = filledIcon;
        const InactiveIcon = outlinedIcon;
        return (
          <Button
            key={id}
            variant="icon"
            onClick={() => router.push(href)}
            className={cn(
              "border-none bg-bg-1 flex-col gap-1 text-text-2 hover:bg-transparent",
              className,
              isActive && "text-primary-400",
            )}
          >
            {isActive ? (
              <ActiveIcon className="w-5 h-5 shrink-0 fill-current" />
            ) : (
              <InactiveIcon className="w-5 h-5 shrink-0 stroke-current" />
            )}
            <span className="text-xs">{t(label)}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default BottomNav;
