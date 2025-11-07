"use client";
import Button from "../button/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../../lib/shadcn";
import { links } from "../../constants/links";

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="lg:hidden bg-bg-1 fixed bottom-0 left-0 w-full h-16 border-t border-t-border-2 flex justify-between items-center px-8">
      {links.map(({ Icon, id, href, className }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Button
            key={id}
            variant="icon"
            onClick={() => router.push(href)}
            className={cn(
              "border-none bg-bg-1",
              className,
              isActive && "bg-primary hover:bg-primary/80 text-text-3",
            )}
          >
            {<Icon className="w-5 h-5 fill-current" />}
          </Button>
        );
      })}
    </div>
  );
};

export default BottomNav;
