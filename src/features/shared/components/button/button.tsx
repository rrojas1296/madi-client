import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../../lib/shadcn";

const variants = cva(
  "rounded-md outline-none h-9 w-full text-sm flex items-center gap-2 justify-center transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        filled: "bg-primary text-text-3 hover:bg-primary/80",
        outline: "border border-border-1 bg-2 bg-bg-2 hover:bg-bg-1",
        icon: "border border-border-1 shrink-0 rounded-md h-9 w-9 bg-bg-2 hover:bg-bg-1",
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
