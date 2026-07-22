import React from 'react'

export default function TopResources({ items }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Top Performing Resources</h3>
                <a className="text-sm text-blue-600">View all</a>
            </div>
            <ul className="space-y-3">
                {items.map((it) => (
                    <li key={it.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded flex items-center justify-center text-blue-600">PDF</div>
                            <div>
                                <div className="text-sm font-medium">{it.title}</div>
                                <div className="text-xs text-slate-400">{it.type}</div>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500">Views <span className="font-semibold text-blue-600">{it.views}</span></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
