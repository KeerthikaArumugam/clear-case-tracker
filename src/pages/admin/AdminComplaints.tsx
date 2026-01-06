import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminMobileNav from "@/components/layout/AdminMobileNav";
import StatusBadge from "@/components/complaints/StatusBadge";
import PriorityBadge from "@/components/complaints/PriorityBadge";

const complaints = [
  {
    id: "CMP-2024-001",
    title: "Water leakage in Block A bathroom",
    submittedBy: "John Doe",
    department: "Maintenance",
    status: "in-progress" as const,
    priority: "high" as const,
    date: "Jan 5, 2024",
    assignedTo: "Mike Johnson",
  },
  {
    id: "CMP-2024-002",
    title: "Broken AC unit in Room 302",
    submittedBy: "Jane Smith",
    department: "Facilities",
    status: "pending" as const,
    priority: "medium" as const,
    date: "Jan 4, 2024",
    assignedTo: "Unassigned",
  },
  {
    id: "CMP-2024-003",
    title: "Network connectivity issues in Library",
    submittedBy: "Alice Brown",
    department: "IT Department",
    status: "pending" as const,
    priority: "high" as const,
    date: "Jan 3, 2024",
    assignedTo: "Unassigned",
  },
  {
    id: "CMP-2024-004",
    title: "Parking lot lighting not working",
    submittedBy: "Bob Wilson",
    department: "Public Works",
    status: "resolved" as const,
    priority: "low" as const,
    date: "Jan 2, 2024",
    assignedTo: "Tom Davis",
  },
  {
    id: "CMP-2024-005",
    title: "Garbage collection delay in Block C",
    submittedBy: "Carol White",
    department: "Facilities",
    status: "resolved" as const,
    priority: "medium" as const,
    date: "Jan 1, 2024",
    assignedTo: "Sarah Lee",
  },
];

const AdminComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" ||
      complaint.department.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminMobileNav />

        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Complaint Management
              </h1>
              <p className="mt-1 text-muted-foreground">
                View and manage all complaints
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Filters */}
          <div className="card-elevated p-4 mb-6 animate-slide-up">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-36">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="it department">IT Department</SelectItem>
                    <SelectItem value="public works">Public Works</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Table - Desktop */}
          <div className="hidden lg:block card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <th className="px-6 py-4">ID / Title</th>
                    <th className="px-6 py-4">Submitted By</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Assigned To</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-accent/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-xs text-muted-foreground">{complaint.id}</p>
                          <p className="text-sm font-medium text-foreground truncate max-w-xs">
                            {complaint.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {complaint.submittedBy}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {complaint.department}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="px-6 py-4">
                        <PriorityBadge priority={complaint.priority} />
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {complaint.assignedTo}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {complaint.date}
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/complaints/${complaint.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Assign Staff</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards - Mobile */}
          <div className="lg:hidden space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {filteredComplaints.map((complaint) => (
              <Link
                key={complaint.id}
                to={`/admin/complaints/${complaint.id}`}
                className="block card-elevated p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{complaint.id}</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={complaint.status} />
                    <PriorityBadge priority={complaint.priority} />
                  </div>
                </div>
                <h3 className="font-medium text-foreground mb-2">{complaint.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{complaint.department}</span>
                  <span>{complaint.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminComplaints;
