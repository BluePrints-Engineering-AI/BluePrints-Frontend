
import { LogOut, Settings } from "lucide-react";
import type { Profile } from "@/types/database";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  profile: Profile;
  onSignOut: () => void;
  onUpdateTier: (newTier: 'Free' | 'Premium') => void;
}

export const UserMenu = ({ profile, onSignOut, onUpdateTier }: UserMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/';
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };
  const userInitials = profile?.first_name && profile?.last_name ? 
    `${profile.first_name} ${profile.last_name.charAt(0)}.` : '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
        {userInitials}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="cursor-pointer hover:bg-gray-100"
        >
          <Settings className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onUpdateTier(profile.tier === 'Free' ? 'Premium' : 'Free')}
          className="cursor-pointer hover:bg-gray-100"
        >
          Current Tier: {profile.tier}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
