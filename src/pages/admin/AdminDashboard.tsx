import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminMobileNav from "@/components/layout/AdminMobileNav";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/complaints/StatusBadge";
import PriorityBadge from "@/components/complaints/PriorityBadge";
import { Link } from "react-router-dom";

const recentComplaints = [
  {
    id: "CMP-2024-001",
    title: "Water leakage in Block A",
    department: "Maintenance",
    status: "in-progress" as const,
    priority: "high" as const,
    date: "Jan 5, 2024",
  },
  {
    id: "CMP-2024-002",
    title: "Broken AC unit in Room 302",
    department: "Facilities",
    status: "pending" as const,
    priority: "medium" as const,
    date: "Jan 4, 2024",
  },
  {
    id: "CMP-2024-003",
    title: "Network issues in Library",
    department: "IT Department",
    status: "pending" as const,
    priority: "high" as const,
    date: "Jan 3, 2024",
  },
  {
    id: "CMP-2024-004",
    title: "Parking lot lighting",
    department: "Public Works",
    status: "resolved" as const,
    priority: "low" as const,
    date: "Jan 2, 2024",
  },
];

const departmentStats = [
  { name: "Maintenance", complaints: 45, resolved: 38 },
  { name: "Facilities", complaints: 32, resolved: 28 },
  { name: "IT Department", complaints: 28, resolved: 20 },
  { name: "Public Works", complaints: 22, resolved: 18 },
  { name: "Security", complaints: 15, resolved: 14 },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminMobileNav />

        <main className="flex-1 p-4 lg:p-8">
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
              value={156}
              change="+12% from last month"
              changeType="positive"
              icon={FileText}
              iconClassName="bg-primary/10 text-primary"
            />
            <StatsCard
              title="Pending"
              value={24}
              change="8 urgent"
              changeType="negative"
              icon={Clock}
              iconClassName="bg-warning/10 text-warning"
            />
            <StatsCard
              title="In Progress"
              value={18}
              change="Average 2.5 days"
              changeType="neutral"
              icon={AlertTriangle}
              iconClassName="bg-info/10 text-info"
            />
            <StatsCard
              title="Resolved"
              value={114}
              change="73% resolution rate"
              changeType="positive"
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
                  {recentComplaints.map((complaint) => (
                    <Link
                      key={complaint.id}
                      to={`/admin/complaints/${complaint.id}`}
                      className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">
                            {complaint.id}
                          </span>
                          <StatusBadge status={complaint.status} />
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">
                          {complaint.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {complaint.department} • {complaint.date}
                        </p>
                      </div>
                      <PriorityBadge priority={complaint.priority} />
                    </Link>
                  ))}
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
                  {departmentStats.map((dept, index) => (
                    <div key={dept.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">
                          {dept.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {dept.resolved}/{dept.complaints}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{
                            width: `${(dept.resolved / dept.complaints) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
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
