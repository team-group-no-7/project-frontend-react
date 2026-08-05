import React, { useRef, useEffect, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link,
  Image as ImageIcon,
  Code,
  Quote,
  Undo,
  Redo
} from 'lucide-react';

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

    const handleInsertLink = (e) => {
        e.preventDefault();
        const url = prompt("Enter hyperlink URL:", "https://");
        if (url) {
            document.execCommand('createLink', false, url);
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
                updateWordCount();
            }
        }
    };

    const handleInsertImage = (e) => {
        e.preventDefault();
        const url = prompt("Enter Image URL (e.g. https://images.unsplash.com/... or hosted image link):", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800");
        if (url) {
            const imgHtml = `<img src="${url}" alt="Article Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; display: block;" /><p><br></p>`;
            document.execCommand('insertHTML', false, imgHtml);
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
                updateWordCount();
            }
        }
    };

    const handleInsertCode = (e) => {
        e.preventDefault();
        const selectedText = window.getSelection().toString();
        const codeSnippet = selectedText || prompt("Enter code snippet:", "console.log('LearnHub Platform');");
        if (codeSnippet) {
            const safeCode = codeSnippet.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const codeHtml = `<pre style="background-color: #0f172a; color: #38bdf8; padding: 12px 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; margin: 12px 0;"><code>${safeCode}</code></pre><p><br></p>`;
            document.execCommand('insertHTML', false, codeHtml);
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
                updateWordCount();
            }
        }
    };

    const handleInsertQuote = (e) => {
        e.preventDefault();
        const selectedText = window.getSelection().toString();
        const quoteText = selectedText || prompt("Enter quote text:", "Knowledge multiplies when shared.");
        if (quoteText) {
            const quoteHtml = `<blockquote style="border-left: 4px solid #6366f1; padding-left: 12px; font-style: italic; color: #475569; margin: 12px 0;">"${quoteText}"</blockquote><p><br></p>`;
            document.execCommand('insertHTML', false, quoteHtml);
            if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
                updateWordCount();
            }
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
            {/* Custom placeholder and elements styling */}
            <style>{`
                .wysiwyg-editor:empty:before {
                    content: attr(placeholder);
                    color: #94a3b8;
                    cursor: text;
                }
                .wysiwyg-editor h1 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin-top: 0.75rem;
                    margin-bottom: 0.5rem;
                    color: #0f172a;
                }
                .wysiwyg-editor h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-top: 0.75rem;
                    margin-bottom: 0.5rem;
                    color: #1e293b;
                }
                .wysiwyg-editor h3 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-top: 0.5rem;
                    margin-bottom: 0.25rem;
                    color: #334155;
                }
                .wysiwyg-editor p {
                    margin-bottom: 0.5rem;
                }
                .wysiwyg-editor ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 0.5rem;
                }
                .wysiwyg-editor ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 0.5rem;
                }
                .wysiwyg-editor blockquote {
                    border-left: 4px solid #6366f1;
                    padding-left: 1rem;
                    font-style: italic;
                    color: #475569;
                    margin: 0.75rem 0;
                }
                .wysiwyg-editor pre {
                    background-color: #0f172a;
                    color: #38bdf8;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    font-family: monospace;
                    font-size: 0.875rem;
                    overflow-x: auto;
                    margin: 0.75rem 0;
                }
                .wysiwyg-editor img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 0.75rem 0;
                    display: block;
                }
                .wysiwyg-editor a {
                    color: #4f46e5;
                    text-decoration: underline;
                }
            `}</style>

            {/* WYSIWYG Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-100 text-slate-600 select-none">
                
                {/* Undo / Redo */}
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'undo')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Undo"
                >
                    <Undo size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'redo')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Redo"
                >
                    <Redo size={16} />
                </button>

                <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                {/* Text Formatting */}
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
                <button
                    type="button"
                    onMouseDown={(e) => handleFormat(e, 'strikethrough')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Strikethrough"
                >
                    <Strikethrough size={16} />
                </button>
                
                <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                
                {/* Headings */}
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
                    onMouseDown={(e) => handleFormat(e, 'formatBlock', '<h3>')}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer font-bold"
                    title="Heading 3"
                >
                    <Heading3 size={16} />
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

                {/* Lists & Quotes */}
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
                <button
                    type="button"
                    onMouseDown={handleInsertQuote}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Blockquote"
                >
                    <Quote size={16} />
                </button>

                <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                {/* Alignment */}
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

                <div className="w-[1px] h-4 bg-slate-200 mx-1" />

                {/* Insert Elements: Link, Image, Code Block */}
                <button
                    type="button"
                    onMouseDown={handleInsertLink}
                    className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Insert Link"
                >
                    <Link size={16} />
                </button>
                <button
                    type="button"
                    onMouseDown={handleInsertImage}
                    className="p-1.5 rounded hover:bg-[#EEF2FF] hover:text-[#4F46E5] text-indigo-600 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold px-2 border border-indigo-100 rounded-md"
                    title="Add Image"
                >
                    <ImageIcon size={16} /> Image
                </button>
                <button
                    type="button"
                    onMouseDown={handleInsertCode}
                    className="p-1.5 rounded hover:bg-[#F0FDF4] hover:text-[#166534] text-emerald-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono font-bold px-2 border border-emerald-100 rounded-md"
                    title="Add Code Block (<>)"
                >
                    <Code size={16} /> Code (&lt;&gt;)
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
