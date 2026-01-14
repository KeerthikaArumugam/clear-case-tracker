import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Bell, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { useAuth } from "@/components/auth/AuthProvider";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Navbar = ({ 
  isLoggedIn = false, 
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = ""
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  const effectiveUser = authUser
    ? { name: authUser.name, email: authUser.email, role: authUser.role }
    : isLoggedIn
      ? { name: userName, email: userEmail, role: "user" as const }
      : null;

  const effectiveIsLoggedIn = Boolean(effectiveUser);

  const navLinks = effectiveIsLoggedIn
    ? effectiveUser?.role === "admin"
      ? [
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/complaints", label: "Complaints" },
          { href: "/admin/reports", label: "Reports" },
        ]
      : [
          { href: "/dashboard", label: "Home" },
          { href: "/my-complaints", label: "My Complaints" },
          { href: "/submit-complaint", label: "New Complaint" },
        ]
    : [{ href: "/", label: "Home" }, { href: "/login", label: "Login" }, { href: "/signup", label: "Sign Up" }];

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to={effectiveIsLoggedIn ? (effectiveUser?.role === "admin" ? "/admin" : "/dashboard") : "/"}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span className="hidden font-semibold text-foreground sm:inline-block">
              SmartTrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            {effectiveIsLoggedIn && (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    3
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {getInitials(effectiveUser?.name ?? userName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-2">
                      <p className="text-sm font-medium text-foreground">{effectiveUser?.name ?? userName}</p>
                      <p className="text-xs text-muted-foreground">{effectiveUser?.email ?? userEmail}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        to={effectiveUser?.role === "admin" ? "/admin/profile" : "/profile"}
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {effectiveUser?.role !== "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/my-complaints" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          My Complaints
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {effectiveUser?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/complaints" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Manage Complaints
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={(e) => {
                        e.preventDefault();
                        handleSignOut();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden animate-fade-in">
            {effectiveIsLoggedIn && (
              <div className="flex items-center gap-3 px-4 pb-4 mb-4 border-b border-border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(effectiveUser?.name ?? userName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{effectiveUser?.name ?? userName}</p>
                  <p className="text-xs text-muted-foreground">{effectiveUser?.email ?? userEmail}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {effectiveIsLoggedIn && (
                <>
                  <Link
                    to={effectiveUser?.role === "admin" ? "/admin/profile" : "/profile"}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    Profile Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-4 py-3 text-left text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
