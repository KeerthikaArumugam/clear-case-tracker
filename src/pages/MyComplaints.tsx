import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import ComplaintCard from "@/components/complaints/ComplaintCard";

const allComplaints = [
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
    id: "CMP-2024-003",
    title: "Network connectivity issues in Library",
    category: "IT Services",
    department: "IT Department",
    location: "Central Library",
    status: "pending" as const,
    priority: "high" as const,
    date: "Jan 3, 2024",
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
  {
    id: "CMP-2023-088",
    title: "Garbage not collected from Block C",
    category: "Cleanliness",
    department: "Facilities",
    location: "Block C",
    status: "resolved" as const,
    priority: "medium" as const,
    date: "Dec 25, 2023",
  },
  {
    id: "CMP-2023-087",
    title: "Broken window in classroom 201",
    category: "Infrastructure",
    department: "Maintenance",
    location: "Academic Block, Room 201",
    status: "rejected" as const,
    priority: "low" as const,
    date: "Dec 20, 2023",
  },
];

const MyComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredComplaints = allComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || complaint.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn userName="John Doe" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              My Complaints
            </h1>
            <p className="mt-1 text-muted-foreground">
              View and track all your submitted complaints
            </p>
          </div>
          <Link to="/submit-complaint">
            <Button>
              <PlusCircle className="h-4 w-4" />
              New Complaint
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 animate-slide-up">
          <div className="card-elevated p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Priority Filter */}
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredComplaints.length} complaint
            {filteredComplaints.length !== 1 ? "s" : ""}
          </p>

          {filteredComplaints.length > 0 ? (
            <div className="space-y-3">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} {...complaint} />
              ))}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <p className="text-muted-foreground">No complaints found</p>
              <Link to="/submit-complaint">
                <Button variant="outline" className="mt-4">
                  Submit your first complaint
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyComplaints;
