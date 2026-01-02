import { ComponentProps, useState } from "react";
import { cn } from "../../lib/shadcn";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { countryCodes } from "@/features/constants/countryCodes";
import { ChevronDownIcon } from "lucide-react";
import Button from "../Button/Button";

interface Props extends ComponentProps<"input"> {
  containerClassName?: string;
  error?: string;
  value: string;
  setValue: (val: string) => void;
}

const InputPhone = ({
  containerClassName,
  error,
  setValue,
  value,
  ...other
}: Props) => {
  const [open, setOpen] = useState(false);
  const flag = countryCodes.find(
    (cc) => cc.code === value?.split(" ")[0],
  )?.flag;
  return (
    <div
      className={cn(
        "flex overflow-hidden items-center border border-border-1 h-9 bg-bg-2 rounded-lg focus-within:ring-2 focus-within:ring-shadow/50 transition-all",
        containerClassName,
        error && "border-danger focus-within:ring-danger/50",
      )}
    >
      <Popover open={open} modal={false}>
        <PopoverTrigger asChild onClick={() => setOpen(!open)}>
          <Button variant="ghost" className="w-fit bg-bg-2">
            {flag}
            <ChevronDownIcon className="w-5 h-5 text-text-2 stroke-current" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="max-h-60 overflow-y-auto w-72 px-0 custom-scroll py-2"
        >
          {countryCodes.map((cc) => {
            return (
              <div
                key={cc.code}
                className="flex cursor-pointer justify-between py-2 px-4 rounded-md text-sm hover:bg-bg-1"
                onClick={() => {
                  const phone = value.split(" ")[1];
                  setValue(`${cc.code} ${phone}`);
                  setOpen(false);
                }}
              >
                <p className="flex gap-2">
                  <span>{cc.flag}</span> <span>{cc.country}</span>
                </p>
                <p>{cc.code}</p>
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
      <input
        type="number"
        className={cn(
          "placeholder:text-text-2 flex-1 text-sm h-full outline-none w-full pr-4",
        )}
        onChange={(e) => {
          const phone = e.target.value;
          const code = value.split(" ")[0];
          setValue(`${code} ${phone}`);
        }}
        {...other}
      />
    </div>
  );
};

export default InputPhone;
