import { cn } from "@/lib/utils";
import { CircleDot, Circle, AlertCircle, AlertOctagon } from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
  showIcon?: boolean;
}

const priorityConfig: Record<Priority, { label: string; className: string; icon: React.ElementType }> = {
  low: {
    label: "Low",
    className: "bg-muted text-muted-foreground",
    icon: Circle,
  },
  medium: {
    label: "Medium",
    className: "bg-info/10 text-info",
    icon: CircleDot,
  },
  high: {
    label: "High",
    className: "bg-warning/10 text-warning",
    icon: AlertCircle,
  },
  urgent: {
    label: "Urgent",
    className: "bg-destructive/10 text-destructive",
    icon: AlertOctagon,
  },
};

const PriorityBadge = ({ priority, className, showIcon = true }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
};

export default PriorityBadge;
