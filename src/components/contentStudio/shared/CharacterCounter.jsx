import React from 'react';

export default function CharacterCounter({ text = '' }) {
    // Strip HTML tags to count visible characters
    const plainText = text.replace(/<[^>]*>/g, '').trim();
    const charCount = plainText.length;

    return (
        <div className="text-xs font-medium text-neutral-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span>Characters:</span>
            <span className="font-semibold text-slate-800">{charCount}</span>
        </div>
    );
}
