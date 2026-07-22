import React from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

export default function DashboardLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="flex">
                <Sidebar />

                <div className="flex-1 min-h-screen">
                    <TopNavbar title={title} />
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </div>
    )
}
