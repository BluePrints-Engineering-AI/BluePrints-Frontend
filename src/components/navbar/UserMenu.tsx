import { Settings, LogOut, ChevronDown, User, Moon, Sun } from "lucide-react";
import type { Profile } from "@/types/database";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  profile: Profile;
  onSignOut: () => void;
  onUpdateTier: (newTier: 'free' | 'premium') => void;
}

export const UserMenu = ({ profile, onSignOut, onUpdateTier }: UserMenuProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <span className="text-gray-700">{profile.first_name || 'User'}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-5 w-5" />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onUpdateTier(profile.tier === 'free' ? 'premium' : 'free')}>
          <Settings className="mr-2 h-5 w-5" />
          <span>Switch to {profile.tier === 'free' ? 'Premium' : 'Free'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
          setTheme(nextTheme);
        }}>
          {theme === 'light' ? (
            <Moon className="mr-2 h-5 w-5" />
          ) : theme === 'dark' ? (
            <Sun className="mr-2 h-5 w-5" />
          ) : (
            <Settings className="mr-2 h-5 w-5" />
          )}
          <span>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
