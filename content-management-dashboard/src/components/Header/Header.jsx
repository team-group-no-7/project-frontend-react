import {
  FaBell,
  FaChevronDown,
} from "react-icons/fa";
function Header() {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome Back, Riya 👋
        </h1>
        <p className="mt-2 text-slate-500">
          Manage all your resources efficiently.
        </p>
      </div>
      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          className="
            relative
            rounded-full
            bg-slate-100
            p-3
            transition
            hover:bg-slate-200
          "
        >
          <FaBell className="text-lg text-slate-700" />
          {/* Notification Dot */}
          <span
            className="
              absolute
              right-2
              top-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
          ></span>
        </button>
        {/* User */}
        <div
          className="
            flex
            cursor-pointer
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            transition
            hover:bg-slate-50
          "
        >
          <img
            src="https://ui-avatars.com/api/?name=Riya+Raj&background=2563eb&color=fff"
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-slate-800">
              Riya Raj
            </h3>
            <p className="text-sm text-slate-500">
              Creator
            </p>
          </div>
          <FaChevronDown className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
export default Header;