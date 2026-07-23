import React from 'react';

export default function StepTwo({ selectedEditor, setSelectedEditor }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Choose your editor</h2>
            <div className="grid grid-cols-2 gap-6">
                <div onClick={() => setSelectedEditor('rich')} className={`p-6 rounded-lg border ${selectedEditor === 'rich' ? 'border-royal bg-royal/5' : 'border-gray-200'} cursor-pointer`}>
                    <div className="font-semibold">Rich Text Editor</div>
                    <div className="text-sm text-neutral-500 mt-2">WYSIWYG editor with formatting tools, images, tables, links and more.</div>
                </div>
                <div onClick={() => setSelectedEditor('markdown')} className={`p-6 rounded-lg border ${selectedEditor === 'markdown' ? 'border-royal bg-royal/5' : 'border-gray-200'} cursor-pointer`}>
                    <div className="font-semibold">Markdown Editor</div>
                    <div className="text-sm text-neutral-500 mt-2">Write in markdown syntax with live preview.</div>
                </div>
            </div>
        </div>
    );
}
