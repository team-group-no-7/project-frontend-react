import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomeBanner() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">Welcome back, Yashwant! <span className="text-2xl">👋</span></h2>
                <p className="text-sm text-slate-500 mt-1">Here's what's happening with your content today.</p>
            </div>
            <div>
                <Link to="/content-studio" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow inline-block">+ Create New Resource</Link>
            </div>
        </div>
    )
}
