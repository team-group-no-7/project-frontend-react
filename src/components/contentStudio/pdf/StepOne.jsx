import React from 'react';

export default function StepOnePDF({ onSelect }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Create New Resource (PDF Resource)</h2>
            <p className="text-sm text-neutral-500 mb-6">Step 1 of 5 — Choose PDF resource to upload your file.</p>
            <div className="p-6 rounded-lg border border-gray-200 bg-white cursor-pointer" onClick={() => onSelect('pdf')}>
                <div className="font-semibold">Upload PDF</div>
                <div className="text-sm text-neutral-500 mt-1">Start by uploading a PDF file for your resource.</div>
            </div>
        </div>
    );
}
