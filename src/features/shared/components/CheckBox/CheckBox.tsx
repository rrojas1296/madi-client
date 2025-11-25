import { cn } from "../../lib/shadcn";
import CheckIcon from "../Icons/CheckIcon";

interface Props {
  active: boolean;
  setActive: any;
}

const CheckBox = ({ active, setActive }: Props) => {
  return (
    <button
      onClick={setActive}
      type="button"
      className={cn(
        "border border-border-1 transition-colors rounded-md cursor-pointer grid place-items-center outline-none bg-bg-2 h-6 w-6",
        active && "bg-primary-500 border-primary-500",
      )}
    >
      {active && <CheckIcon className="text-text-3 h-4 w-4" />}
    </button>
  );
};

export default CheckBox;
