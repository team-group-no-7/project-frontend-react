import React from 'react'
import SidebarItem from './SidebarItem'
import { BookOpen, ShoppingBag, Sparkles, LayoutGrid, User, ShieldAlert, PenTool } from 'lucide-react';

const items = [
    ['marketplace', ShoppingBag, 'Marketplace'],
    ['dashboard', LayoutGrid, 'Creator Dashboard'],
    ['content-studio', PenTool, 'Content Studio'],
    ['manage', LayoutGrid, 'Management Grid'],
    ['profile', User, 'My Account'],
    ['admin', ShieldAlert, 'Admin Panel'],
]

export default function Sidebar({ currentPage, onChangePage, role = 'LEARNER' }) {
    const filteredItems = items.filter(([pageKey]) => {
        if (role === 'ADMIN') {
            return pageKey === 'admin' || pageKey === 'profile';
        } else if (role === 'CREATOR') {
            return pageKey === 'dashboard' || pageKey === 'content-studio' || pageKey === 'manage' || pageKey === 'profile';
        } else {
            // LEARNER
            return pageKey === 'marketplace' || pageKey === 'profile';
        }
    });

    return (
        <aside className="w-64 bg-white border-r border-slate-100 min-h-screen px-4 py-6 sticky top-0 flex flex-col justify-between shrink-0">
            <div>
                <div className="mb-8 flex items-center gap-3 px-2">
                    <BookOpen size={26} color="#2563eb" />
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-800">LearnHub</div>
                    </div>
                </div>

                <nav className="flex flex-col gap-1">
                    {filteredItems.map(([pageKey, icon, label]) => (
                        <SidebarItem 
                            key={pageKey} 
                            active={currentPage === pageKey} 
                            onClick={() => onChangePage(pageKey)} 
                            icon={icon}
                        >
                            {label}
                        </SidebarItem>
                    ))}
                </nav>
            </div>
            
            <div className="px-2">
                <div className="text-xs text-slate-400">© 2026 LearnHub Inc.</div>
            </div>
        </aside>
    )
}
