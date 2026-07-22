import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        function onDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('click', onDoc)
        return () => document.removeEventListener('click', onDoc)
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setOpen((s) => !s)} className="flex items-center gap-4 px-3 py-1 rounded-md hover:bg-slate-100">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">YP</div>
                <div className="text-left leading-4">
                    <div className="text-sm font-medium">Yashwant Pandey</div>
                    <div className="text-xs text-slate-400">Creator</div>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-20">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Switch to Learner</button>
                    <div className="border-t my-1" />
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Logout</button>
                </div>
            )}
        </div>
    )
}
