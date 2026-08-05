import React from 'react';

function Step({ idx, label, active, done }) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${done ? 'bg-royal text-white shadow-[0_6px_18px_rgba(37,99,235,0.18)]' : active ? 'bg-white border-2 border-royal text-royal' : 'bg-white border border-gray-200 text-neutral-500'
                    }`}
            >
                {done ? '✓' : idx}
            </div>
            <div className="text-sm text-neutral-600">{label}</div>
        </div>
    );
}

export default function Stepper({ steps = [], current = 1 }) {
    return (
        <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto py-4 max-w-4xl mx-auto">
            {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <Step idx={i + 1} label={s} active={current === i + 1} done={current > i + 1} />
                    {i < steps.length - 1 && <div className="w-8 sm:w-12 h-0.5 bg-gray-200" />}
                </div>
            ))}
        </div>
    );
}
