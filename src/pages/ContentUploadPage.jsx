import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle, ArrowLeft, DollarSign, Tag, Info, Edit3, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock categories dataset
import { CATEGORIES } from "@/data/mockData";

/**
 * ContentUploadPage Component (Module 3: Unified Content Studio)
 * Multi-format publishing workspace supporting both PDF file uploads & Inline Rich Text / Markdown articles.
 */
export default function ContentUploadPage({ onUploadSuccess, onCancel }) {
  // Publishing Mode State: 'PDF' vs 'ARTICLE'
  const [publishingMode, setPublishingMode] = useState("PDF");
  
  // Form input states
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("1"); // Default Java
  const [description, setDescription] = useState("");
  const [priceType, setPriceType] = useState("paid"); // 'free' vs 'paid'
  const [price, setPrice] = useState("299");
  const [type, setType] = useState("Notes & PDF");
  const [previewText, setPreviewText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Markdown Article content state
  const [articleContent, setArticleContent] = useState("# Getting Started with Spring Boot\n\nWrite your technical guide here using Markdown syntax...\n\n### Code Example:\n```java\n@RestController\npublic class HelloController {\n}\n```");
  const [articleTab, setArticleTab] = useState("WRITE"); // 'WRITE' vs 'PREVIEW'

  // UI feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file picker selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Form submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter a content title.");
      return;
    }

    if (!description.trim() || description.length < 10) {
      setErrorMsg("Description must be at least 10 characters long.");
      return;
    }

    if (publishingMode === "PDF" && !selectedFile) {
      setErrorMsg("Please select a PDF or document file to upload.");
      return;
    }

    if (publishingMode === "ARTICLE" && !articleContent.trim()) {
      setErrorMsg("Please write some article content before publishing.");
      return;
    }

    const numericPrice = priceType === "free" ? 0 : parseFloat(price);
    if (priceType === "paid" && (isNaN(numericPrice) || numericPrice <= 0)) {
      setErrorMsg("Please enter a valid price greater than ₹0.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newContent = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        price: numericPrice,
        category_id: parseInt(categoryId),
        category_name: CATEGORIES.find(c => c.id === parseInt(categoryId))?.name || "General",
        creator_name: "Arjun Mehta",
        rating: 5.0,
        learners_count: 0,
        type: publishingMode === "ARTICLE" ? "Markdown Article" : type,
        preview_text: previewText.trim() || description.substring(0, 80) + "...",
        fileName: publishingMode === "PDF" ? selectedFile?.name : "article.md",
        articleContent: publishingMode === "ARTICLE" ? articleContent : null,
        uploaded_at: new Date().toISOString()
      };

      setIsSubmitting(false);
      if (onUploadSuccess) {
        onUploadSuccess(newContent);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-10 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top Header & Back Button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950/30 dark:text-amber-400">
            Content Studio Workspace
          </Badge>
        </div>

        {/* Upload Form Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6">
            <CardTitle className="text-xl font-extrabold flex items-center gap-2">
              <UploadCloud className="h-6 w-6 text-amber-300" /> Publish Learning Content
            </CardTitle>
            <CardDescription className="text-indigo-200 text-xs">
              Choose to upload a PDF document or write an inline Markdown article.
            </CardDescription>

            {/* Content Format Toggle Tabs */}
            <div className="flex bg-white/10 p-1 rounded-xl border border-white/10 w-fit mt-3">
              <button
                type="button"
                onClick={() => setPublishingMode("PDF")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  publishingMode === "PDF"
                    ? "bg-white text-indigo-900 shadow-sm"
                    : "text-indigo-200 hover:text-white"
                }`}
              >
                📄 Upload PDF / Document
              </button>
              <button
                type="button"
                onClick={() => setPublishingMode("ARTICLE")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  publishingMode === "ARTICLE"
                    ? "bg-white text-indigo-900 shadow-sm"
                    : "text-indigo-200 hover:text-white"
                }`}
              >
                ✍️ Write Article (Markdown)
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="c-title" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Resource Title *
                </Label>
                <Input
                  id="c-title"
                  placeholder="e.g. Master Spring Boot REST APIs & JPA Hibernate"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50/50 dark:bg-black/20 text-sm"
                />
              </div>

              {/* Category & Content Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="c-category" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    Category *
                  </Label>
                  <select
                    id="c-category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 text-sm rounded-md px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c.id !== 0).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="c-type" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    Resource Type
                  </Label>
                  <select
                    id="c-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 text-sm rounded-md px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Notes & PDF">Notes & PDF Document</option>
                    <option value="Cheat Sheet PDF">Cheat Sheet PDF</option>
                    <option value="Markdown Article">Markdown Article</option>
                    <option value="Code Repository">Code Walkthrough & Repository</option>
                  </select>
                </div>
              </div>

              {/* Format Specific Input (PDF Upload vs Markdown Editor) */}
              {publishingMode === "PDF" ? (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    Upload PDF Document / File *
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 p-6 rounded-xl text-center cursor-pointer transition bg-gray-50/30 dark:bg-black/10">
                    <input
                      type="file"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                      <FileText className="h-8 w-8 text-indigo-500 mx-auto" />
                      {selectedFile ? (
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Click to select PDF file</p>
                          <p className="text-[11px] text-gray-400">Supports PDF, DOCX up to 25MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              ) : (
                /* Markdown Article Editor */
                <div className="space-y-2 border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-black/20">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                    <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <Edit3 className="h-3.5 w-3.5 text-indigo-600" /> Article Content Editor (Markdown)
                    </Label>
                    <div className="flex bg-gray-200 dark:bg-gray-800 p-0.5 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setArticleTab("WRITE")}
                        className={`px-2.5 py-1 rounded-md font-bold ${articleTab === "WRITE" ? "bg-white dark:bg-black text-indigo-600" : "text-gray-500"}`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setArticleTab("PREVIEW")}
                        className={`px-2.5 py-1 rounded-md font-bold ${articleTab === "PREVIEW" ? "bg-white dark:bg-black text-indigo-600" : "text-gray-500"}`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  {articleTab === "WRITE" ? (
                    <textarea
                      rows={8}
                      value={articleContent}
                      onChange={(e) => setArticleContent(e.target.value)}
                      placeholder="# Title\n\nWrite your technical article body here..."
                      className="w-full bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-xs font-mono text-gray-900 dark:text-white focus:outline-none"
                    />
                  ) : (
                    <div className="p-4 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-lg min-h-[160px] text-xs space-y-2">
                      <p className="font-bold text-gray-500 text-[10px] uppercase">Markdown Preview:</p>
                      <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 dark:text-gray-200">
                        {articleContent}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="c-desc" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Full Description *
                </Label>
                <textarea
                  id="c-desc"
                  rows={3}
                  placeholder="Provide an overview of what students will learn from this content..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 text-sm rounded-md p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Pricing */}
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-800">
                <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-emerald-500" /> Pricing Model
                </Label>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="pricing"
                      value="paid"
                      checked={priceType === "paid"}
                      onChange={() => setPriceType("paid")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    Paid Resource
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="pricing"
                      value="free"
                      checked={priceType === "free"}
                      onChange={() => setPriceType("free")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    Free Resource (₹0)
                  </label>
                </div>

                {priceType === "paid" && (
                  <div className="pt-2 max-w-xs space-y-1">
                    <Label htmlFor="c-price" className="text-xs text-gray-500">Price in INR (₹)</Label>
                    <Input
                      id="c-price"
                      type="number"
                      min="1"
                      placeholder="299"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-white dark:bg-black/40 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button type="button" variant="ghost" onClick={onCancel} className="text-xs">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 gap-2"
                >
                  {isSubmitting ? "Publishing..." : "Publish to Marketplace"}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
