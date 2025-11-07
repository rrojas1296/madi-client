import { ReactNode } from "react";
import { cn } from "../../lib/shadcn";
import SuccessIcon from "../icons/SuccessIcon";
import ErrorIcon from "../icons/ErrorIcon";
import WarningIcon from "../icons/WarningIcon";

type SnackBarType = "success" | "error" | "warning";

interface Props {
  className?: string;
  text: string;
  type?: SnackBarType;
}
const icons: Record<SnackBarType, ReactNode> = {
  success: <SuccessIcon className="w-5 h-5 text-success" />,
  error: <ErrorIcon className="w-5 h-5 text-danger" />,
  warning: <WarningIcon className="w-5 h-5 text-warning" />,
};
const SnackBar = ({ className, text, type = "success" }: Props) => {
  return (
    <div
      className={cn(
        "border border-border-2 bg-bg-2 rounded-md flex items-center gap-4 px-4 py-3 text-sm",
        className,
      )}
    >
      {icons[type]}
      <span>{text}</span>
    </div>
  );
};

export default SnackBar;
