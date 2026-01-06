import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  to: string;
  label?: string;
  className?: string;
}

const FloatingActionButton = ({
  to,
  label = "New Complaint",
  className,
}: FloatingActionButtonProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "fixed bottom-6 right-6 z-50 lg:hidden",
        "flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg",
        "bg-primary text-primary-foreground",
        "hover:scale-105 active:scale-95 transition-all duration-200",
        "animate-scale-in",
        className
      )}
    >
      <Plus className="h-5 w-5" />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

export default FloatingActionButton;
