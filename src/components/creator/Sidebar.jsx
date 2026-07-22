import React from 'react';
import SidebarItem from './SidebarItem';
import { faTachometerAlt, faPenNib, faFolderOpen, faChartBar, faWallet, faVideo, faUsers, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    const items = [
        { to: '/', label: 'Creator Dashboard', icon: faTachometerAlt },
        { to: '/content-studio', label: 'Content Studio', icon: faPenNib },
        { to: '/my-resources', label: 'My Resources', icon: faFolderOpen },
        { to: '/analytics', label: 'Analytics', icon: faChartBar },
        { to: '/earnings', label: 'Earnings', icon: faWallet },
        { to: '/live-sessions', label: 'Live Sessions', icon: faVideo },
        { to: '/community', label: 'Community', icon: faUsers },
        { to: '/profile', label: 'Profile', icon: faUser },
        { to: '/settings', label: 'Settings', icon: faCog },
    ];

    return (
        <aside className="w-72 bg-purple-50 min-h-screen p-5 flex flex-col">
            <div className="mb-6 px-2 flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-400 rounded-md shadow-sm flex items-center justify-center text-white font-bold">LM</div>
                <div className="text-purple-700 font-semibold text-lg">LearnMint</div>
            </div>

            <nav className="flex flex-col gap-2">
                {items.map((it) => (
                    <SidebarItem key={it.to} to={it.to} icon={it.icon} label={it.label} />
                ))}
            </nav>

            <div className="mt-auto p-2">
                <div className="bg-gradient-to-b from-purple-50 to-white border border-purple-100 rounded-xl p-4 text-sm shadow-sm">
                    <div className="font-medium text-purple-700">Upgrade to Pro</div>
                    <p className="text-xs text-gray-500 mt-2">Unlock advanced analytics, custom branding, and more.</p>
                    <button className="mt-3 w-full bg-purple-600 text-white text-sm py-2 rounded-md">Upgrade Now →</button>
                </div>
            </div>
        </aside>
    )
}
