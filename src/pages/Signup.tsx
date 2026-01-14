import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import { ButtonLoader } from "@/components/ui/loading-spinner";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signup, user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const result = await signup(formData);
    setIsSubmitting(false);

    if (!result.ok) {
      toast({ title: "Sign up failed", description: result.error, variant: "destructive" });
      return;
    }

    toast({ title: "Account created", description: "Welcome to SmartTrack." });
    navigate("/dashboard", { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const features = [
    "Track all your complaints in one place",
    "Real-time status updates",
    "Direct communication with departments",
    "Priority-based resolution",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={Boolean(user)} userName={user?.name} userEmail={user?.email} />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Side - Info */}
            <div className="hidden lg:flex flex-col justify-center animate-fade-in">
              <h1 className="text-4xl font-bold text-foreground">
                Join <span className="gradient-text">SmartTrack</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                The easiest way to submit and track your complaints. Get real-time
                updates and faster resolutions.
              </p>

              <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-3.5 w-3.5 text-success" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Form */}
            <div className="animate-slide-up">
              <div className="text-center mb-6 lg:text-left lg:hidden">
                <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
                <p className="mt-2 text-muted-foreground">
                  Start tracking your complaints today
                </p>
              </div>

              <div className="card-elevated p-6 sm:p-8">
                <h2 className="hidden lg:block text-xl font-semibold text-foreground mb-6">
                  Create your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
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
                    Create Account
                    {isSubmitting ? <ButtonLoader /> : <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
