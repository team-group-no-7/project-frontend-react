import React from 'react';
import UploadArea from '../shared/UploadArea';

export default function StepTwoPDF({ file, onFile }) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Upload PDF</h2>
            <UploadArea file={file} onFile={onFile} />
        </div>
    );
}
