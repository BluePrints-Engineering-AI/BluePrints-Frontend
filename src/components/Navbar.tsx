import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPremium } from "./ui/button-premium";
import { Menu, X, MessageSquare, LogOut, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Profile } from "@/types/database";

const Navbar = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, tier')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data as Profile);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    }
  };

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

  const updateTier = async (newTier: 'free' | 'premium') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ tier: newTier })
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchProfile();
      
      toast({
        title: "Success",
        description: `Your tier has been updated to ${newTier}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const userInitials = profile?.first_name && profile?.last_name ? 
    `${profile.first_name} ${profile.last_name.charAt(0)}.` : '';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold text-blue-600">
              BluePrints
            </Link>
            {isAuthenticated && profile && (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  {userInitials}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateTier(profile.tier === 'free' ? 'premium' : 'free')}>
                    Current Tier: {profile.tier}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Pricing
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Dashboard
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Link>
                <div className="px-3 py-2">
                  <ButtonPremium size="default" className="w-full" onClick={() => navigate('/login')}>
                    Get Started
                  </ButtonPremium>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
