import React from 'react';
import { Cloud } from 'lucide-react';

export default function UploadArea({ onFile, file }) {
    return (
        <div>
            <div className="border-2 border-dashed border-blue-500/25 rounded-lg p-12 text-center">
                <Cloud className="mx-auto text-royal" size={48} />
                <h3 className="mt-4 font-semibold text-lg">Upload PDF</h3>
                <p className="text-sm text-neutral-500 mt-2">Upload a high-quality PDF file. Max file size: 100 MB</p>
                <div className="mt-6">
                    <label className="inline-block bg-gradient-to-r from-[#4f46e5] to-[#2563eb] text-white px-4 py-2 rounded-full cursor-pointer shadow">
                        Browse Files
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => onFile && onFile(e.target.files[0])} />
                    </label>
                </div>
            </div>

            {file && (
                <div className="mt-4 bg-white border rounded p-3 shadow flex items-center justify-between">
                    <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}</div>
                    </div>
                    <div className="text-green-500 font-bold">✓</div>
                </div>
            )}
        </div>
    );
}
