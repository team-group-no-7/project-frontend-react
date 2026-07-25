import { useState } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import RightSidebar from "./RightSidebar";
import MobileSidebar from "./MobileSidebar";

function DashboardLayout({ children }) {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-indigo-50">

      <MobileSidebar
        isOpen={isSidebarOpen}
        closeSidebar={() =>
          setIsSidebarOpen(false)
        }
      />

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <TopNavbar
            openSidebar={() =>
              setIsSidebarOpen(true)
            }
          />

          <main className="mx-auto w-full max-w-7xl p-6">

            {children}

          </main>

        </div>

        <RightSidebar />

      </div>

    </div>
  );
}

export default DashboardLayout;