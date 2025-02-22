
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPremium } from "./ui/button-premium";
import { Menu, X, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/use-profile";
import { UserMenu } from "./navbar/UserMenu";
import { MobileMenu } from "./navbar/MobileMenu";

const Navbar = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, updateTier } = useProfile(isAuthenticated);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold text-blue-600">
              BluePrints
            </Link>
            {isAuthenticated && profile && (
              <UserMenu
                profile={profile}
                onSignOut={handleSignOut}
                onUpdateTier={updateTier}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Dashboard
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <ButtonPremium size="default" onClick={() => navigate('/login')}>
                  Get Started
                </ButtonPremium>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        onNavigate={navigate}
      />
    </nav>
  );
};

export default Navbar;
