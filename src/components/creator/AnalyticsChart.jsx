import React, { useState, useMemo } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { analytics7, analytics30, analytics90, analytics365, generateRangeData } from '../../data/creator/dashboardData'

const RANGE_OPTIONS = [
    { key: '7', label: 'Last 7 Days' },
    { key: '30', label: 'Last 30 Days' },
    { key: '90', label: 'Last 3 Months' },
    { key: '365', label: 'Last 1 Year' },
    { key: 'custom', label: 'Custom Range' },
]

export default function AnalyticsChart() {
    const [range, setRange] = useState('7')
    const [customStart, setCustomStart] = useState('2025-05-15')
    const [customEnd, setCustomEnd] = useState('2025-05-21')

    const data = useMemo(() => {
        if (range === '7') return analytics7
        if (range === '30') return analytics30
        if (range === '90') return analytics90
        if (range === '365') return analytics365
        // custom default
        return generateRangeData(customStart, customEnd)
    }, [range, customStart, customEnd])

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Views Overview</h3>
                <div className="flex items-center gap-2">
                    <select value={range} onChange={(e) => setRange(e.target.value)} className="text-sm border rounded px-2 py-1">
                        {RANGE_OPTIONS.map((o) => (
                            <option key={o.key} value={o.key}>{o.label}</option>
                        ))}
                    </select>
                    {range === 'custom' && (
                        <div className="flex items-center gap-2">
                            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="text-sm border rounded px-2 py-1" />
                            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="text-sm border rounded px-2 py-1" />
                            <button onClick={() => { /* trigger memo recompute via state change */ setCustomEnd((s) => s) }} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Apply</button>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#7c3aed" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
