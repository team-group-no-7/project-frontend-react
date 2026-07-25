import React from 'react'
import { Link } from 'react-router-dom'

export default function QuickActions({ items }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
                {items.map((it) => {
                    const Icon = it.icon
                    const content = (
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:shadow-sm bg-slate-50">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${it.color || 'bg-blue-50'}`}>
                                <Icon className={`${it.accent || 'text-blue-600'} text-xl`} size={18} />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-medium">{it.title}</div>
                                <div className="text-xs text-slate-400">{it.subtitle}</div>
                            </div>
                        </div>
                    )

                    return it.to ? (
                        <Link key={it.id} to={it.to}>
                            {content}
                        </Link>
                    ) : (
                        <button key={it.id} className="w-full text-left" onClick={it.onClick}>
                            {content}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
