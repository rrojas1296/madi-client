import { cn } from "../../lib/shadcn";

interface Props {
  label: string;
  value: string | number;
  isActive: boolean;
  handleChange: (val: string | number) => void;
}
const BadgeOption = ({ isActive, label, handleChange, value }: Props) => {
  return (
    <button
      onClick={() => handleChange(value)}
      type="button"
      className={cn(
        "border outline-none border-border-1 lg:text-sm text-text-1 text-xs rounded-md bg-transparent cursor-pointer px-3 py-2 w-fit",
        isActive && "bg-primary border-primary text-text-3",
      )}
    >
      {label}
    </button>
  );
};

export default BadgeOption;
