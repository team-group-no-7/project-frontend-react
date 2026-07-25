import React from 'react'

function StatusBadge({ status }) {
    const cls = status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
    return <span className={`px-2 py-1 rounded-full text-xs ${cls}`}>{status}</span>
}

export default function RecentResourcesTable({ items }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Recent Resources</h3>
                <a className="text-sm text-blue-600">View all</a>
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-slate-400">
                        <th className="pb-3">Resource</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Updated</th>
                        <th className="pb-3">Views</th>
                    </tr>
                </thead>
                <tbody className="text-slate-700">
                    {items.map((r) => (
                        <tr key={r.id} className="border-t">
                            <td className="py-3">{r.title}</td>
                            <td className="py-3 text-slate-500">{r.type}</td>
                            <td className="py-3"><StatusBadge status={r.status} /></td>
                            <td className="py-3 text-slate-500">{r.updated}</td>
                            <td className="py-3 text-slate-500">{r.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
