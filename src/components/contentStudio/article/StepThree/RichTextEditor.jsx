import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { editorModules, editorFormats } from './RichEditorConfig';

export default function RichTextEditor({ value, onChange, placeholder }) {
    return (
        <div className="learnhub-quill-wrapper">
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={editorModules}
                formats={editorFormats}
                placeholder={placeholder || 'Start writing your article...'}
            />
        </div>
    );
}
