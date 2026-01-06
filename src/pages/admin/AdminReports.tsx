import { TrendingUp, Clock, Target, PieChart } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminMobileNav from "@/components/layout/AdminMobileNav";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Jul", complaints: 45, resolved: 38 },
  { month: "Aug", complaints: 52, resolved: 45 },
  { month: "Sep", complaints: 48, resolved: 42 },
  { month: "Oct", complaints: 61, resolved: 55 },
  { month: "Nov", complaints: 55, resolved: 48 },
  { month: "Dec", complaints: 67, resolved: 58 },
  { month: "Jan", complaints: 72, resolved: 52 },
];

const categoryData = [
  { name: "Plumbing", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Electrical", value: 28, color: "hsl(199, 89%, 48%)" },
  { name: "Infrastructure", value: 22, color: "hsl(142, 76%, 36%)" },
  { name: "IT Services", value: 18, color: "hsl(38, 92%, 50%)" },
  { name: "Other", value: 12, color: "hsl(215, 16%, 47%)" },
];

const resolutionTimeData = [
  { day: "Mon", time: 2.5 },
  { day: "Tue", time: 3.2 },
  { day: "Wed", time: 2.8 },
  { day: "Thu", time: 2.1 },
  { day: "Fri", time: 3.5 },
  { day: "Sat", time: 4.2 },
  { day: "Sun", time: 4.8 },
];

const topIssues = [
  { issue: "Water leakage", count: 24, percentage: 15 },
  { issue: "AC not working", count: 18, percentage: 12 },
  { issue: "Network issues", count: 15, percentage: 10 },
  { issue: "Lighting problems", count: 12, percentage: 8 },
  { issue: "Elevator breakdown", count: 10, percentage: 6 },
];

const AdminReports = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminMobileNav />

        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Reports & Analytics
            </h1>
            <p className="mt-1 text-muted-foreground">
              Insights and trends from complaint data
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-slide-up">
            <StatsCard
              title="Avg Resolution Time"
              value="2.8 days"
              change="-0.5 days from last month"
              changeType="positive"
              icon={Clock}
              iconClassName="bg-primary/10 text-primary"
            />
            <StatsCard
              title="Resolution Rate"
              value="73%"
              change="+5% improvement"
              changeType="positive"
              icon={Target}
              iconClassName="bg-success/10 text-success"
            />
            <StatsCard
              title="Monthly Trend"
              value="+12%"
              change="Complaints increased"
              changeType="negative"
              icon={TrendingUp}
              iconClassName="bg-warning/10 text-warning"
            />
            <StatsCard
              title="SLA Compliance"
              value="89%"
              change="Within target"
              changeType="positive"
              icon={PieChart}
              iconClassName="bg-info/10 text-info"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Monthly Complaints Chart */}
            <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Complaints Trend
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="complaints" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-primary" />
                  <span className="text-muted-foreground">Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-success" />
                  <span className="text-muted-foreground">Resolved</span>
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                By Category
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Time */}
            <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Avg Resolution Time (Days)
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resolutionTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Issues */}
            <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Top Issues
              </h2>
              <div className="space-y-4">
                {topIssues.map((item, index) => (
                  <div key={item.issue}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">
                        {index + 1}. {item.issue}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
