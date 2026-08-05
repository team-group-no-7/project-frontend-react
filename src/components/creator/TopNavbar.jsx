import React from 'react'
import ProfileDropdown from './ProfileDropdown'
export default function TopNavbar({ title = 'Creator Dashboard', profile, onSwitchRole, onLogout }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
            <div className="text-lg font-bold tracking-tight text-slate-800">{title}</div>
            <div className="flex items-center gap-4">
                <ProfileDropdown profile={profile} onSwitchMode={onSwitchRole} onLogout={onLogout} />
            </div>
        </header>
    )
}
