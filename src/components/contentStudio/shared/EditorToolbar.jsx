import React from 'react';
import { Bold, Italic, Code, List } from 'lucide-react';

export default function EditorToolbar() {
    return (
        <div className="flex items-center gap-2 border-b pb-2">
            <button className="px-2 py-1 rounded hover:bg-gray-100"><Bold size={18} /></button>
            <button className="px-2 py-1 rounded hover:bg-gray-100"><Italic size={18} /></button>
            <button className="px-2 py-1 rounded hover:bg-gray-100"><List size={18} /></button>
            <button className="px-2 py-1 rounded hover:bg-gray-100"><Code size={18} /></button>
        </div>
    );
}
