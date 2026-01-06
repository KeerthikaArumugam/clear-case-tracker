import { Check, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "pending" | "in-progress" | "resolved";

interface StatusTimelineProps {
  currentStatus: Status;
  className?: string;
}

const steps = [
  { status: "pending", label: "Pending", description: "Complaint received" },
  { status: "in-progress", label: "In Progress", description: "Being reviewed" },
  { status: "resolved", label: "Resolved", description: "Issue addressed" },
];

const StatusTimeline = ({ currentStatus, className }: StatusTimelineProps) => {
  const currentIndex = steps.findIndex((s) => s.status === currentStatus);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute left-0 top-4 h-0.5 w-full bg-border">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div
              key={step.status}
              className="relative flex flex-col items-center"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card transition-all duration-300",
                  isCompleted && "border-primary bg-primary",
                  isCurrent && "border-primary",
                  isPending && "border-border"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-primary-foreground" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
