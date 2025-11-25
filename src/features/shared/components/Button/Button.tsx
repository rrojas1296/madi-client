import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../../lib/shadcn";

const variants = cva(
  "rounded-lg font-medium outline-none h-9 w-full text-sm flex items-center gap-[10px] justify-center transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        filled: "bg-primary-500 text-text-3 hover:bg-primary-400",
        outline:
          "border border-border-1 bg-transparent text-text-2 hover:bg-bg-2",
        icon: "border border-border-1 shrink-0 text-text-2 h-9 w-9 bg-transparent hover:bg-bg-2",
        ghost: "bg-bg-1 hover:bg-bg-2 text-text-2 w-fit px-3",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  },
);

type Props = ComponentProps<"button"> & VariantProps<typeof variants>;

const Button = ({
  children,
  variant,
  className,
  type = "button",
  ...other
}: Props) => {
  return (
    <button
      className={cn(variants({ variant, className }))}
      type={type}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
