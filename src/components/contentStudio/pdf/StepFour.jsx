import React from 'react';
import PreviewCard from '../shared/PreviewCard';
import { FileText, Layers } from 'lucide-react';

export default function StepFourPDF({ file, form }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold">PDF Preview</h2>
                    <p className="text-sm text-neutral-500 mt-1">Review your uploaded PDF and resource summary.</p>
                </div>
            </div>
            <div className="grid xl:grid-cols-[1.65fr_0.95fr] gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="w-full h-[28rem] bg-slate-100 rounded-3xl border border-slate-200 flex items-center justify-center text-neutral-500">
                        PDF Viewer Placeholder
                    </div>
                    {file && (
                        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-semibold">{file.name}</div>
                                    <div className="text-xs text-neutral-500 mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB • PDF File</div>
                                </div>
                                <div className="text-emerald-600 font-semibold">Uploaded</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <div className="text-sm uppercase tracking-[0.2em] text-neutral-500">Resource Summary</div>
                            <div className="mt-2 text-lg font-semibold text-slate-900">{form.title}</div>
                        </div>
                        <div className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{form.pages || '128'} Pages</div>
                    </div>
                    <PreviewCard data={form} />
                    <div className="mt-6 space-y-4 text-sm text-neutral-600">
                        <div className="flex items-start gap-3"><FileText size={18} className="text-royal mt-1" /><span>Preview the PDF file layout and content sections.</span></div>
                        <div className="flex items-start gap-3"><Layers size={18} className="text-royal mt-1" /><span>Check resource metadata and page details before publishing.</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
