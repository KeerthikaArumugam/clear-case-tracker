import { Link } from "react-router-dom";
import { Calendar, MapPin, Building2, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import { cn } from "@/lib/utils";

interface ComplaintCardProps {
  id: string;
  title: string;
  category: string;
  department: string;
  location: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high" | "urgent";
  date: string;
  className?: string;
}

const ComplaintCard = ({
  id,
  title,
  category,
  department,
  location,
  status,
  priority,
  date,
  className,
}: ComplaintCardProps) => {
  return (
    <Link
      to={`/complaint/${id}`}
      className={cn(
        "block card-elevated p-4 transition-all duration-200 hover:shadow-lg group",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-muted-foreground">#{id}</span>
            <StatusBadge status={status} />
            <PriorityBadge priority={priority} />
          </div>

          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">{category}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
    </Link>
  );
};

export default ComplaintCard;
