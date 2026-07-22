import React, { useState, useRef, useEffect } from 'react';

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        function onDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setOpen((s) => !s)} className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-gray-50">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white font-semibold">A</div>
                <div className="text-sm text-gray-700 leading-4">
                    <div className="font-medium">Anuj Bhaiya</div>
                    <div className="text-xs text-gray-400">Creator</div>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 text-sm border border-gray-100">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50">Switch to Learner</button>
                    <div className="border-t my-1" />
                    <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50">Logout</button>
                </div>
            )}
        </div>
    )
}
