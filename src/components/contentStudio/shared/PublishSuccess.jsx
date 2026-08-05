import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, LayoutGrid, ArrowRight, PlusCircle } from 'lucide-react';

export default function PublishSuccess({
    title,
    type = 'article',
    category = 'General',
    description,
    price = 0,
    difficulty = 'Beginner',
    onNavigate
}) {
    const navigate = useNavigate();
    const isPdf = String(type).toLowerCase() === 'pdf';
    const priceDisplay = parseFloat(price) > 0 ? `₹${price}` : 'FREE';

    const handleGoToResources = () => {
        if (onNavigate) onNavigate('manage');
        navigate('/creator/manage');
    };

    const handleViewDashboard = () => {
        if (onNavigate) onNavigate('dashboard');
        navigate('/creator/dashboard');
    };

    const handleCreateAnother = () => {
        if (onNavigate) onNavigate('content-studio');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Success Banner */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={36} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">Congratulations!</h2>
                <p className="text-sm text-neutral-500 max-w-lg mx-auto text-center leading-relaxed">
                    Your content has been published successfully and is now live on the marketplace.
                </p>
            </div>

            {/* Clean Resource Summary (Matching Step 4/5 Preview UI) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-extrabold uppercase">
                        {category}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                            Level: {difficulty}
                        </span>
                        <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-0.5 rounded-lg border border-emerald-200">
                            {priceDisplay}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-900">{title || 'Untitled Resource'}</h3>
                    {description && (
                        <p className="text-xs text-slate-600 leading-relaxed mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Action Buttons (3 Clean Buttons — Edit Resource Removed) */}
            <div className="grid gap-4 sm:grid-cols-3">
                <button
                    onClick={handleGoToResources}
                    className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 text-left hover:bg-indigo-100/80 transition cursor-pointer group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">Go to My Resources</span>
                        <LayoutGrid className="h-4 w-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1.5">View & manage all your published contents.</p>
                </button>

                <button
                    onClick={handleViewDashboard}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-slate-300 hover:shadow-xs transition cursor-pointer group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">View Dashboard</span>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1.5">Check performance & earnings dashboard.</p>
                </button>

                <button
                    onClick={handleCreateAnother}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-slate-300 hover:shadow-xs transition cursor-pointer group"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">Create Another</span>
                        <PlusCircle className="h-4 w-4 text-slate-400 group-hover:rotate-90 transition-transform" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1.5">Start authoring another learning resource.</p>
                </button>
            </div>
        </div>
    );
}
