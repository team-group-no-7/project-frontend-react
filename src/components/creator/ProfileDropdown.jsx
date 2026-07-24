import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { INITIAL_USER } from '@/data/mockData'

export default function ProfileDropdown({ profile = INITIAL_USER, onLogout, onSwitchMode }) {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        function onDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('click', onDoc)
        return () => document.removeEventListener('click', onDoc)
    }, [])

    const initials = profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setOpen((s) => !s)} className="flex items-center gap-4 px-3 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer transition-colors">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">{initials}</div>
                <div className="text-left leading-4 hidden sm:block">
                    <div className="text-sm font-semibold text-slate-800">{profile.name}</div>
                    <div className="text-xs text-slate-400 capitalize">{profile.role?.toLowerCase() || 'User'}</div>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-lg shadow-lg py-2 z-20 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button 
                        onClick={() => { setOpen(false); onSwitchMode && onSwitchMode(); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
                    >
                        Switch Role Mode
                    </button>
                    <div className="border-t border-slate-100 my-1.5" />
                    <button 
                        onClick={() => { setOpen(false); onLogout && onLogout(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
