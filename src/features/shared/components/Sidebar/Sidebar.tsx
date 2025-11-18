"use client";
import { useSidebar } from "../../hooks/useSidebar";
import { cn } from "../../lib/shadcn";

const Sidebar = () => {
  const { open, element, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        "z-10 fixed top-0 left-0 inset-0",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "w-full h-full bg-black/50 absolute transition-opacity top-0 left-0",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "w-full h-screen bg-bg-1 max-w-md md:bg-bg-2 top-0 transition-transform right-0 absolute",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {element}
      </div>
    </div>
  );
};

export default Sidebar;
