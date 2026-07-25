import React from 'react';
import { Button } from '@base-ui/react';

export default function WizardFooter({ onPrev, onNext, disableNext, step, total }) {
    return (
        <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onPrev}
                    disabled={step === 1}
                    className={`px-4 py-2 rounded-lg border bg-white text-neutral-700 ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
                >
                    Previous
                </button>

            </div>

            <div className="flex items-center gap-3">
                <div className="text-sm text-neutral-500">Step {step} of {total}</div>
                <button
                    onClick={onNext}
                    disabled={disableNext}
                    className={`px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#4f46e5] to-[#2563eb] shadow-md ${disableNext ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-105'}`}
                >
                    {step === total ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
}
