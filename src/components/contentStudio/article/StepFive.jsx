import React from 'react';

export default function StepFive({ form }) {
    const formattedTags = Array.isArray(form.tags) 
        ? form.tags 
        : (typeof form.tags === 'string' && form.tags.trim() ? form.tags.split(',').map(t => t.trim()) : []);

    const priceDisplay = parseFloat(form.price) > 0 ? `₹${form.price}` : 'FREE';

    // Helper for shorter article preview text snippet
    const createShorterPreviewHtml = (htmlContent) => {
        if (!htmlContent) return '';
        const trimmed = htmlContent.length > 600 ? htmlContent.substring(0, 600) + '...' : htmlContent;
        return trimmed;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Article Preview</h2>
                    <p className="text-sm text-neutral-500 mt-1">Review the resource summary and article content preview before publishing.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase">
                    {form.type || 'ARTICLE'} PREVIEW
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
                {/* 1. Article Header Summary (Title, Category, Price, Level, Tags) */}
                <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                            {form.categoryName || form.category || 'General'}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                                Level: {form.difficulty || 'Beginner'}
                            </span>
                            <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-lg border border-emerald-200">
                                {priceDisplay}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{form.title || 'Untitled Article'}</h3>
                        {form.subtitle && (
                            <p className="mt-1.5 text-sm text-slate-500 font-medium">{form.subtitle}</p>
                        )}
                    </div>

                    {formattedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {formattedTags.map((tag, idx) => (
                                <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. Description Section */}
                {form.description && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Description</h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100">
                            {form.description}
                        </p>
                    </div>
                )}

                {/* 3. Shorter Article Content Preview */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Article Content Preview (Shortened)</h4>
                        <span className="text-xs text-neutral-400 font-medium">Shorter Preview</span>
                    </div>

                    {form.body ? (
                        <div className="relative rounded-2xl bg-white border border-slate-200 p-6 overflow-hidden">
                            <div 
                                className="prose max-w-none text-slate-700 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: createShorterPreviewHtml(form.body) }}
                            />
                            {form.body.length > 600 && (
                                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 text-center text-xs font-semibold text-indigo-600">
                                    Full article content will be published and accessible to enrolled learners.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400 italic">
                            No article body content added yet. Return to the Editor step to add content.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
