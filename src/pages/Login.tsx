import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import { ButtonLoader } from "@/components/ui/loading-spinner";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      toast({ title: "Sign in failed", description: result.error, variant: "destructive" });
      return;
    }

    const from = (location.state as { from?: string } | null)?.from;
    const defaultTarget = result.user.role === "admin" ? "/admin" : "/dashboard";
    const target =
      from && (from.startsWith("/admin") ? result.user.role === "admin" : true) ? from : defaultTarget;

    navigate(target, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={Boolean(user)} userName={user?.name} userEmail={user?.email} />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to track your complaints
            </p>
          </div>

          <div className="card-elevated p-6 sm:p-8 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                Sign In
                {isSubmitting ? <ButtonLoader /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Create account
              </Link>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-muted/50 text-center text-xs text-muted-foreground">
              <p>
                <strong>Demo:</strong> admin@smarttrack.com / Admin123! or john@smarttrack.com / User123!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
