import {
  FaHome,
  FaFolderOpen,
  FaChartBar,
  FaTags,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: <FaHome />,
    active: true,
  },
  {
    id: 2,
    title: "Resources",
    icon: <FaFolderOpen />,
  },
  {
    id: 3,
    title: "Analytics",
    icon: <FaChartBar />,
  },
  {
    id: 4,
    title: "Categories",
    icon: <FaTags />,
  },
  {
    id: 5,
    title: "Favorites",
    icon: <FaStar />,
  },
  {
    id: 6,
    title: "Settings",
    icon: <FaCog />,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 p-6">

        <h1 className="text-2xl font-bold text-blue-600">
          ResourceHub
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Creator Dashboard
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {menuItems.map((item) => (

            <li key={item.id}>

              <button
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200

                ${
                  item.active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >

                <span className="text-lg">{item.icon}</span>

                <span className="font-medium">
                  {item.title}
                </span>

              </button>

            </li>

          ))}

        </ul>

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200 p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;