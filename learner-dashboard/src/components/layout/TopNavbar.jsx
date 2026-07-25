import { useState } from "react";
import {
  Bell,
  Compass,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

const learner = {
  name: "Anuj Kumar",
  role: "Learner",
  avatar: "https://i.pravatar.cc/100",
};

function TopNavbar({ openSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white px-4 shadow-sm md:px-8">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={openSidebar}
          className="rounded-xl border p-2 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search courses, PDFs..."
            className="w-72 rounded-xl border py-2 pl-10 pr-4 outline-none transition focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Explore Button */}
        <button className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700 md:flex">
          <Compass size={18} />
          Explore
        </button>

        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border p-2 transition hover:bg-slate-100"
          >
            <Bell size={20} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          {showNotifications && <NotificationDropdown />}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
          >
            <img
              src={learner.avatar}
              alt={learner.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="hidden text-left md:block">
              <p className="font-semibold">
                {learner.name}
              </p>

              <p className="text-sm text-gray-500">
                {learner.role}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`hidden transition md:block ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showProfileMenu && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;