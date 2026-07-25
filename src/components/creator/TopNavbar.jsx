import React from 'react'
import { Bell, HelpCircle } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown'
import { INITIAL_USER } from '@/data/mockData'

export default function TopNavbar({ title = 'Creator Dashboard', profile = INITIAL_USER, onSwitchRole, onLogout }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
            <div className="text-lg font-bold tracking-tight text-slate-800">{title}</div>
            <div className="flex items-center gap-6">
                <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors">
                    <HelpCircle size={20} className="text-slate-500" />
                </button>
                <div className="relative">
                    <button className="p-2 mr-2 rounded-md text-blue-600 hover:bg-slate-100 relative cursor-pointer transition-colors">
                        <Bell size={26} color="#2563eb" />
                        <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1.5 py-0.5 scale-90 font-bold leading-none">3</span>
                    </button>
                </div>
                <ProfileDropdown profile={profile} onSwitchMode={onSwitchRole} onLogout={onLogout} />
            </div>
        </header>
    )
}
