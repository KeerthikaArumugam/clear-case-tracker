import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Clock, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

const features = [
  {
    icon: MessageSquare,
    title: "Easy Submission",
    description: "Submit complaints in minutes with our intuitive form",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Track your complaint status from submission to resolution",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your information is protected with enterprise-grade security",
  },
  {
    icon: CheckCircle,
    title: "Fast Resolution",
    description: "Dedicated teams ensure quick response and resolution",
  },
];

const stats = [
  { value: "10K+", label: "Complaints Resolved" },
  { value: "2.5 days", label: "Avg Resolution Time" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative mx-auto px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Smart Complaint & Issue{" "}
              <span className="gradient-text">Tracking System</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Submit, track, and resolve complaints efficiently. Our modern
              platform connects you directly with the right departments for
              faster resolutions.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/signup">
                <Button size="xl" variant="gradient">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="xl" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-3xl font-bold gradient-text sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose SmartTrack?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We make complaint management simple, transparent, and effective
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-6 text-center group hover:border-primary/20 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of users who trust SmartTrack for their complaint
              management needs
            </p>
            <div className="mt-8">
              <Link to="/signup">
                <Button size="xl" variant="gradient">
                  Create Free Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                <span className="text-sm font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-semibold text-foreground">SmartTrack</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SmartTrack. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
