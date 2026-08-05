import React from 'react';

export default function WordCounter({ text = '' }) {
    // Strip HTML tags to extract pure text
    const plainText = text.replace(/<[^>]*>/g, ' ').trim();
    // Split by whitespace and filter out empty items
    const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    return (
        <div className="text-xs font-medium text-neutral-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span>Words:</span>
            <span className="font-semibold text-slate-800">{wordCount}</span>
        </div>
    );
}
