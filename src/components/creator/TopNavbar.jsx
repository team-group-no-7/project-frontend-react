import React from 'react'
import { Bell, HelpCircle } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown'

export default function TopNavbar({ title = 'Creator Dashboard' }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
            <div className="text-lg font-semibold">{title}</div>
            <div className="flex items-center gap-6">
                <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100">
                    <HelpCircle size={20} className="text-slate-500" />
                </button>
                <div className="relative">
                    <button className="p-2 mr-2 rounded-md text-blue-600 hover:bg-slate-100 relative">
                        <Bell size={26} color="#2563eb" />
                        <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1">3</span>
                    </button>
                </div>
                <ProfileDropdown />
            </div>
        </header>
    )
}
