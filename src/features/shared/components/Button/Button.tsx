import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../../lib/shadcn";

const variants = cva(
  "rounded-lg font-medium outline-none h-9 px-3 w-full text-sm flex items-center gap-[10px] justify-center transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        filled: "bg-primary-500 text-text-3 hover:bg-primary-400",
        outline: "border border-border-1 bg-bg-1 text-text-2 hover:bg-bg-2",
        icon: "border border-border-1 shrink-0 text-text-2 h-9 w-9 bg-transparent hover:bg-bg-2",
        ghost: "bg-bg-1 hover:bg-bg-2 text-text-2 w-fit px-3",
        disabled:
          "cursor-not-allowed bg-bg-2 text-text-2 h-9 w-9 border-border-2 border",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  },
);

interface Props
  extends ComponentProps<"button">,
    VariantProps<typeof variants> {
  isIcon?: boolean;
}

const Button = ({
  children,
  variant,
  className,
  isIcon = false,
  type = "button",
  ...other
}: Props) => {
  return (
    <button
      className={cn(variants({ variant, className }), isIcon && "w-9 h-9")}
      type={type}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
