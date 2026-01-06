import { cn } from "@/lib/utils";

type Priority = "low" | "medium" | "high" | "urgent";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: {
    label: "Low",
    className: "bg-muted text-muted-foreground",
  },
  medium: {
    label: "Medium",
    className: "bg-info/10 text-info",
  },
  high: {
    label: "High",
    className: "bg-warning/10 text-warning",
  },
  urgent: {
    label: "Urgent",
    className: "bg-destructive/10 text-destructive",
  },
};

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default PriorityBadge;
