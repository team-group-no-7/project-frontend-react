import React from 'react';

export default function ThumbnailUploader({ value, onChange }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-28 h-20 bg-gray-100 rounded flex items-center justify-center">Thumb</div>
            <div>
                <label className="inline-block bg-white border border-gray-200 px-3 py-1 rounded cursor-pointer text-sm">
                    Change Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onChange && onChange(e.target.files[0])} />
                </label>
                <div className="text-xs text-neutral-500 mt-2">Recommended: 1280x720px (16:9)</div>
            </div>
        </div>
    );
}
