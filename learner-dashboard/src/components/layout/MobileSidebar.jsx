import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Library,
  ShoppingBag,
  CalendarDays,
  User,
  Settings,
} from "lucide-react";

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

function MobileSidebar({
  isOpen,
  closeSidebar,
}) {
  return (
    <>
      {/* Background Overlay */}

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-full
          w-72
          bg-white
          shadow-xl
          transition-transform
          duration-300
          lg:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h1 className="text-2xl font-bold text-indigo-600">
            LearnMint
          </h1>

          <button onClick={closeSidebar}>
            <X size={24} />
          </button>

        </div>

        {/* Menu */}

        <nav className="p-4">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-3 rounded-xl p-3 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-50"
                  }`
                }
              >
                <Icon size={20} />

                {menu.name}
              </NavLink>
            );
          })}

        </nav>

      </aside>
    </>
  );
}

export default MobileSidebar;