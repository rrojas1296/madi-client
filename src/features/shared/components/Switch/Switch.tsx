import { Dispatch, SetStateAction } from "react";
import { cn } from "../../lib/shadcn";

interface Props {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}
const Switch = ({ active, setActive }: Props) => {
  return (
    <div
      className={cn(
        "rounded-[20px] h-6 w-10 border border-border-1 relative cursor-pointer",
        active ? "bg-primary-500 border-primary-500" : "bg-bg-2",
      )}
      onClick={() => setActive(!active)}
    >
      <div
        className={cn(
          "w-4 h-4 rounded-full transition-transform bg-text-2 absolute top-1/2 -translate-y-1/2",
          active ? "translate-x-[19px] bg-white" : "translate-x-[5px]",
        )}
      />
    </div>
  );
};

export default Switch;
