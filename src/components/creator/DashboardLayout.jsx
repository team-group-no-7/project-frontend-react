import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 text-sm">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 md:p-8 lg:p-10">
                    <TopNavbar />
                    <main className="mt-6">{children}</main>
                </div>
            </div>
        </div>
    )
}
