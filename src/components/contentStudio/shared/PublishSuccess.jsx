import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PublishSuccess({ title, type = 'article', category = 'Programming', subcategory = 'JavaScript', price = 299, difficulty = 'Beginner' }) {
    const resourceType = type === 'pdf' ? 'PDF resource' : 'resource';

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-semibold text-slate-900">Congratulations!</h2>
                <p className="mt-3 text-sm text-neutral-500 max-w-2xl mx-auto">
                    Your {resourceType} has been published successfully. It is now live on the platform and visible to learners.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm grid gap-4 md:grid-cols-[0.85fr_1.15fr] items-center">
                    <div className="rounded-3xl bg-slate-900 h-36 flex items-center justify-center text-white text-xl font-semibold">{type === 'pdf' ? 'PDF' : 'ART'}</div>
                    <div>
                        <div className="text-lg font-semibold text-slate-900">{title}</div>
                        <div className="text-sm text-neutral-500 mt-2">{category} • {subcategory} • {difficulty} • ₹{price}</div>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-royal">
                            <span className="rounded-full border border-blue-200 px-3 py-1 bg-blue-50">View Live Resource</span>
                            <span className="rounded-full border border-slate-200 px-3 py-1">Share</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <button className="rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4 text-left hover:bg-blue-100 transition">
                        <div className="text-sm font-semibold text-slate-900">Go to My Resources</div>
                        <div className="text-xs text-neutral-500 mt-1">View and manage your published resources.</div>
                    </button>
                    <button className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left hover:shadow-sm transition">
                        <div className="text-sm font-semibold text-slate-900">View Analytics</div>
                        <div className="text-xs text-neutral-500 mt-1">Check the performance of your resource.</div>
                    </button>
                    <button className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left hover:shadow-sm transition">
                        <div className="text-sm font-semibold text-slate-900">Edit Resource</div>
                        <div className="text-xs text-neutral-500 mt-1">Make changes to your resource anytime.</div>
                    </button>
                    <button className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left hover:shadow-sm transition">
                        <div className="text-sm font-semibold text-slate-900">Create Another</div>
                        <div className="text-xs text-neutral-500 mt-1">Start creating another resource.</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
