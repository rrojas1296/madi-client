"use client";
import { useDialog } from "../../hooks/useDialog";
import { cn } from "../../lib/shadcn";

const Dialog = () => {
  const { content, open, setOpen } = useDialog();
  return (
    <div
      className={cn(
        "fixed top-0 left-0 inset-0 z-20 flex items-center justify-center",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute top-0 left-0 w-full h-full bg-black/50 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "max-w-[522px] rounded-lg border transition-all border-border-2 p-6 bg-bg-1",
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Dialog;
