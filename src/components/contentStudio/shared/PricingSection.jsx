import React from 'react';
import { pricingOptions } from '../../../data/contentStudio/pricingOptions';

export default function PricingSection({ form, onChange }) {
    return (
        <div>
            <div className="flex gap-4">
                {pricingOptions.map((p) => (
                    <label key={p.id} className="flex items-center gap-2">
                        <input type="radio" name="pricing" checked={form.pricing === p.id} onChange={() => onChange({ ...form, pricing: p.id })} />
                        <span className="text-sm">{p.label}</span>
                    </label>
                ))}
            </div>
            {form.pricing === 'paid' && (
                <div className="mt-3">
                    <input type="number" min="0" value={form.price || ''} onChange={(e) => onChange({ ...form, price: Math.max(0, Number(e.target.value)) })} className="rounded border p-2 w-48" placeholder="Price (₹)" />
                </div>
            )}
        </div>
    );
}
