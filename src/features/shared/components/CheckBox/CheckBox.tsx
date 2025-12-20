import { cn } from "../../lib/shadcn";
import CheckIcon from "../Icons/CheckIcon";

interface Props {
  active: boolean;
  setActive: any;
  size?: "sm" | "md";
}

const CheckBox = ({ active, setActive, size = "md" }: Props) => {
  const styles = {
    container: {
      sm: "h-4 w-4 rounded-sm",
      md: "h-6 w-6 rounded-md",
    },
    icon: {
      sm: "w-3 h-3",
      md: "w-4 h-4",
    },
  };
  return (
    <button
      onClick={setActive}
      type="button"
      className={cn(
        "border border-border-1 transition-colors cursor-pointer grid place-items-center outline-none bg-bg-2",
        styles.container[size],
        active && "bg-primary-500 border-primary-500",
      )}
    >
      {active && <CheckIcon className={cn("text-text-3", styles.icon[size])} />}
    </button>
  );
};

export default CheckBox;
