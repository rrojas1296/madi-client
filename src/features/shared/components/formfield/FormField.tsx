import { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/shadcn";
import Input from "../input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { IOption } from "../../types/formfield";
import { Control, Controller } from "react-hook-form";
import Switch from "../switch/Switch";

interface Props extends ComponentProps<"input"> {
  label: string | ReactNode;
  options?: IOption[];
  control?: Control<any>;
  required?: boolean;
  placeholder?: string;
  error?: string;
  Icon?: ReactNode;
}

const FormField = ({
  label,
  error,
  type,
  required = false,
  Icon,
  name,
  control,
  options,
  placeholder,
  ...other
}: Props) => {
  const generateField = () => {
    switch (type) {
      case "switch":
        return (
          <Controller
            name={name!}
            control={control}
            render={({ field }) => (
              <Switch setActive={field.onChange} active={field.value} />
            )}
          />
        );
      case "select":
        return (
          <Controller
            name={name!}
            control={control}
            render={({ field }) => (
              <Select
                defaultValue={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="" error={error}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem value={opt.value.toString()} key={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      default:
        return (
          <Input
            error={error}
            type={type}
            Icon={Icon}
            placeholder={placeholder}
            name={name}
            {...other}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className={cn("text-sm text-text-1", error && "text-danger")}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {generateField()}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
};

export default FormField;
