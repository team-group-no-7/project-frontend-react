import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingBag, LayoutGrid, User, ShieldAlert, PenTool } from 'lucide-react';

const items = [
    { path: '/learner/dashboard', icon: LayoutGrid, label: 'Dashboard', pageKey: 'learner-dashboard' },
    { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace', pageKey: 'marketplace' },
    { path: '/creator/dashboard', icon: LayoutGrid, label: 'Creator Dashboard', pageKey: 'dashboard' },
    { path: '/creator/studio', icon: PenTool, label: 'Content Studio', pageKey: 'content-studio' },
    { path: '/creator/manage', icon: LayoutGrid, label: 'Management Grid', pageKey: 'manage' },
    { path: '/profile', icon: User, label: 'My Account', pageKey: 'profile' },
    { path: '/admin', icon: ShieldAlert, label: 'Admin Panel', pageKey: 'admin' },
];

/**
 * Sidebar Component
 * Renders left navigation menu using React Router DOM NavLink for active URL matching.
 */
export default function Sidebar({ role = 'LEARNER' }) {
    const location = useLocation();

    const filteredItems = items.filter((item) => {
        if (role === 'ADMIN') {
            return item.pageKey === 'admin' || item.pageKey === 'profile';
        } else if (role === 'CREATOR') {
            return item.pageKey === 'dashboard' || item.pageKey === 'content-studio' || item.pageKey === 'manage' || item.pageKey === 'profile';
        } else {
            // LEARNER
            return item.pageKey === 'learner-dashboard' || item.pageKey === 'marketplace' || item.pageKey === 'profile';
        }
    });

    return (
        <aside className="w-64 bg-white border-r border-slate-100 min-h-screen px-4 py-6 sticky top-0 flex flex-col justify-between shrink-0">
            <div>
                <NavLink to={role === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard'} className="mb-8 flex items-center gap-3 px-2">
                    <BookOpen size={26} color="#2563eb" />
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-800">LearnHub</div>
                    </div>
                </NavLink>

                <nav className="flex flex-col gap-1">
                    {filteredItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-600 font-bold shadow-xs'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            <div className="px-2">
                <div className="text-xs text-slate-400">© 2026 LearnHub Inc.</div>
            </div>
        </aside>
    );
}
