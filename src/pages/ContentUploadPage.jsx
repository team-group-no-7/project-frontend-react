import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle, ArrowLeft, DollarSign, Tag, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock categories dataset
import { CATEGORIES } from "@/data/mockData";

/**
 * ContentUploadPage Component (Module 2 - Part 2: Content Upload Form Page)
 * Dedicated workspace for Creators to upload notes, cheat sheets, or guides.
 * 
 * Props:
 *  - onUploadSuccess: Callback function called when content is published
 *  - onCancel: Callback function to return back to catalog/dashboard
 */
export default function ContentUploadPage({ onUploadSuccess, onCancel }) {
  // Form input states
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("1"); // Default Java
  const [description, setDescription] = useState("");
  const [priceType, setPriceType] = useState("paid"); // 'free' vs 'paid'
  const [price, setPrice] = useState("299");
  const [type, setType] = useState("Notes & PDF");
  const [previewText, setPreviewText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

    // Validation 1: Title check
    if (!title.trim()) {
      setErrorMsg("Please enter a content title.");
      return;
    }

    // Validation 2: Description check
    if (!description.trim() || description.length < 10) {
      setErrorMsg("Description must be at least 10 characters long.");
      return;
    }

    // Validation 3: File check
    if (!selectedFile) {
      setErrorMsg("Please select a PDF or document file to upload.");
      return;
    }

    // Validation 4: Price check if paid
    const numericPrice = priceType === "free" ? 0 : parseFloat(price);
    if (priceType === "paid" && (isNaN(numericPrice) || numericPrice <= 0)) {
      setErrorMsg("Please enter a valid price greater than ₹0.");
      return;
    }

    // Simulate API upload delay
    setIsSubmitting(true);

    setTimeout(() => {
      // Construct new content object mapping to CONTENTS table schema
      const newContent = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        price: numericPrice,
        category_id: parseInt(categoryId),
        category_name: CATEGORIES.find(c => c.id === parseInt(categoryId))?.name || "General",
        creator_name: "Arjun Mehta", // Current user
        rating: 5.0, // Initial rating
        learners_count: 0,
        type: type,
        preview_text: previewText.trim() || description.substring(0, 80) + "...",
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
        uploaded_at: new Date().toISOString()
      };

      setIsSubmitting(false);
      if (onUploadSuccess) {
        onUploadSuccess(newContent);
      }
    }, 1000);
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
            Creator Workspace
          </Badge>
        </div>

        {/* Upload Form Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6">
            <CardTitle className="text-xl font-extrabold flex items-center gap-2">
              <UploadCloud className="h-6 w-6 text-amber-300" /> Publish New Learning Resource
            </CardTitle>
            <CardDescription className="text-indigo-200 text-xs">
              Fill in the metadata to make your study notes, cheat sheets, or code accessible to learners.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            
            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Title Input */}
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

              {/* 2. Category & Content Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Category Dropdown */}
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

                {/* Content Type */}
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
                    <option value="Code Repository">Code Walkthrough & Repository</option>
                    <option value="Interactive Guide">Interactive Guide</option>
                  </select>
                </div>

              </div>

              {/* 3. Description Textarea */}
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

              {/* 4. Pricing Model */}
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

              {/* 5. Multipart File Upload Section */}
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
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Click to select PDF or document</p>
                        <p className="text-[11px] text-gray-400">Supports PDF, DOC, DOCX up to 25MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* 6. Sample Preview Snippet */}
              <div className="space-y-2">
                <Label htmlFor="c-preview" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5 text-indigo-500" /> Sample Preview Snippet (Optional)
                </Label>
                <Input
                  id="c-preview"
                  placeholder="e.g. Chapter 1: Introduction to annotations and config setup..."
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="bg-gray-50/50 dark:bg-black/20 text-xs"
                />
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
