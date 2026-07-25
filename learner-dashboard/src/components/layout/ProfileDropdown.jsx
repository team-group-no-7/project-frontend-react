import {
  User,
  Library,
  Settings,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

function ProfileDropdown() {
  return (
    <div className="absolute right-0 top-14 w-64 rounded-2xl border bg-white shadow-xl">

      <div className="border-b p-4">

        <h2 className="font-semibold">
          Account
        </h2>

        <p className="text-sm text-gray-500">
          Manage your profile
        </p>

      </div>

      <nav className="p-2">

        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
        >
          <User size={18} />
          My Profile
        </Link>

        <Link
          to="/library"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
        >
          <Library size={18} />
          My Library
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
        >
          <Settings size={18} />
          Settings
        </Link>

        <hr className="my-2" />

        <button className="flex w-full items-center gap-3 rounded-xl p-3 text-red-600 hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>

      </nav>

    </div>
  );
}

export default ProfileDropdown;