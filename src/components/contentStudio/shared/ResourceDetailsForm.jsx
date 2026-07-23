import React from 'react';
import CategorySelector from './CategorySelector';
import ThumbnailUploader from './ThumbnailUploader';
import PricingSection from './PricingSection';
import { categories } from '../../../data/contentStudio/categories';
import { languages } from '../../../data/contentStudio/languages';
import { tags as tagsList } from '../../../data/contentStudio/tags';

export default function ResourceDetailsForm({ form, onChange }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <label className="block text-sm text-neutral-600 font-medium">Title *</label>
                    <input value={form.title || ''} onChange={(e) => onChange({ ...form, title: e.target.value })} className="w-full rounded-3xl border border-gray-200 p-3 mt-2 shadow-sm" />

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Subtitle (Optional)</label>
                    <input value={form.subtitle || ''} onChange={(e) => onChange({ ...form, subtitle: e.target.value })} className="w-full rounded-3xl border border-gray-200 p-3 mt-2 shadow-sm" placeholder="Add a short subtitle" />

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Description *</label>
                    <textarea value={form.description || ''} onChange={(e) => onChange({ ...form, description: e.target.value })} className="w-full rounded-3xl border border-gray-200 p-3 mt-2 h-32 shadow-sm" />

                    <div className="mt-2 text-xs text-neutral-400">{(form.description || '').length}/500</div>

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Tags</label>
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {tagsList.slice(0, 6).map(t => (
                            <button key={t} className={`text-sm px-3 py-1 rounded-full border ${form.tags?.includes(t) ? 'bg-royal text-white border-royal' : 'bg-white text-neutral-700 border-gray-200'}`} onClick={() => {
                                const tags = new Set(form.tags || []);
                                tags.has(t) ? tags.delete(t) : tags.add(t);
                                onChange({ ...form, tags: Array.from(tags) });
                            }}>{t}</button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-neutral-600 font-medium">Category</label>
                    <CategorySelector categories={categories} value={form} onChange={onChange} />

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Difficulty Level</label>
                    <div className="grid gap-3 mt-3">
                        {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                            <label key={d} className="flex items-center gap-3 rounded-3xl border border-gray-200 p-3">
                                <input type="radio" name="difficulty" checked={form.difficulty === d} onChange={() => onChange({ ...form, difficulty: d })} />
                                <span className="text-sm">{d}</span>
                            </label>
                        ))}
                    </div>

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Language</label>
                    <select value={form.language || ''} onChange={(e) => onChange({ ...form, language: e.target.value })} className="rounded-3xl border border-gray-200 p-3 w-full mt-2 shadow-sm">
                        {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                    </select>

                    <label className="block text-sm text-neutral-600 font-medium mt-4">Visibility</label>
                    <select value={form.visibility || ''} onChange={(e) => onChange({ ...form, visibility: e.target.value })} className="rounded-3xl border border-gray-200 p-3 w-full mt-2 shadow-sm">
                        <option>Public</option>
                        <option>Private</option>
                    </select>

                    <div className="mt-6">
                        <label className="block text-sm text-neutral-600 font-medium">Thumbnail</label>
                        <ThumbnailUploader onChange={(file) => onChange({ ...form, thumbnail: file })} />
                    </div>

                    <div className="mt-6">
                        <PricingSection form={form} onChange={onChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
