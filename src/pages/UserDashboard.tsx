import { Link } from "react-router-dom";
import { PlusCircle, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ComplaintCard from "@/components/complaints/ComplaintCard";
import FloatingActionButton from "@/components/ui/floating-action-button";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatDateShort, listComplaintsForUser } from "@/lib/appData";

const UserDashboard = () => {
  const { user } = useAuth();
  const [recentComplaints, setRecentComplaints] = useState(
    [] as Array<{
      id: string;
      title: string;
      category: string;
      department: string;
      location: string;
      status: "pending" | "in-progress" | "resolved" | "rejected";
      priority: "low" | "medium" | "high" | "urgent";
      date: string;
    }>,
  );

  const stats = useMemo(() => {
    const all = user ? listComplaintsForUser(user.id) : [];
    return {
      total: all.length,
      pending: all.filter((c) => c.status === "pending").length,
      inProgress: all.filter((c) => c.status === "in-progress").length,
      resolved: all.filter((c) => c.status === "resolved").length,
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const all = listComplaintsForUser(user.id);
    const top = all.slice(0, 3).map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
      department: c.department,
      location: c.location,
      status: c.status,
      priority: c.priority,
      date: formatDateShort(c.createdAt),
    }));
    setRecentComplaints(top);
  }, [user]);

  const firstName = user?.name?.split(" ").filter(Boolean)[0] ?? "there";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pb-24 lg:pb-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, <span className="gradient-text">{firstName}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track and manage your complaints in one place
          </p>
        </div>

        {/* Action Button - Desktop */}
        <div className="mb-8 animate-slide-up hidden lg:block">
          <Link to="/submit-complaint">
            <Button size="lg" variant="gradient" className="w-full sm:w-auto">
              <PlusCircle className="h-5 w-5" />
              Register New Complaint
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <StatsCard
            title="Total Complaints"
            value={stats.total}
            icon={FileText}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            iconClassName="bg-warning/10 text-warning"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={AlertTriangle}
            iconClassName="bg-info/10 text-info"
          />
          <StatsCard
            title="Resolved"
            value={stats.resolved}
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
            {recentComplaints.length > 0 ? (
              recentComplaints.map((complaint) => <ComplaintCard key={complaint.id} {...complaint} />)
            ) : (
              <div className="card-elevated p-10 text-center">
                <p className="text-muted-foreground">No complaints yet</p>
                <Link to="/submit-complaint">
                  <Button variant="outline" className="mt-4">
                    Register your first complaint
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button - Mobile */}
      <FloatingActionButton to="/submit-complaint" label="Raise Complaint" />
    </div>
  );
};

export default UserDashboard;
