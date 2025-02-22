
import { LogOut, Settings } from "lucide-react";
import type { Profile } from "@/types/database";
import { useNavigate } from "react-router-dom";
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
  const userInitials = profile?.first_name && profile?.last_name ? 
    `${profile.first_name} ${profile.last_name.charAt(0)}.` : '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600">
        {userInitials}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <Settings className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onUpdateTier(profile.tier === 'Free' ? 'Premium' : 'Free')}>
          Current Tier: {profile.tier}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
