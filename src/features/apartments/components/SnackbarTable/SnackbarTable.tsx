import Button from "@/features/shared/components/Button/Button";
import TrashIcon from "@/features/shared/components/Icons/TrashIcon";
import { cn } from "@/features/shared/lib/shadcn";

interface Props {
  itemsSelected: number;
}
const SnackbarTable = ({ itemsSelected }: Props) => {
  return (
    <div
      className={cn(
        "border text-sm border-border-1 justify-between w-82 rounded-xl bg-bg-2 fixed -bottom-20 transition-[bottom] ease-in-out left-1/2 -translate-x-1/2 px-4 h-12 flex items-center",
        itemsSelected > 0 && "bottom-8",
      )}
    >
      <p className="flex gap-3">
        <span className="font-bold">{itemsSelected}</span>
        <span>items fueron seleccionados</span>
      </p>
      <Button variant="ghost" className="bg-bg-2 hover:bg-bg-1">
        <TrashIcon className="w-5 h-5 text-danger stroke-current" />
      </Button>
    </div>
  );
};

export default SnackbarTable;
