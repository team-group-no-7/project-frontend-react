import React from 'react';
import PublishSuccess from '../shared/PublishSuccess';

export default function StepFivePDF({ title }) {
    return <PublishSuccess title={title || 'Your PDF resource'} />;
}
