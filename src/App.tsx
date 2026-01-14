import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLoader } from "@/components/ui/loading-spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminReports from "./pages/admin/AdminReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
};

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <UserDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/submit-complaint"
                element={
                  <RequireAuth>
                    <SubmitComplaint />
                  </RequireAuth>
                }
              />
              <Route
                path="/my-complaints"
                element={
                  <RequireAuth>
                    <MyComplaints />
                  </RequireAuth>
                }
              />
              <Route
                path="/complaint/:id"
                element={
                  <RequireAuth>
                    <ComplaintDetails />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/complaints"
                element={
                  <RequireAdmin>
                    <AdminComplaints />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/complaints/:id"
                element={
                  <RequireAdmin>
                    <ComplaintDetails />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <RequireAdmin>
                    <AdminReports />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <RequireAdmin>
                    <Profile />
                  </RequireAdmin>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
