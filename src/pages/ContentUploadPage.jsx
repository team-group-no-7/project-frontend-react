import React, { useState } from "react";
import { UploadCloud, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/data/mockData";

/**
 * ContentUploadPage Component (Module 2 - Item 6: Content Upload Form Page)
 * Developed by: Team Member (CDAC PGCP-AC Project)
 * 
 * Simple beginner-friendly form for creators to publish new notes/guides.
 */
export default function ContentUploadPage({ onUploadSuccess, onCancel }) {
  // Form State
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("1"); // Default Java
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("299");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Form Validation
    if (!title.trim()) {
      setErrorMessage("Please enter a content title.");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please enter a description.");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Please select a PDF file to upload.");
      return;
    }

    // Construct new object
    const newContent = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      price: isFree ? 0 : parseFloat(price) || 0,
      category_id: parseInt(categoryId),
      category_name: CATEGORIES.find(c => c.id === parseInt(categoryId))?.name || "General",
      creator_name: "Arjun Mehta",
      rating: 5.0,
      learners_count: 1,
      fileName: selectedFile.name
    };

    onUploadSuccess && onUploadSuccess(newContent);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <Button variant="outline" size="sm" onClick={onCancel} className="gap-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-indigo-600" /> Publish Learning Content
        </h1>
      </div>

      {/* Upload Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
        
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Content Title *
          </label>
          <Input
            type="text"
            placeholder="e.g. Master Spring Boot Microservices Guide"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xs h-9"
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Category *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full h-9 px-3 text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
          >
            {CATEGORIES.filter(c => c.id !== 0).map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Description *
          </label>
          <textarea
            rows={4}
            placeholder="Describe what learners will get from this note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none"
          />
        </div>

        {/* Pricing Options */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Pricing Mode
            </label>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                <input
                  type="radio"
                  name="priceMode"
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                />
                Paid
              </label>
              <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                <input
                  type="radio"
                  name="priceMode"
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                />
                Free
              </label>
            </div>
          </div>

          {!isFree && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Price (INR ₹) *
              </label>
              <Input
                type="number"
                placeholder="299"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="text-xs h-9"
              />
            </div>
          )}
        </div>

        {/* File Picker */}
        <div className="space-y-1 pt-2">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Upload PDF File *
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-xs">
            Cancel
          </Button>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5">
            <CheckCircle className="h-4 w-4" /> Publish Now
          </Button>
        </div>

      </form>

    </div>
  );
}
