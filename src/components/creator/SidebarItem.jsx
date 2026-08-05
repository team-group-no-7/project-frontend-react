import React from 'react'

export default function SidebarItem({ active, onClick, icon: Icon, children }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-semibold cursor-pointer ${
                active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            {Icon && <Icon size={18} className={active ? 'text-blue-700' : 'text-slate-500'} />}
            <span className="truncate">{children}</span>
        </button>
    )
}
