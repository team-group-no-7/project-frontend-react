import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/creator/DashboardLayout';
import PageHeader from '../../components/contentStudio/shared/PageHeader';
import Stepper from '../../components/contentStudio/shared/Stepper';
import WizardFooter from '../../components/contentStudio/shared/WizardFooter';

import ArticleStepOne from '../../components/contentStudio/article/StepOne';
import ArticleStepTwo from '../../components/contentStudio/article/StepTwo';
import ArticleStepThree from '../../components/contentStudio/article/StepThree';
import ArticleStepFour from '../../components/contentStudio/article/StepFour';
import ArticleStepFive from '../../components/contentStudio/article/StepFive';

import PDFStepTwo from '../../components/contentStudio/pdf/StepTwo';
import PDFStepThree from '../../components/contentStudio/pdf/StepThree';
import PDFStepFour from '../../components/contentStudio/pdf/StepFour';
import PDFStepFive from '../../components/contentStudio/pdf/StepFive';
import PublishSuccess from '../../components/contentStudio/shared/PublishSuccess';

import { articleDummy } from '../../data/contentStudio/articleDummyData';
import { pdfDummy } from '../../data/contentStudio/pdfDummyData';

export default function ContentStudio() {
    const [currentStep, setCurrentStep] = useState(1);
    const [contentType, setContentType] = useState(null);
    const [selectedEditor, setSelectedEditor] = useState('rich');
    const [articleContent, setArticleContent] = useState({ ...articleDummy, body: '' });
    const [pdfForm, setPdfForm] = useState({ ...pdfDummy });
    const [uploadedFile, setUploadedFile] = useState(null);
    const [published, setPublished] = useState(false);

    const articleSteps = ['Type', 'Content', 'Details', 'Preview', 'Publish'];
    const pdfSteps = ['Type', 'Upload', 'Details', 'Preview', 'Publish'];
    const steps = contentType === 'pdf' ? pdfSteps : articleSteps;

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const type = searchParams.get('type');
        if (type === 'pdf') {
            setContentType('pdf');
            setCurrentStep(2);
        }
        if (type === 'article') {
            setContentType('article');
            setCurrentStep(2);
        }
    }, [searchParams]);

    function next() {
        if (!contentType) return;
        if (!canProceed()) return;
        if (currentStep === steps.length) {
            setPublished(true);
            return;
        }
        setCurrentStep((value) => Math.min(value + 1, steps.length));
    }

    function prev() {
        if (published) {
            setPublished(false);
            return;
        }
        setCurrentStep((value) => Math.max(value - 1, 1));
    }

    function saveDraft() {
        const draft = {
            contentType,
            currentStep,
            selectedEditor,
            articleContent,
            pdfForm,
            uploadedFile: uploadedFile ? { name: uploadedFile.name, size: uploadedFile.size, type: uploadedFile.type } : null,
            savedAt: new Date().toISOString(),
        };
        try {
            localStorage.setItem('contentStudioDraft', JSON.stringify(draft));
        } catch (error) {
            console.warn('Unable to save draft', error);
        }
        navigate('/my-resources');
    }

    function canProceed() {
        if (currentStep === 1) return !!contentType;
        if (contentType === 'article') {
            if (currentStep === 2) return !!selectedEditor;
            if (currentStep === 3) return !!articleContent.title?.trim() && !!articleContent.body?.replace(/<[^>]*>/g, '').trim();
            if (currentStep === 4) return !!articleContent.title && !!articleContent.description;
        }
        if (contentType === 'pdf') {
            if (currentStep === 2) return !!uploadedFile;
            if (currentStep === 3) return !!pdfForm.title && !!pdfForm.description;
        }
        return true;
    }

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <PageHeader title="Create New Resource" subtitle="Share your knowledge with thousands of learners." />
                    <div className="mt-2">
                        <button onClick={saveDraft} className="bg-white border rounded-lg px-4 py-2 text-sm shadow">
                            Save Draft
                        </button>
                    </div>
                </div>

                <Stepper steps={steps} current={currentStep} />

                <div className="mt-6">
                    {published ? (
                        <PublishSuccess title={contentType === 'pdf' ? pdfForm.title : articleContent.title} />
                    ) : (
                        <>
                            {currentStep === 1 && <ArticleStepOne contentType={contentType} setContentType={setContentType} />}
                            {contentType === 'article' && currentStep === 2 && <ArticleStepTwo selectedEditor={selectedEditor} setSelectedEditor={setSelectedEditor} />}
                            {contentType === 'article' && currentStep === 3 && <ArticleStepThree content={articleContent} setContent={setArticleContent} />}
                            {contentType === 'article' && currentStep === 4 && <ArticleStepFour form={articleContent} onChange={setArticleContent} />}
                            {contentType === 'article' && currentStep === 5 && <ArticleStepFive form={articleContent} />}

                            {contentType === 'pdf' && currentStep === 2 && <PDFStepTwo file={uploadedFile} onFile={(f) => setUploadedFile(f)} />}
                            {contentType === 'pdf' && currentStep === 3 && <PDFStepThree form={pdfForm} onChange={setPdfForm} />}
                            {contentType === 'pdf' && currentStep === 4 && <PDFStepFour file={uploadedFile} form={pdfForm} />}
                            {contentType === 'pdf' && currentStep === 5 && <PDFStepFive title={pdfForm.title} />}
                        </>
                    )}
                </div>

                {!published && (
                    <div className="mt-6">
                        <WizardFooter onPrev={prev} onNext={next} disableNext={!canProceed()} step={currentStep} total={steps.length} />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
