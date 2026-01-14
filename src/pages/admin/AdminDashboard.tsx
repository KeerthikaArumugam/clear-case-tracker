import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Building2,
} from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminMobileNav from "@/components/layout/AdminMobileNav";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/complaints/StatusBadge";
import PriorityBadge from "@/components/complaints/PriorityBadge";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { formatDateShort, listAllComplaints } from "@/lib/appData";

const AdminDashboard = () => {
  const complaints = useMemo(() => listAllComplaints(), []);

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "pending").length;
    const inProgress = complaints.filter((c) => c.status === "in-progress").length;
    const resolved = complaints.filter((c) => c.status === "resolved").length;
    const urgent = complaints.filter((c) => c.priority === "urgent" && c.status !== "resolved").length;
    return { total, pending, inProgress, resolved, urgent };
  }, [complaints]);

  const recentComplaints = useMemo(() => {
    return complaints.slice(0, 6).map((c) => ({
      id: c.id,
      title: c.title,
      department: c.department,
      status: c.status,
      priority: c.priority,
      date: formatDateShort(c.createdAt),
    }));
  }, [complaints]);

  const departmentStats = useMemo(() => {
    const byDept = new Map<string, { complaints: number; resolved: number }>();
    for (const c of complaints) {
      const current = byDept.get(c.department) ?? { complaints: 0, resolved: 0 };
      current.complaints += 1;
      if (c.status === "resolved") current.resolved += 1;
      byDept.set(c.department, current);
    }
    return Array.from(byDept.entries())
      .map(([name, value]) => ({ name, ...value }))
      .sort((a, b) => b.complaints - a.complaints)
      .slice(0, 6);
  }, [complaints]);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminMobileNav />

        <main className="flex-1 p-4 lg:p-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: "Dashboard" }]}
            className="mb-4 animate-fade-in"
          />

          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-muted-foreground">
              Monitor and manage all complaints across departments
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-slide-up">
            <StatsCard
              title="Total Complaints"
              value={stats.total}
              icon={FileText}
              iconClassName="bg-primary/10 text-primary"
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              change={stats.urgent > 0 ? `${stats.urgent} urgent` : undefined}
              changeType={stats.urgent > 0 ? "negative" : "neutral"}
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

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Recent Complaints */}
            <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="card-elevated">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">
                    Recent Complaints
                  </h2>
                  <Link
                    to="/admin/complaints"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="divide-y divide-border">
                  {recentComplaints.length > 0 ? (
                    recentComplaints.map((complaint) => (
                      <Link
                        key={complaint.id}
                        to={`/admin/complaints/${complaint.id}`}
                        className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground">{complaint.id}</span>
                            <StatusBadge status={complaint.status} />
                          </div>
                          <p className="text-sm font-medium text-foreground truncate">{complaint.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {complaint.department} • {complaint.date}
                          </p>
                        </div>
                        <PriorityBadge priority={complaint.priority} />
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-sm text-muted-foreground">No complaints yet</div>
                  )}
                </div>
              </div>
            </div>

            {/* Department Stats */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="card-elevated">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">
                    By Department
                  </h2>
                  <Link
                    to="/admin/departments"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Manage
                  </Link>
                </div>

                <div className="p-4 space-y-4">
                  {departmentStats.length > 0 ? (
                    departmentStats.map((dept) => (
                      <div key={dept.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-foreground">{dept.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {dept.resolved}/{dept.complaints}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{
                              width: `${dept.complaints > 0 ? (dept.resolved / dept.complaints) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">No department data yet</div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="card-elevated p-4 text-center">
                  <Users className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-semibold">12</p>
                  <p className="text-xs text-muted-foreground">Active Staff</p>
                </div>
                <div className="card-elevated p-4 text-center">
                  <Building2 className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-semibold">6</p>
                  <p className="text-xs text-muted-foreground">Departments</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
