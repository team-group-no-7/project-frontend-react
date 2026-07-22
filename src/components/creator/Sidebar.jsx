import React from 'react'
import SidebarItem from './SidebarItem'
import { BookOpen, Home, PenTool, FolderOpen, BarChart2, IndianRupee, Video, Users, User, Settings } from 'lucide-react';

const items = [
    ['/', Home, 'Creator Dashboard'],
    ['/content-studio', PenTool, 'Content Studio'],
    ['/my-resources', FolderOpen, 'My Resources'],
    ['/analytics', BarChart2, 'Analytics'],
    ['/earnings', IndianRupee, 'Earnings'],
    ['/live-sessions', Video, 'Live Sessions'],
    ['/community', Users, 'Community'],
    ['/profile', User, 'Profile'],
    ['/settings', Settings, 'Settings'],
]

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-100 min-h-screen px-4 py-6 sticky top-0">
            <div className="mb-8 flex items-center gap-3 px-2">
                <BookOpen size={26} color="#2563eb" />
                <div>
                    <div className="text-2xl font-semibold">LearnHub</div>
                    {/* <div className="text-xs text-slate-400">Creator</div> */}
                </div>
            </div>

            <nav className="flex flex-col gap-1">
                {items.map(([to, icon, label]) => (
                    <SidebarItem key={to} to={to} icon={icon}>
                        {label}
                    </SidebarItem>
                ))}
            </nav>

            {/* Upgrade card removed per request */}
        </aside>
    )
}
