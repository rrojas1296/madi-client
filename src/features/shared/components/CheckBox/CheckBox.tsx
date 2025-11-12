import { cn } from "../../lib/shadcn";
import CheckIcon from "../icons/CheckIcon";

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
        "border border-border-1 transition-colors rounded-sm cursor-pointer grid place-items-center outline-none bg-bg-1 h-5 w-5",
        active && "bg-primary border-primary",
      )}
    >
      {active && <CheckIcon className="text-text-3 h-4 w-4" />}
    </button>
  );
};

export default CheckBox;
