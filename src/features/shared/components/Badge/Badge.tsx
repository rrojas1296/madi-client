import { cn } from "../../lib/shadcn";

export type BadgeType = "success" | "error" | "warning";
interface Props {
  text: string;
  type: BadgeType;
}
const Badge = ({ text, type }: Props) => {
  const s: Record<BadgeType, string> = {
    success: "border-success bg-success/10 text-success",
    error: "border-danger bg-danger/10 text-danger",
    warning: "border-warning bg-warning/10 text-warning",
  };
  const borderColor = s[type];
  return (
    <div
      className={cn("rounded-md w-fit border px-3 py-1 text-xs", borderColor)}
    >
      {text}
    </div>
  );
};

export default Badge;
