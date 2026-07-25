import {
  LayoutDashboard,
  Library,
  ShoppingBag,
  CalendarDays,
  User,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "My Library",
    icon: Library,
    path: "/library",
  },
  {
    name: "Purchase History",
    icon: ShoppingBag,
    path: "/purchase-history",
  },
  {
    name: "My Sessions",
    icon: CalendarDays,
    path: "/sessions",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-white">

      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-3xl font-bold text-indigo-600">
          LearnMint
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `mb-2 flex w-full items-center gap-3 rounded-xl p-3 transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              <Icon size={20} />

              <span>{menu.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Help Card */}
      <div className="p-4">

        <div className="rounded-2xl bg-indigo-600 p-5 text-white">

          <h2 className="font-semibold">
            Need Help?
          </h2>

          <p className="mt-2 text-sm opacity-80">
            Book a 1:1 session with your favourite creator.
          </p>

          <button className="mt-5 w-full rounded-lg bg-white py-2 font-medium text-indigo-600 transition hover:bg-gray-100">
            Book Session
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;