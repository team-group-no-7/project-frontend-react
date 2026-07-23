import React from 'react';
import { FileText, File } from 'lucide-react';

function Card({ icon: Icon, title, desc, selected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`p-6 rounded-xl border transition-shadow ${selected ? 'border-royal bg-royal/5 shadow-md' : 'border-gray-200 hover:shadow-sm'} cursor-pointer`}
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded shadow-sm flex items-center justify-center"><Icon size={24} className="text-royal" /></div>
                <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-neutral-500">{desc}</div>
                </div>
            </div>
        </div>
    );
}

export default function StepOne({ contentType, setContentType, onNext }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">What do you want to create?</h2>
            <div className="grid grid-cols-2 gap-6">
                <Card icon={File} title="PDF Resource" desc="Upload PDF files like notes, books, assignments, or study material." selected={contentType === 'pdf'} onClick={() => setContentType('pdf')} />
                <Card icon={FileText} title="Article" desc="Write articles, tutorials, blogs, or guides using Rich Text or Markdown." selected={contentType === 'article'} onClick={() => setContentType('article')} />
            </div>
        </div>
    );
}
