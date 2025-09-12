import { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/shadcn";

interface Props extends ComponentProps<"input"> {
  error?: string;
  Icon?: ReactNode;
  containerClassName?: string;
}

const Input = ({
  error,
  type,
  Icon,
  className,
  containerClassName,
  ...other
}: Props) => {
  return (
    <div
      className={cn(
        "flex gap-6 items-center border border-border-1 bg-bg-2 rounded-md px-4 focus-within:ring-2 focus-within:ring-shadow/50 transition-all",
        containerClassName,

        error && "border-danger focus-within:ring-danger/50",
      )}
    >
      <input
        type={type}
        className={cn(
          "placeholder:text-text-2 flex-1 text-sm h-9 outline-none w-full",
          className,
        )}
        {...other}
      />
      {Icon && Icon}
    </div>
  );
};

export default Input;
