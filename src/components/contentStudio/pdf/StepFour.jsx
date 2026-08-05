import React from 'react';
import { FileText } from 'lucide-react';

export default function StepFourPDF({ file, form }) {
    const formattedTags = Array.isArray(form.tags) 
        ? form.tags 
        : (typeof form.tags === 'string' && form.tags.trim() ? form.tags.split(',').map(t => t.trim()) : []);

    const priceDisplay = parseFloat(form.price) > 0 ? `₹${form.price}` : 'FREE';

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">PDF Resource Preview</h2>
                    <p className="text-sm text-neutral-500 mt-1">Review your uploaded PDF document and resource summary before publishing.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase">
                    PDF PREVIEW
                </div>
            </div>

            <div className="grid xl:grid-cols-[1.4fr_1fr] gap-6 items-start">
                {/* PDF Document Viewer Container */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Document Preview</h3>
                    {file ? (
                        <iframe
                            src={URL.createObjectURL(file)}
                            title={file.name || "PDF Document Preview"}
                            className="w-full h-[26rem] rounded-2xl border border-slate-200 shadow-inner bg-slate-50"
                        />
                    ) : (
                        <div className="w-full h-[26rem] bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-neutral-400 text-xs">
                            <FileText size={32} className="text-slate-300" />
                            <span>No PDF file uploaded for preview</span>
                        </div>
                    )}
                    {file && (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between text-xs">
                            <div>
                                <div className="font-bold text-slate-800 line-clamp-1">{file.name}</div>
                                <div className="text-neutral-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF File</div>
                            </div>
                            <span className="bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-md text-[10px] uppercase">
                                File Ready
                            </span>
                        </div>
                    )}
                </div>

                {/* Resource Summary Box */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">Resource Details</h3>
                    
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase">
                                {form.categoryName || form.category || 'General'}
                            </span>
                            <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-0.5 rounded-lg border border-emerald-200">
                                {priceDisplay}
                            </span>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-slate-900 leading-snug">{form.title || 'Untitled PDF Resource'}</h4>
                            <p className="text-xs text-slate-500 mt-1">Level: <strong>{form.difficulty || 'Beginner'}</strong></p>
                        </div>

                        {form.description && (
                            <div className="pt-2">
                                <span className="text-[11px] font-bold text-slate-400 uppercase">Description</span>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    {form.description}
                                </p>
                            </div>
                        )}

                        {formattedTags.length > 0 && (
                            <div className="pt-2">
                                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1.5">Tags</span>
                                <div className="flex flex-wrap gap-1">
                                    {formattedTags.map((tag, idx) => (
                                        <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
