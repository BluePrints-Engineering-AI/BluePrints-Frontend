
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import type { Profile } from "@/types/database";

interface UserMenuProps {
  profile: Profile;
  onSignOut: () => void;
  onUpdateTier: (newTier: 'free' | 'premium') => void;
}

export const UserMenu = ({ profile, onSignOut, onUpdateTier }: UserMenuProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <span className="text-gray-700">{profile.first_name || 'User'}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center px-2 py-2 text-sm text-gray-900`}
                  onClick={() => onUpdateTier(profile.tier === 'free' ? 'premium' : 'free')}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Switch to {profile.tier === 'free' ? 'Premium' : 'Free'}
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center px-2 py-2 text-sm text-gray-900`}
                  onClick={onSignOut}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
