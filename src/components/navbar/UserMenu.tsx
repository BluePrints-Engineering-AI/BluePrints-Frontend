
import { LogOut, Settings } from "lucide-react";
import type { Profile } from "@/types/database";
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
  onUpdateTier: (newTier: 'free' | 'premium') => void;
}

export const UserMenu = ({ profile, onSignOut, onUpdateTier }: UserMenuProps) => {
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
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onUpdateTier(profile.tier === 'free' ? 'premium' : 'free')}>
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
