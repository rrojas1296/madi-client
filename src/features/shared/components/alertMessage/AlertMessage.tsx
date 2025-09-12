import AlertIcon from "../icons/AlertIcon";
import { cn } from "../../lib/shadcn";

interface Props {
  text: string;
}
const AlertMessage = ({ text }: Props) => {
  return (
    <div
      className={cn(
        "h-9 rounded-md bg-danger/10 text-danger flex gap-3 items-center justify-center text-sm animate-fade-in",
      )}
    >
      <AlertIcon className="w-5 h-5 text-danger stroke-current" />
      <span>{text}</span>
    </div>
  );
};

export default AlertMessage;
