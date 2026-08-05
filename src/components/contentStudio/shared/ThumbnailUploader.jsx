import React, { useMemo } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function ThumbnailUploader({ value, onChange }) {
    const previewUrl = useMemo(() => {
        if (!value) return null;
        if (typeof value === 'string') return value;
        if (value instanceof File) return URL.createObjectURL(value);
        return null;
    }, [value]);

    return (
        <div className="flex items-center gap-4 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <div className="w-28 h-20 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center border border-slate-300 dark:border-slate-700 shrink-0">
                {previewUrl ? (
                    <img src={previewUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-slate-400 text-[10px]">
                        <ImageIcon className="h-5 w-5 mb-1" />
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <div>
                <label className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-xl cursor-pointer text-xs transition-colors shadow-xs">
                    {previewUrl ? "Change Image" : "Upload Thumbnail"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && onChange) onChange(file);
                        }}
                    />
                </label>
                <div className="text-[11px] text-neutral-500 mt-1.5">Recommended format: PNG, JPG (16:9)</div>
            </div>
        </div>
    );
}
