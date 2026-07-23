import React from 'react';
import { User, Tag, CircleDashed } from 'lucide-react';

export default function PreviewCard({ data }) {
    return (
        <div className="rounded-3xl shadow-md bg-white p-5 w-full">
            <div className="grid gap-4 sm:grid-cols-[0.95fr_0.65fr]">
                <div className="space-y-3">
                    <div className="rounded-3xl bg-slate-100 h-44 flex items-center justify-center text-slate-500 font-semibold">Thumbnail</div>
                    <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Preview</div>
                        <h3 className="text-xl font-semibold text-slate-900">{data.title}</h3>
                        <p className="text-sm text-neutral-500 mt-2">{data.subtitle || data.description}</p>
                    </div>
                </div>
                <div className="rounded-3xl border border-slate-200 p-4 bg-white">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                        <User size={18} /> By Anuj Bhaiya
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                        <CircleDashed size={18} /> {data.category || 'Programming'} • {data.subcategory || 'JavaScript'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                        <Tag size={18} /> {data.difficulty || 'Beginner'}
                    </div>
                    <div className="text-sm text-slate-800 font-semibold">₹{data.price || 'Free'}</div>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {(data.tags || []).slice(0, 5).map((tag) => (
                    <span key={tag} className="text-xs rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-neutral-600">{tag}</span>
                ))}
            </div>
        </div>
    );
}
