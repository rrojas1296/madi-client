import { countryCodes } from "@/features/constants/countryCodes";
import { cn } from "../../lib/shadcn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import Input from "../Input/Input";

interface Props {
  labelCode: string;
  labelNumber: string;
  placeholderCode: string;
  placeholderNumber: string;
  codeValue: string;
  numberValue: string;
  required?: boolean;
  error?: string;
  onChange: (val: { number: string; code: string }) => void;
}
const PhoneInput = ({
  labelCode,
  labelNumber,
  placeholderCode,
  placeholderNumber,
  codeValue,
  required,
  error,
  onChange,
  numberValue,
}: Props) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 w-4/12">
        <label className={cn("text-sm text-text-1", error && "text-danger")}>
          {labelCode}
          {required && <span className="text-red-500">*</span>}
        </label>
        <Select
          defaultValue={codeValue}
          onValueChange={(val) => onChange({ number: numberValue, code: val })}
        >
          <SelectTrigger error={error}>
            <SelectValue placeholder={placeholderCode} />
          </SelectTrigger>
          <SelectContent>
            {countryCodes?.map((cc) => (
              <SelectItem value={cc.code} key={cc.code}>
                {cc.code} {cc.flag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className={cn("text-sm text-text-1", error && "text-danger")}>
          {labelNumber}
          {required && <span className="text-red-500">*</span>}
        </label>
        <Input
          placeholder={placeholderNumber}
          onChange={(e) =>
            onChange({ number: e.target.value, code: codeValue })
          }
          value={numberValue || ""}
          type="tel"
          inputMode="numeric"
          error={error}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
