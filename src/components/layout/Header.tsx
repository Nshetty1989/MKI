import { Crown, LogOut, HelpCircle, Castle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "See you soon!",
    });
    navigate("/");
  };

  const handleMyEmpireClick = () => {
    navigate("/properties");
  };

  const scrollToFAQ = () => {
    const faqSection = document.querySelector('#faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-kingdom-dark/80 backdrop-blur-lg border-b border-kingdom-primary/20">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Crown className="h-8 w-8 text-kingdom-accent animate-glow" />
            <span className="text-2xl font-bold gradient-text">MyKingdom</span>
          </button>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={handleMyEmpireClick}
                  variant="outline"
                  className="relative group overflow-hidden border-kingdom-primary/50 text-kingdom-text hover:text-white hover:border-kingdom-primary/80"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 bg-gradient-primary" />
                  <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                    <Castle className="w-4 h-4" />
                    My Empire
                  </span>
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="relative group overflow-hidden border-kingdom-primary/50 text-kingdom-text hover:text-white hover:border-kingdom-primary/80"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 bg-gradient-primary" />
                  <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </span>
                </Button>
              </>
            ) : !isLoginPage && (
              <>
                <Button
                  onClick={scrollToFAQ}
                  variant="outline"
                  className="relative group overflow-hidden border-kingdom-primary/50 text-kingdom-text hover:text-white hover:border-kingdom-primary/80"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 bg-gradient-primary" />
                  <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                    <HelpCircle className="w-4 h-4" />
                    FAQ
                  </span>
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                    Getting Started
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};