import React, { useState } from 'react';

/**
 * CategorySelector (Module: Creator Content Studio)
 * Renders category selection dropdown with "+ Type a new Category..." support.
 * Simple, clean beginner React component.
 */
export default function CategorySelector({ categories = [], value = {}, onChange }) {
    const [isCustomCategory, setIsCustomCategory] = useState(false);

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'NEW_CATEGORY') {
            setIsCustomCategory(true);
            onChange({ ...value, category: '', categoryName: '' });
        } else {
            setIsCustomCategory(false);
            // Find selected category object
            const selectedCat = categories.find((c) => String(c.id) === String(selectedValue) || c.name === selectedValue);
            onChange({
                ...value,
                category: selectedCat ? selectedCat.id : selectedValue,
                categoryName: selectedCat ? selectedCat.name : selectedValue
            });
        }
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                {/* Category Selection Dropdown */}
                <select
                    value={isCustomCategory ? 'NEW_CATEGORY' : (value.categoryName || value.category || '')}
                    onChange={handleCategoryChange}
                    className="rounded-xl border border-slate-200 p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                        <option key={c.id || c.name} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                    <option value="NEW_CATEGORY">➕ Type a new Category...</option>
                </select>

                {/* Subcategory Selection Dropdown */}
                <select
                    value={value.subcategory || ''}
                    onChange={(e) => onChange({ ...value, subcategory: e.target.value })}
                    className="rounded-xl border border-slate-200 p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select subcategory</option>
                    {(categories.find((c) => c.name === value.categoryName || c.id === value.category)?.subcategories || [
                        'Java', 'Spring Boot', 'React', 'Python', 'General'
                    ]).map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {/* Custom Category Input Box (Shown when "+ Type a new Category..." is selected) */}
            {isCustomCategory && (
                <div className="mt-2">
                    <input
                        type="text"
                        placeholder="Type new category name (e.g. AI Engineering)..."
                        value={value.categoryName || ''}
                        onChange={(e) => onChange({ ...value, categoryName: e.target.value, category: e.target.value })}
                        className="w-full rounded-xl border border-indigo-300 p-2.5 text-sm bg-indigo-50/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            )}
        </div>
    );
}
