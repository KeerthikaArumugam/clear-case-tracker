import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Download, MoreHorizontal, Trash2, UserPlus, RefreshCw } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminMobileNav from "@/components/layout/AdminMobileNav";
import StatusBadge from "@/components/complaints/StatusBadge";
import PriorityBadge from "@/components/complaints/PriorityBadge";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteComplaint, formatDateShort, listAllComplaints, updateComplaintStatus } from "@/lib/appData";
import { useAuth } from "@/components/auth/AuthProvider";

const AdminComplaints = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [complaints, setComplaints] = useState(
    [] as Array<{
      id: string;
      title: string;
      submittedBy: string;
      department: string;
      status: "pending" | "in-progress" | "resolved" | "rejected";
      priority: "low" | "medium" | "high" | "urgent";
      date: string;
      assignedTo: string;
    }>,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const refresh = () => {
    const rows = listAllComplaints().map((c) => ({
      id: c.id,
      title: c.title,
      submittedBy: c.submittedByName,
      department: c.department,
      status: c.status,
      priority: c.priority,
      date: formatDateShort(c.createdAt),
      assignedTo: c.assignedTo ?? "Unassigned",
    }));
    setComplaints(rows);
  };

  useEffect(() => {
    refresh();
  }, []);

  const departmentOptions = useMemo(() => {
    const unique = new Set(complaints.map((c) => c.department).filter(Boolean));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "all" || complaint.department.toLowerCase() === departmentFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [complaints, searchQuery, statusFilter, departmentFilter]);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    if (selectedComplaint) deleteComplaint(selectedComplaint);
    refresh();
    toast({
      title: "Complaint Deleted",
      description: `Complaint ${selectedComplaint} has been deleted.`,
    });
  };

  const handleCloseComplaint = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCloseDialogOpen(false);
    if (selectedComplaint) updateComplaintStatus(selectedComplaint, "resolved", user?.name ?? "Admin");
    refresh();
    toast({
      title: "Complaint Closed",
      description: `Complaint ${selectedComplaint} has been marked as resolved.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminMobileNav />

        <main className="flex-1 p-4 lg:p-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: "Complaints" }]}
            className="mb-4 animate-fade-in"
          />

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
                    {departmentOptions.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
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
                            <DropdownMenuItem>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Assign Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedComplaint(complaint.id);
                                setCloseDialogOpen(true);
                              }}
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Close Complaint
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setSelectedComplaint(complaint.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
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
              <div
                key={complaint.id}
                className="card-elevated p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{complaint.id}</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={complaint.status} />
                    <PriorityBadge priority={complaint.priority} />
                  </div>
                </div>
                <Link to={`/admin/complaints/${complaint.id}`}>
                  <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors">
                    {complaint.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{complaint.department}</span>
                  <span>{complaint.date}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/admin/complaints/${complaint.id}`}>View</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedComplaint(complaint.id);
                      setCloseDialogOpen(true);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Complaint"
        description={`Are you sure you want to delete complaint ${selectedComplaint}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />

      {/* Close Confirmation */}
      <ConfirmationDialog
        open={closeDialogOpen}
        onOpenChange={setCloseDialogOpen}
        title="Close Complaint"
        description={`Are you sure you want to mark complaint ${selectedComplaint} as resolved? This will notify the user.`}
        confirmText="Close Complaint"
        variant="success"
        onConfirm={handleCloseComplaint}
      />
    </div>
  );
};

export default AdminComplaints;
