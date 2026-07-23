import React from 'react';
import EditorToolbar from '../shared/EditorToolbar';

export default function StepThree({ content, setContent }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Write your content</h2>
            <div className="grid xl:grid-cols-[1.6fr_0.9fr] gap-6">
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-600 mb-2">Title</label>
                        <input
                            placeholder="Enter your article title"
                            value={content.title || ''}
                            onChange={(e) => setContent({ ...content, title: e.target.value })}
                            className="w-full rounded-2xl border border-gray-200 p-3 shadow-sm"
                        />
                    </div>
                    <EditorToolbar />
                    <textarea
                        value={content.body || ''}
                        onChange={(e) => setContent({ ...content, body: e.target.value })}
                        className="w-full h-72 mt-4 p-4 rounded-3xl border border-gray-200 shadow-sm resize-none"
                        placeholder="Start writing your article..."
                    />
                </div>
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <h3 className="font-semibold text-base">Editor Tips</h3>
                    <p className="text-sm text-neutral-500 mt-3">Use headings, lists, and images to make your content more engaging.</p>
                    <div className="mt-5 space-y-3 text-sm text-neutral-600">
                        <div className="flex items-start gap-2"><span className="mt-1 text-royal">•</span><span>Use concise headings to structure sections.</span></div>
                        <div className="flex items-start gap-2"><span className="mt-1 text-royal">•</span><span>Include examples and notes for clarity.</span></div>
                        <div className="flex items-start gap-2"><span className="mt-1 text-royal">•</span><span>Keep paragraphs short for readability.</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
