import React from 'react';
import ResourceDetailsForm from '../shared/ResourceDetailsForm';

export default function StepFour({ form, onChange }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-900">Add details about your resource</h2>
            <div className="max-w-4xl">
                <ResourceDetailsForm form={form} onChange={onChange} />
            </div>
        </div>
    );
}
