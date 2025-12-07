import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="font-sora font-bold text-xl gradient-text">
              FraudShield AI
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              About
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/certificates");
                      }}
                    >
                      My Certificates
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
                <Button
                  variant="hero"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("demo")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                About
              </button>
              {isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => {
                      navigate("/certificates");
                      setIsOpen(false);
                    }}
                  >
                    My Certificates
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      logout();
                      navigate("/");
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/signin");
                      setIsOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => {
                      navigate("/signup");
                      setIsOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
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
