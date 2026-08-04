import React from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
const DEFAULT_USER = { name: "User", role: "CREATOR", email: "user@learnhub.com" };

export default function DashboardLayout({ children, title, profile, onSwitchRole, onLogout }) {
    const activeProfile = profile || (() => {
        try { return JSON.parse(localStorage.getItem("learnhub_user")) || DEFAULT_USER; }
        catch (e) { return DEFAULT_USER; }
    })();
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex">
            <Sidebar role={activeProfile.role} />

            <div className="flex-1 min-h-screen flex flex-col overflow-x-hidden">
                <TopNavbar title={title} profile={activeProfile} onSwitchRole={onSwitchRole} onLogout={onLogout} />
                <main className="p-6 flex-1 bg-slate-50 dark:bg-slate-950">{children}</main>
            </div>
        </div>
    )
}
