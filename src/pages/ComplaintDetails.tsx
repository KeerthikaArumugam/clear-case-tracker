import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Building2, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import StatusBadge from "@/components/complaints/StatusBadge";
import PriorityBadge from "@/components/complaints/PriorityBadge";
import StatusTimeline from "@/components/complaints/StatusTimeline";

const complaintData = {
  id: "CMP-2024-001",
  title: "Water leakage in Block A bathroom",
  category: "Plumbing",
  department: "Maintenance",
  location: "Block A, Floor 2",
  status: "in-progress" as const,
  priority: "high" as const,
  date: "Jan 5, 2024",
  description:
    "There is a significant water leakage from the pipe under the sink in the men's bathroom on the 2nd floor of Block A. The leak has been ongoing for 2 days and is causing water to pool on the floor, creating a slip hazard. Please address this issue urgently.",
  submittedBy: "John Doe",
  assignedTo: "Mike Johnson",
  updates: [
    {
      date: "Jan 6, 2024, 10:30 AM",
      author: "Mike Johnson",
      message: "Issue has been reviewed. Plumber has been scheduled for today afternoon.",
    },
    {
      date: "Jan 5, 2024, 4:00 PM",
      author: "System",
      message: "Complaint assigned to Mike Johnson from Maintenance department.",
    },
    {
      date: "Jan 5, 2024, 2:15 PM",
      author: "System",
      message: "Complaint received and registered successfully.",
    },
  ],
};

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn userName="John Doe" />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  #{complaintData.id}
                </span>
                <StatusBadge status={complaintData.status} />
                <PriorityBadge priority={complaintData.priority} />
              </div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {complaintData.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 animate-slide-up">
            {/* Status Timeline */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Status Timeline
              </h2>
              <StatusTimeline currentStatus={complaintData.status} />
            </div>

            {/* Description */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {complaintData.description}
              </p>
            </div>

            {/* Updates */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Updates & Activity
              </h2>
              <div className="space-y-4">
                {complaintData.updates.map((update, index) => (
                  <div
                    key={index}
                    className="relative pl-6 pb-4 border-l-2 border-border last:border-transparent last:pb-0"
                  >
                    <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                    <p className="text-xs text-muted-foreground mb-1">
                      {update.date} • {update.author}
                    </p>
                    <p className="text-sm text-foreground">{update.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Add Comment
              </h2>
              <Textarea
                placeholder="Write your message..."
                rows={3}
                className="mb-4"
              />
              <Button>
                <MessageSquare className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Details Card */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Complaint Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Submitted On</p>
                    <p className="text-sm font-medium">{complaintData.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{complaintData.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{complaintData.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="text-sm font-medium">{complaintData.assignedTo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Category
              </h2>
              <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                {complaintData.category}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintDetails;
