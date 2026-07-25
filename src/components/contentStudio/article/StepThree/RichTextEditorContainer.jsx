import React from 'react';
import RichTextEditor from './RichTextEditor';
import WordCounter from '../../shared/WordCounter';
import CharacterCounter from '../../shared/CharacterCounter';

export default function RichTextEditorContainer({ content, setContent }) {
    const title = content.title || '';
    const body = content.body || '';

    // Simple frontend validation flags
    const isTitleEmpty = !title.trim();
    const plainText = body.replace(/<[^>]*>/g, '').trim();
    const isBodyEmpty = !plainText;

    function handleTitleChange(e) {
        setContent({ ...content, title: e.target.value });
    }

    function handleBodyChange(newBody) {
        setContent({ ...content, body: newBody });
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100 space-y-5">
            {/* Title Input Field */}
            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Article Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter article title..."
                    value={title}
                    onChange={handleTitleChange}
                    className={`w-full rounded-2xl border ${isTitleEmpty ? 'border-amber-300 focus:border-royal' : 'border-gray-200'} p-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal/20 transition-all`}
                />
                {isTitleEmpty && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                        <span>⚠️</span> Please enter an article title.
                    </p>
                )}
            </div>

            {/* Rich Text Editor */}
            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Article Body <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                    value={body}
                    onChange={handleBodyChange}
                    placeholder="Start writing your article..."
                />
                {isBodyEmpty && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                        <span>⚠️</span> Please write some article content.
                    </p>
                )}
            </div>

            {/* Counter Components & Validation Status */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <WordCounter text={body} />
                    <CharacterCounter text={body} />
                </div>
                <div className="text-xs text-neutral-400">
                    {isTitleEmpty || isBodyEmpty ? (
                        <span className="text-amber-500 font-medium">Complete required fields to proceed</span>
                    ) : (
                        <span className="text-emerald-600 font-medium">✓ Ready to proceed</span>
                    )}
                </div>
            </div>
        </div>
    );
}
