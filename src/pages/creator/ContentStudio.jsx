import React, { useState } from 'react';
import PageHeader from '../../components/contentStudio/shared/PageHeader';
import Stepper from '../../components/contentStudio/shared/Stepper';
import WizardFooter from '../../components/contentStudio/shared/WizardFooter';

import ArticleStepOne from '../../components/contentStudio/article/StepOne';
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
import api from '../../utils/api';

export default function ContentStudio({ profile, onChangePage, onUploadSuccess }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [contentType, setContentType] = useState(null);
    const [articleContent, setArticleContent] = useState({ ...articleDummy, body: '' });
    const [pdfForm, setPdfForm] = useState({ ...pdfDummy });
    const [uploadedFile, setUploadedFile] = useState(null);
    const [published, setPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const articleSteps = ['Type', 'Content', 'Details', 'Preview', 'Publish'];
    const pdfSteps = ['Type', 'Upload', 'Details', 'Preview', 'Publish'];
    const steps = contentType === 'pdf' ? pdfSteps : articleSteps;

    async function next() {
        if (!contentType) return;
        if (!canProceed()) return;
        if (currentStep === steps.length) {
            setIsSubmitting(true);
            const fileBlobUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : null;
            const payload = contentType === 'pdf' ? {
                title: pdfForm.title,
                description: pdfForm.description,
                previewText: pdfForm.previewText || pdfForm.description,
                contentBody: pdfForm.description,
                fileUrl: fileBlobUrl || "/uploads/sample-spring-boot.pdf",
                price: parseFloat(pdfForm.price) || 0,
                type: 'PDF',
                level: pdfForm.level || 'Beginner',
                tags: ["PDF", "Guide"],
                featured: false,
                trending: false,
                approvalStatus: 'APPROVED',
                creatorId: profile?.id || 101,
                categoryId: 1
            } : {
                title: articleContent.title,
                description: articleContent.description,
                previewText: articleContent.previewText || articleContent.title,
                contentBody: articleContent.body,
                price: parseFloat(articleContent.price) || 0,
                type: 'ARTICLE',
                level: 'Beginner',
                tags: ["Article", "Notes"],
                featured: false,
                trending: false,
                approvalStatus: 'APPROVED',
                creatorId: profile?.id || 101,
                categoryId: 1
            };

            try {
                let savedData;
                if (contentType === 'pdf' && uploadedFile) {
                    const formData = new FormData();
                    formData.append("file", uploadedFile);
                    formData.append("title", pdfForm.title);
                    formData.append("description", pdfForm.description || "");
                    formData.append("price", parseFloat(pdfForm.price) || 0);
                    formData.append("level", pdfForm.level || "Beginner");
                    formData.append("tags", "PDF,Guide");
                    formData.append("status", "PUBLISHED");
                    formData.append("creatorId", profile?.id || 101);
                    formData.append("categoryName", "General");

                    const res = await api.post("/api/creator/content/pdf", formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                    savedData = res.data?.data || res.data;
                } else {
                    const res = await api.post("/api/creator/content", payload);
                    savedData = res.data?.data || res.data;
                }

                const finalContent = {
                    ...payload,
                    id: savedData.id || Date.now(),
                    fileUrl: savedData.fileUrl || payload.fileUrl,
                    file_url: savedData.fileUrl || payload.fileUrl,
                    category_name: savedData.categoryName || "General",
                    creator_name: profile?.name || "Creator",
                    created_at: new Date().toISOString()
                };
                if (onUploadSuccess) onUploadSuccess(finalContent);
            } catch (err) {
                console.error("Content API submit error, using local fallback:", err);
                const fallbackContent = {
                    ...payload,
                    id: Date.now(),
                    category_name: "General",
                    creator_name: profile?.name || "Creator",
                    created_at: new Date().toISOString()
                };
                if (onUploadSuccess) onUploadSuccess(fallbackContent);
            } finally {
                setIsSubmitting(false);
                setPublished(true);
            }
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
        if (onChangePage) onChangePage('manage');
    }

    function canProceed() {
        if (currentStep === 1) return !!contentType;
        if (contentType === 'article') {
            if (currentStep === 2) return !!articleContent.title?.trim() && !!articleContent.body?.trim();
            if (currentStep === 3) return !!articleContent.title && !!articleContent.description;
        }
        if (contentType === 'pdf') {
            if (currentStep === 2) return !!uploadedFile;
            if (currentStep === 3) return !!pdfForm.title && !!pdfForm.description;
        }
        return true;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
                <PageHeader title="Create New Resource" subtitle="Share your knowledge with thousands of learners." />
                <div className="mt-2">
                    <button onClick={saveDraft} className="bg-white border rounded-lg px-4 py-2 text-sm shadow hover:bg-slate-50 transition cursor-pointer">
                        Save Draft
                    </button>
                </div>
            </div>

            <Stepper steps={steps} current={currentStep} />

            <div className="mt-6">
                {published ? (
                    <PublishSuccess 
                        title={contentType === 'pdf' ? pdfForm.title : articleContent.title} 
                        type={contentType}
                        price={contentType === 'pdf' ? pdfForm.price : articleContent.price}
                        onNavigate={(page) => {
                            if (page === 'content-studio') {
                                setPublished(false);
                                setContentType(null);
                                setCurrentStep(1);
                                setArticleContent({ ...articleDummy, body: '' });
                                setPdfForm({ ...pdfDummy });
                                setUploadedFile(null);
                            } else {
                                onChangePage(page);
                            }
                        }}
                    />
                ) : (
                    <>
                        {currentStep === 1 && <ArticleStepOne contentType={contentType} setContentType={setContentType} />}
                        {contentType === 'article' && currentStep === 2 && <ArticleStepThree content={articleContent} setContent={setArticleContent} />}
                        {contentType === 'article' && currentStep === 3 && <ArticleStepFour form={articleContent} onChange={setArticleContent} />}
                        {contentType === 'article' && currentStep === 4 && <ArticleStepFive form={articleContent} />}

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
    );
}
