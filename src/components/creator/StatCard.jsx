import React from 'react'

export default function StatCard({ item }) {
    const Icon = item.icon
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bg || 'bg-blue-50'}`}>
                <Icon className={`${item.color || 'text-blue-600'} text-xl`} size={20} />
            </div>
            <div className="flex-1">
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="text-xl font-semibold mt-1">{item.value}</div>
                <div className="text-xs text-green-600 mt-1">{item.delta}</div>
            </div>
        </div>
    )
}
