import { Link } from "react-router-dom";
import { PlusCircle, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ComplaintCard from "@/components/complaints/ComplaintCard";

const recentComplaints = [
  {
    id: "CMP-2024-001",
    title: "Water leakage in Block A bathroom",
    category: "Plumbing",
    department: "Maintenance",
    location: "Block A, Floor 2",
    status: "in-progress" as const,
    priority: "high" as const,
    date: "Jan 5, 2024",
  },
  {
    id: "CMP-2024-002",
    title: "Broken AC unit in Room 302",
    category: "Electrical",
    department: "Facilities",
    location: "Main Building, Room 302",
    status: "pending" as const,
    priority: "medium" as const,
    date: "Jan 4, 2024",
  },
  {
    id: "CMP-2023-089",
    title: "Street light not working near parking",
    category: "Electrical",
    department: "Public Works",
    location: "Parking Lot B",
    status: "resolved" as const,
    priority: "low" as const,
    date: "Dec 28, 2023",
  },
];

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn userName="John Doe" />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, <span className="gradient-text">John</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track and manage your complaints in one place
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-8 animate-slide-up">
          <Link to="/submit-complaint">
            <Button size="lg" variant="gradient" className="w-full sm:w-auto">
              <PlusCircle className="h-5 w-5" />
              Register New Complaint
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <StatsCard
            title="Total Complaints"
            value={12}
            icon={FileText}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatsCard
            title="Pending"
            value={3}
            icon={Clock}
            iconClassName="bg-warning/10 text-warning"
          />
          <StatsCard
            title="In Progress"
            value={2}
            icon={AlertTriangle}
            iconClassName="bg-info/10 text-info"
          />
          <StatsCard
            title="Resolved"
            value={7}
            icon={CheckCircle}
            iconClassName="bg-success/10 text-success"
          />
        </div>

        {/* Recent Complaints */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Complaints</h2>
            <Link
              to="/my-complaints"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} {...complaint} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
