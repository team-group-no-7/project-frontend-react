import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null);
    const [wordCount, setWordCount] = useState(0);

    // Sync content value when component loads
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
            updateWordCount();
        }
    }, [value]);

    // Handle user formatting action using browser's native execCommand
    const handleFormat = (e, command, argument = null) => {
        e.preventDefault(); // CRITICAL: Prevent button click from stealing text selection focus
        document.execCommand(command, false, argument);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
            updateWordCount();
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
            updateWordCount();
        }
    };

    const updateWordCount = () => {
        if (editorRef.current) {
            const textContent = editorRef.current.innerText || '';
            const words = textContent.trim().split(/\s+/).filter(Boolean).length;
            setWordCount(words);
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
            {/* Custom placeholder style */}
            <style>{`
                .wysiwyg-editor:empty:before {
                    content: attr(placeholder);
                    color: #94a3b8;
                    cursor: text;
                }
            `}</style>

            {/* WYSIWYG Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-100 text-slate-600">
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'bold')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Bold"
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'italic')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Italic"
                >
                    <Italic size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'underline')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Underline"
                >
                    <Underline size={16} />
                </button>
                
                <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'formatBlock', '<h1>')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                    title="Heading 1"
                >
                    <Heading1 size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'formatBlock', '<h2>')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                    title="Heading 2"
                >
                    <Heading2 size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'formatBlock', '<p>')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer font-semibold text-xs px-2"
                    title="Paragraph"
                >
                    P
                </button>

                <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'insertUnorderedList')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Bullet List"
                >
                    <List size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'insertOrderedList')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>

                <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'justifyLeft')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Align Left"
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'justifyCenter')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Align Center"
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'justifyRight')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Align Right"
                >
                    <AlignRight size={16} />
                </button>
            </div>

            {/* WYSIWYG Editable Area */}
            <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleInput}
                className="wysiwyg-editor min-h-[350px] max-h-[500px] overflow-y-auto p-4 focus:outline-none text-base text-slate-700 leading-relaxed"
                style={{ fontFamily: 'inherit' }}
                placeholder={placeholder || 'Start writing your article...'}
            />

            {/* Word count footer */}
            <div className="flex justify-between items-center px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
                <span>Rich Text WYSIWYG Editor</span>
                <span>{wordCount} words</span>
            </div>
        </div>
    );
}
