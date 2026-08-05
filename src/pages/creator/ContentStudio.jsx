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

    const articleSteps = ['Type', 'Content', 'Details', 'Preview'];
    const pdfSteps = ['Type', 'Upload', 'Details', 'Preview'];
    const steps = contentType === 'pdf' ? pdfSteps : articleSteps;

    async function next() {
        if (!contentType) return;
        if (!canProceed()) return;
        if (currentStep === steps.length) {
            setIsSubmitting(true);
            const fileBlobUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : null;
            const catName = (contentType === 'pdf' ? pdfForm.categoryName || pdfForm.category : articleContent.categoryName || articleContent.category) || 'General';

            const payload = contentType === 'pdf' ? {
                title: pdfForm.title,
                description: pdfForm.description,
                previewText: pdfForm.previewText || pdfForm.description,
                contentBody: pdfForm.description,
                fileUrl: fileBlobUrl || "/uploads/sample-spring-boot.pdf",
                price: parseFloat(pdfForm.price) || 0,
                type: 'PDF',
                level: pdfForm.level || 'Beginner',
                tags: Array.isArray(pdfForm.tags) ? pdfForm.tags.join(",") : (pdfForm.tags || "PDF,Guide"),
                featured: false,
                trending: false,
                approvalStatus: 'APPROVED',
                creatorId: profile?.id || 101,
                categoryName: catName
            } : {
                title: articleContent.title,
                description: articleContent.description,
                previewText: articleContent.previewText || articleContent.title,
                contentBody: articleContent.body,
                price: parseFloat(articleContent.price) || 0,
                type: 'ARTICLE',
                level: articleContent.level || 'Beginner',
                tags: Array.isArray(articleContent.tags) ? articleContent.tags.join(",") : (articleContent.tags || "Article,Notes"),
                featured: false,
                trending: false,
                approvalStatus: 'APPROVED',
                creatorId: profile?.id || 101,
                categoryName: catName
            };

            try {
                let savedData;
                if (contentType === 'pdf' && uploadedFile) {
                    const formData = new FormData();
                    formData.append("file", uploadedFile);
                    if (pdfForm.thumbnail instanceof File) {
                        formData.append("thumbnail", pdfForm.thumbnail);
                    }
                    formData.append("title", pdfForm.title);
                    formData.append("description", pdfForm.description || "");
                    formData.append("price", parseFloat(pdfForm.price) || 0);
                    formData.append("level", pdfForm.level || "Beginner");
                    formData.append("tags", Array.isArray(pdfForm.tags) ? pdfForm.tags.join(",") : (pdfForm.tags || "PDF,Guide"));
                    formData.append("status", "PUBLISHED");
                    formData.append("creatorId", profile?.id || 101);
                    formData.append("categoryName", catName);

                    const res = await api.post("/api/creator/content/pdf", formData, {
                        headers: { "Content-Type": undefined }
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
                    contentBody: savedData.contentBody || payload.contentBody,
                    category_name: savedData.categoryName || catName,
                    creator_name: profile?.name || "Creator",
                    created_at: new Date().toISOString()
                };
                if (onUploadSuccess) onUploadSuccess(finalContent);
            } catch (err) {
                console.error("Content API submit error:", err);
                alert("Failed to submit content to database. Please check all fields.");
                return;
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
            if (currentStep === 2) return !!articleContent.body?.trim();
            if (currentStep === 3) return !!articleContent.title?.trim() && !!articleContent.description?.trim();
        }
        if (contentType === 'pdf') {
            if (currentStep === 2) return !!uploadedFile;
            if (currentStep === 3) return !!pdfForm.title?.trim() && !!pdfForm.description?.trim();
        }
        return true;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
                <PageHeader title="Create New Resource" subtitle="Share your knowledge with thousands of learners." />
            </div>

            <Stepper steps={steps} current={currentStep} />

            <div className="mt-6">
                {published ? (
                    <PublishSuccess 
                        title={contentType === 'pdf' ? pdfForm.title : articleContent.title} 
                        type={contentType}
                        category={contentType === 'pdf' ? (pdfForm.categoryName || pdfForm.category) : (articleContent.categoryName || articleContent.category)}
                        description={contentType === 'pdf' ? pdfForm.description : articleContent.description}
                        price={contentType === 'pdf' ? pdfForm.price : articleContent.price}
                        difficulty={contentType === 'pdf' ? pdfForm.level : articleContent.level}
                        onNavigate={(page) => {
                            if (page === 'content-studio') {
                                setPublished(false);
                                setContentType(null);
                                setCurrentStep(1);
                                setArticleContent({ ...articleDummy, body: '' });
                                setPdfForm({ ...pdfDummy });
                                setUploadedFile(null);
                            } else if (onChangePage) {
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
