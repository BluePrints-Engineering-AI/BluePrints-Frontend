
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { ButtonPremium } from "@/components/ui/button-premium";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated?: boolean;
  onNavigate: (path: string) => void;
}

export const MobileMenu = ({ isOpen, isAuthenticated, onNavigate }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          to="/pricing"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        >
          Pricing
        </Link>
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Dashboard
          </Link>
        ) : (
          <div className="px-3 py-2">
            <ButtonPremium size="default" className="w-full" onClick={() => onNavigate('/login')}>
              Get Started
            </ButtonPremium>
          </div>
        )}
      </div>
    </div>
  );
};
