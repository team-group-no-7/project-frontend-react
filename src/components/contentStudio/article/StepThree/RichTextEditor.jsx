import React from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function RichTextEditor({ value, onChange, placeholder }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Article Body Content</label>
            <Textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Start writing your article...'}
                className="min-h-[350px] resize-none border-0 p-0 focus-visible:ring-0 shadow-none text-base text-slate-700 leading-relaxed placeholder:text-slate-400"
            />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                <span>Standard plain-text/markdown format</span>
                <span>{value ? value.trim().split(/\s+/).filter(Boolean).length : 0} words</span>
            </div>
        </div>
    );
}
