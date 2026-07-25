import React from 'react';

export default function CategorySelector({ categories, value, onChange }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <select value={value.category || ''} onChange={(e) => onChange({ ...value, category: e.target.value })} className="rounded border p-2">
                <option value="">Select category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <select value={value.subcategory || ''} onChange={(e) => onChange({ ...value, subcategory: e.target.value })} className="rounded border p-2">
                <option value="">Select subcategory</option>
                {(categories.find((c) => c.id === value.category)?.subcategories || []).map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    );
}
