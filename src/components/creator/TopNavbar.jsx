import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default function TopNavbar({ title = 'Creator Dashboard' }) {
    return (
        <header className="flex items-center justify-between px-6 py-5 bg-transparent border-b border-gray-100">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h1>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </button>

                <button className="relative p-2 rounded-md text-gray-500 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
                </button>

                <ProfileDropdown />
            </div>
        </header>
    )
}
