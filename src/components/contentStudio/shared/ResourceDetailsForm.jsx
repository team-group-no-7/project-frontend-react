import React from 'react';
import CategorySelector from './CategorySelector';
import PricingSection from './PricingSection';
import { categories } from '../../../data/contentStudio/categories';
import { languages } from '../../../data/contentStudio/languages';

export default function ResourceDetailsForm({ form, onChange }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <label className="block text-sm text-neutral-600 font-medium">
                        Title <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <input value={form.title || ''} onChange={(e) => onChange({ ...form, title: e.target.value })} className="w-full rounded-3xl border border-gray-200 p-3 mt-2 shadow-sm text-sm" />

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Subtitle (Optional)</label>
                    <input value={form.subtitle || ''} onChange={(e) => onChange({ ...form, subtitle: e.target.value })} className="w-full rounded-3xl border border-gray-200 p-3 mt-2 shadow-sm text-sm" placeholder="Add a short subtitle" />

                    <label className="block text-sm text-neutral-600 font-medium mt-4">
                        Description <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <textarea value={form.description || ''} onChange={(e) => onChange({ ...form, description: e.target.value })} className="w-full rounded-3xl border border-gray-200 p-3 mt-2 h-32 shadow-sm text-sm" />

                    <div className="mt-2 text-xs text-neutral-400">{(form.description || '').length}/500</div>

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Tags</label>
                    <input
                        type="text"
                        value={typeof form.tags === 'string' ? form.tags : (Array.isArray(form.tags) ? form.tags.join(', ') : '')}
                        onChange={(e) => onChange({ ...form, tags: e.target.value })}
                        placeholder="e.g. Java, Spring Boot, Microservices"
                        className="w-full rounded-3xl border border-gray-200 p-3 mt-2 shadow-sm text-sm"
                    />
                    <p className="text-xs text-neutral-400 mt-1">Enter tags for your resource.</p>
                </div>

                <div>
                    <label className="block text-sm text-neutral-600 font-medium">
                        Category <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <CategorySelector categories={categories} value={form} onChange={onChange} />

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Difficulty Level</label>
                    <div className="grid gap-3 mt-3">
                        {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                            <label key={d} className="flex items-center gap-3 rounded-3xl border border-gray-200 p-3 cursor-pointer">
                                <input type="radio" name="difficulty" checked={form.difficulty === d} onChange={() => onChange({ ...form, difficulty: d })} />
                                <span className="text-sm">{d}</span>
                            </label>
                        ))}
                    </div>

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Language</label>
                    <select value={form.language || ''} onChange={(e) => onChange({ ...form, language: e.target.value })} className="rounded-3xl border border-gray-200 p-3 w-full mt-2 shadow-sm text-sm">
                        {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                    </select>

                    <div className="mt-6">
                        <PricingSection form={form} onChange={onChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
