import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { useState } from "react";
import { Calendar } from "../shadcn/calendar";
import Button from "../Button/Button";
import { cn } from "../../lib/shadcn";

interface Props {
  value: string;
  setValue: (date: string) => void;
  error?: string;
}

const DateInput = ({ value, setValue, error }: Props) => {
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={cn(
            "w-full bg-bg-2 justify-between font-normal",
            value && "text-text-1",
            error && "border-danger focus-within:ring-danger/50",
          )}
        >
          {value ? formattedDate.toLocaleDateString() : "Select date"}
          <ChevronDownIcon className="w-5 h-5 text-text-2 stroke-current" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={formattedDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (date) setValue(date.toISOString());
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
