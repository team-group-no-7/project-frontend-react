import React from 'react';

export default function EditorTips() {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100">
            <h3 className="font-semibold text-base text-slate-900">Editor Tips</h3>
            <p className="text-sm text-neutral-500 mt-2">
                Use headings, lists, and code blocks to make your article clear and engaging for learners.
            </p>
            <div className="mt-5 space-y-3 text-sm text-neutral-600">
                <div className="flex items-start gap-2">
                    <span className="mt-1 text-royal font-bold">•</span>
                    <span>Use <strong>Heading 1 & 2</strong> for main topics and subtopics.</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="mt-1 text-royal font-bold">•</span>
                    <span>Use <strong>Code Blocks</strong> when sharing programming snippets.</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="mt-1 text-royal font-bold">•</span>
                    <span>Highlight key points with <strong>Block Quotes</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="mt-1 text-royal font-bold">•</span>
                    <span>Keep paragraphs short and easy to read on mobile devices.</span>
                </div>
            </div>
        </div>
    );
}
