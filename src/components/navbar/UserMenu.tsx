
import { Settings, LogOut, ChevronDown } from "lucide-react";
import type { Profile } from "@/types/database";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  profile: Profile;
  onSignOut: () => void;
  onUpdateTier: (newTier: 'free' | 'premium') => void;
}

export const UserMenu = ({ profile, onSignOut, onUpdateTier }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <span className="text-gray-700">{profile.first_name || 'User'}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => onUpdateTier(profile.tier === 'free' ? 'premium' : 'free')}>
          <Settings className="mr-2 h-5 w-5" />
          <span>Switch to {profile.tier === 'free' ? 'Premium' : 'Free'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
