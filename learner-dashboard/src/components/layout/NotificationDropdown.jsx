import {
  Bell,
  FileText,
  CalendarDays,
  ShoppingCart,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: FileText,
    title: "New React PDF uploaded",
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: CalendarDays,
    title: "Session starts tomorrow",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "Purchase Successful",
    time: "Yesterday",
  },
];

function NotificationDropdown() {
  return (
    <div className="absolute right-0 top-14 w-80 rounded-2xl border bg-white shadow-xl">

      <div className="border-b p-4">

        <h2 className="flex items-center gap-2 text-lg font-semibold">

          <Bell size={18} />

          Notifications

        </h2>

      </div>

      <div>

        {notifications.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className="flex cursor-pointer gap-4 border-b p-4 hover:bg-slate-50"
            >

              <div className="rounded-full bg-indigo-100 p-2">

                <Icon
                  size={18}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <p className="font-medium">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  {item.time}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default NotificationDropdown;