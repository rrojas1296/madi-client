import { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/shadcn";
import Input from "../input/Input";

interface Props extends ComponentProps<"input"> {
  label: string;
  error?: string;
  Icon?: ReactNode;
}

const FormField = ({ label, error, type, Icon, ...other }: Props) => {
  return (
    <div className="grid gap-2">
      <label className={cn("text-sm text-text-1", error && "text-danger")}>
        {label}
      </label>
      <Input error={error} type={type} Icon={Icon} {...other} />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
};

export default FormField;
