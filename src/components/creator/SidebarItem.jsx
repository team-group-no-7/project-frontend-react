import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarItem({ to, icon: Icon, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`
            }
        >
            {Icon && <Icon size={18} className="text-slate-500" />}
            <span className="truncate">{children}</span>
        </NavLink>
    )
}
