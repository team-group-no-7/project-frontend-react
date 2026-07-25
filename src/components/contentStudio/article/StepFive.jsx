import React from 'react';
import PreviewCard from '../shared/PreviewCard';
import { Bookmark, Clock3, Star } from 'lucide-react';

export default function StepFive({ form }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold">Resource preview</h2>
                    <p className="text-sm text-neutral-500 mt-1">See the final layout exactly as learners will view it.</p>
                </div>
            </div>

            <div className="grid xl:grid-cols-[1.5fr_0.85fr] gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="grid gap-6">
                        <div className="rounded-3xl bg-slate-100 p-6">
                            <div className="text-sm uppercase tracking-[0.2em] text-royal font-semibold">Resource Preview</div>
                            <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.75fr] items-start">
                                <div>
                                    <h3 className="text-3xl font-semibold text-slate-900">{form.title}</h3>
                                    <p className="mt-3 text-sm text-neutral-500">{form.subtitle || 'A complete guide with examples and use cases.'}</p>
                                </div>
                                <div className="rounded-3xl bg-white border border-slate-200 p-4">
                                    <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">{form.category || 'Programming'} • {form.subcategory || 'JavaScript'}</div>
                                    <div className="mt-3 text-sm font-semibold text-slate-900">{form.difficulty}</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-white border border-slate-200 p-4">
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                    <Clock3 size={18} /> <span>25 min read</span>
                                </div>
                            </div>
                            <div className="rounded-3xl bg-white border border-slate-200 p-4">
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                    <Star size={18} /> <span>4.8 (120 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 p-6">
                            <div className="font-semibold text-slate-900 mb-3">What learners will get</div>
                            <div className="grid gap-3 text-sm text-neutral-600">
                                <div className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-royal" />Practical examples and exercises</div>
                                <div className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-royal" />Clear concept explanations</div>
                                <div className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-royal" />Downloadable resources</div>
                            </div>
                        </div>

                        {form.body && (
                            <div className="rounded-3xl bg-white border border-slate-200 p-6">
                                <div className="font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100 text-lg">Article Content Preview</div>
                                <div 
                                    className="prose max-w-none text-slate-700 space-y-4 text-sm leading-relaxed overflow-x-auto"
                                    dangerouslySetInnerHTML={{ __html: form.body }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <PreviewCard data={form} />
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <div className="font-semibold text-slate-900 mb-3">Table of contents</div>
                        <ol className="space-y-3 text-sm text-neutral-600 list-decimal list-inside">
                            <li>What is a Closure?</li>
                            <li>How Closures Work</li>
                            <li>Practical Examples</li>
                            <li>Use Cases</li>
                            <li>Common Questions</li>
                            <li>Exercises</li>
                            <li>Summary</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
