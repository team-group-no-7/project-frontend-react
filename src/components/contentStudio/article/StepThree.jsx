import React from 'react';
import RichTextEditorContainer from './StepThree/RichTextEditorContainer';
import EditorTips from '../shared/EditorTips';

export default function StepThree({ content, setContent }) {
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">Write your article</h2>
                <p className="text-sm text-neutral-500 mt-1">Compose your tutorial, guide or article with rich text formatting.</p>
            </div>
            <div className="grid xl:grid-cols-[1.6fr_0.9fr] gap-6 items-start">
                <RichTextEditorContainer content={content} setContent={setContent} />
                <EditorTips />
            </div>
        </div>
    );
}
