import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function StatusBadge({ status }) {
    const isPub = (status || '').toLowerCase() === 'published';
    const cls = isPub ? 'bg-green-50 text-green-700 font-semibold' : 'bg-yellow-50 text-yellow-700 font-semibold';
    return <span className={`px-2.5 py-1 rounded-full text-xs ${cls}`}>{status}</span>;
}

export default function RecentResourcesTable({ items = [] }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const paginatedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Recent Resources</h3>
                <button 
                    onClick={() => navigate('/creator/manage')}
                    className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                    View all
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-slate-400 border-b border-slate-100">
                            <th className="pb-3 font-semibold">Resource</th>
                            <th className="pb-3 font-semibold">Type</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold">Updated</th>
                            <th className="pb-3 font-semibold">Views</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700 divide-y divide-slate-50">
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="py-3 font-medium text-slate-900">{r.title}</td>
                                    <td className="py-3 text-slate-500">{r.type}</td>
                                    <td className="py-3"><StatusBadge status={r.status} /></td>
                                    <td className="py-3 text-slate-500">{r.updated}</td>
                                    <td className="py-3 text-slate-500">{r.views}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-slate-400 italic">
                                    No published or draft resources found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {items.length > pageSize && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">
                        Showing {Math.min((currentPage - 1) * pageSize + 1, items.length)} to {Math.min(currentPage * pageSize, items.length)} of {items.length} resources
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="px-2 font-semibold text-slate-700">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
