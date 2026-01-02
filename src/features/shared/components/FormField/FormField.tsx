import { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/shadcn";
import Input from "../Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { IOption } from "../../types/formfield";
import { Control, Controller } from "react-hook-form";
import Switch from "../Switch/Switch";
import SelectMultiBadge from "../SelectMultiBadge/SelectMultiBadge";
import InputRange from "../InputRange/InputRange";
import DateInput from "../DateInput/DateInput";
import InputPhone from "../InputPhone/InputPhone";

interface Props extends ComponentProps<"input"> {
  label?: string | ReactNode;
  options?: IOption[];
  control?: Control<any>;
  required?: boolean;
  placeholder?: string;
  placeholderMin?: string;
  placeholderMax?: string;
  isFloat?: boolean;
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
  isFloat,
  placeholderMax,
  placeholderMin,
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
      case "phone":
        return (
          <Controller
            name={name!}
            control={control}
            render={({ field }) => {
              return (
                <InputPhone
                  placeholder={placeholder}
                  setValue={field.onChange}
                  value={field.value}
                  error={error}
                />
              );
            }}
          />
        );
      case "select-badge":
        return (
          <Controller
            name={name!}
            control={control}
            render={({ field }) => (
              <SelectMultiBadge
                onChange={(val) => field.onChange(val)}
                values={field.value}
                options={options!}
              />
            )}
          />
        );
      case "input-range":
        return (
          <Controller
            name={name!}
            control={control}
            render={({ field }) => (
              <InputRange
                onChange={field.onChange}
                value={field.value}
                placeholderMin={placeholderMin!}
                placeholderMax={placeholderMax!}
              />
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
                <SelectTrigger error={error}>
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
      case "date":
        return (
          <Controller
            name={name!}
            control={control}
            render={({ field }) => (
              <DateInput
                value={field.value}
                setValue={field.onChange}
                error={error}
              />
            )}
          />
        );

      default:
        return (
          <Input
            error={error}
            type={type}
            step={isFloat ? "0.01" : undefined}
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
