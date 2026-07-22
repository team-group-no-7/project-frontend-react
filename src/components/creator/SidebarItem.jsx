import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SidebarItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm group ${isActive
                    ? 'bg-gradient-to-r from-purple-50 to-white text-purple-700 shadow-sm border border-purple-100'
                    : 'text-gray-600 hover:bg-white/60 hover:translate-x-0.5'
                }`
            }
        >
            <div className="w-6 text-lg text-center text-gray-500 group-hover:text-gray-700">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="flex-1 font-medium">{label}</div>
        </NavLink>
    )
}
