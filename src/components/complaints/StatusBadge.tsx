import { cn } from "@/lib/utils";
import { Clock, Loader2, CheckCircle, XCircle } from "lucide-react";

type Status = "pending" | "in-progress" | "resolved" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
  showIcon?: boolean;
}

const statusConfig: Record<Status, { label: string; className: string; icon: React.ElementType }> = {
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-info/10 text-info border-info/20",
    icon: Loader2,
  },
  resolved: {
    label: "Resolved",
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
};

const StatusBadge = ({ status, className, showIcon = true }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      {showIcon && (
        <Icon className={cn("h-3 w-3", status === "in-progress" && "animate-spin")} />
      )}
      {config.label}
    </span>
  );
};

export default StatusBadge;
