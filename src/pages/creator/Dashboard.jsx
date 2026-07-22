import React from 'react'
import { stats, topResources, recentResources } from '../../data/creator/dashboardData'
import { chartData } from '../../data/creator/chartData'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

function StatCard({ item, color = 'purple' }) {
    const colorMap = {
        purple: 'from-purple-100 to-purple-50 text-purple-700',
        blue: 'from-blue-100 to-blue-50 text-blue-600',
        green: 'from-emerald-100 to-emerald-50 text-emerald-600',
        orange: 'from-amber-100 to-amber-50 text-amber-600',
    }

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${colorMap[color]}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 16v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 8h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">{item.title}</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-800">{item.value}</div>
                    </div>
                </div>

                <div className="text-sm text-green-500 mt-1 font-medium">{item.change}</div>
            </div>
        </div>
    )
}

function TopResource({ r }) {
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-600">{r.type === 'PDF' ? 'PDF' : 'ART'}</div>
                <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-gray-400">{r.type} Resource</div>
                </div>
            </div>
            <div className="text-sm text-purple-600 font-medium">{r.views}</div>
        </div>
    )
}

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <section className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Welcome back, Anuj! 👋</h2>
                        <p className="text-sm text-gray-500 mt-1">Here's what's happening with your content today.</p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">+ Create New Resource</button>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((s, idx) => (
                    <StatCard
                        key={s.id}
                        item={s}
                        color={idx === 0 ? 'purple' : idx === 1 ? 'blue' : idx === 2 ? 'green' : 'orange'}
                    />
                ))}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-700">Views Overview</h3>
                        <select className="text-sm text-gray-500 border border-gray-100 rounded-md px-2 py-1">
                            <option>Last 7 Days</option>
                        </select>
                    </div>

                    <div className="mt-4 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.18} />
                                        <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="views" stroke="#7c3aed" fill="url(#colorViews)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-700">Top Performing Resources</h3>
                        <a className="text-sm text-indigo-600">View all</a>
                    </div>
                    <div className="mt-3">
                        {topResources.map((r) => (
                            <TopResource key={r.id} r={r} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-700">Recent Resources</h3>
                        <a className="text-sm text-indigo-600">View all</a>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-400">
                                <th className="py-3">Resource</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {recentResources.map((r) => (
                                <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                                    <td className="py-4">{r.title}</td>
                                    <td className="py-4">
                                        {r.status === 'Published' ? (
                                            <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">{r.status}</span>
                                        ) : (
                                            <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-600">{r.status}</span>
                                        )}
                                    </td>
                                    <td className="py-4 text-sm text-gray-600">{r.updated}</td>
                                    <td className="py-4 text-sm text-gray-600">{r.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <h3 className="font-medium mb-3 text-gray-700">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:shadow-md transition">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">📄</div>
                            <div className="text-left">
                                <div className="font-medium">Create PDF Resource</div>
                                <div className="text-xs text-gray-400">Upload and publish PDF</div>
                            </div>
                        </button>

                        <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:shadow-md transition">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">✍️</div>
                            <div className="text-left">
                                <div className="font-medium">Write Article</div>
                                <div className="text-xs text-gray-400">Create new article</div>
                            </div>
                        </button>

                        <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:shadow-md transition">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">📅</div>
                            <div className="text-left">
                                <div className="font-medium">Schedule Live Session</div>
                                <div className="text-xs text-gray-400">Connect with learners</div>
                            </div>
                        </button>

                        <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:shadow-md transition">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">📈</div>
                            <div className="text-left">
                                <div className="font-medium">View Analytics</div>
                                <div className="text-xs text-gray-400">Track your performance</div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
