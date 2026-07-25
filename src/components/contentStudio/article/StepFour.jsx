import React from 'react';
import ResourceDetailsForm from '../shared/ResourceDetailsForm';
import PreviewCard from '../shared/PreviewCard';

export default function StepFour({ form, onChange }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Add details about your resource</h2>
            <div className="grid xl:grid-cols-[1.6fr_0.9fr] gap-6">
                <ResourceDetailsForm form={form} onChange={onChange} />
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h3 className="font-semibold text-base mb-4">Live preview</h3>
                    <PreviewCard data={form} />
                </div>
            </div>
        </div>
    );
}
