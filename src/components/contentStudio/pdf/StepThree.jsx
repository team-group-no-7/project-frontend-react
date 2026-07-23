import React from 'react';
import ResourceDetailsForm from '../shared/ResourceDetailsForm';

export default function StepThreePDF({ form, onChange }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Add details about your PDF</h2>
            <ResourceDetailsForm form={form} onChange={onChange} />
        </div>
    );
}
