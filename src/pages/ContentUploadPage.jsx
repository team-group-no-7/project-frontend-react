import React, { useState } from "react";
import { UploadCloud, FileText, ArrowLeft, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/data/mockData";

/**
 * ContentUploadPage Component (Module 3: Unified Content Studio)
 * Upload form for creators to submit PDF notes and cheat sheets.
 */
export default function ContentUploadPage({ onUploadSuccess, onCancel }) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("1"); // Default Java
  const [description, setDescription] = useState("");
  const [priceType, setPriceType] = useState("paid"); // 'free' vs 'paid'
  const [price, setPrice] = useState("299");
  const [selectedFile, setSelectedFile] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Form inputs validation checks
    if (!title.trim()) {
      setErrorMsg("Please enter a content title.");
      return;
    }
    if (!description.trim() || description.length < 10) {
      setErrorMsg("Description must be at least 10 characters long.");
      return;
    }
    if (!selectedFile) {
      setErrorMsg("Please select a PDF document file.");
      return;
    }

    const numericPrice = priceType === "free" ? 0 : parseFloat(price);
    if (priceType === "paid" && (isNaN(numericPrice) || numericPrice <= 0)) {
      setErrorMsg("Please enter a valid price greater than ₹0.");
      return;
    }

    setIsSubmitting(true);

    // Prepare Spring Boot standard Multipart Form Data
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("price", numericPrice);
    formData.append("categoryId", categoryId);

    try {
      await api.uploadContent(formData);
      onUploadSuccess({
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        price: numericPrice,
        category_id: parseInt(categoryId),
        category_name: CATEGORIES.find(c => c.id === parseInt(categoryId))?.name || "General",
        creator_name: "Arjun Mehta",
        rating: 5.0,
        learners_count: 0,
        fileName: selectedFile.name,
        uploaded_at: new Date().toISOString()
      });
    } catch (err) {
      setErrorMsg("Failed to upload content. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header & Back navigate */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel} className="gap-2 text-xs text-gray-600 dark:text-gray-400">
            <ArrowLeft className="h-4 w-4" /> Cancel Publishing
          </Button>
          <Badge className="bg-amber-50 text-amber-600 border border-amber-300">
            Content Studio Workspace
          </Badge>
        </div>

        {/* Upload Form Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6">
            <CardTitle className="text-lg font-extrabold flex items-center gap-2">
              <UploadCloud className="h-6 w-6 text-amber-300" /> Publish Learning Content
            </CardTitle>
            <CardDescription className="text-indigo-200 text-xs">
              Fill in details to release notes or guides to the marketplace catalog.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Title Input */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">Content Title *</Label>
                <Input placeholder="e.g. Java Spring Boot microservices cheatsheet" value={title} onChange={(e) => setTitle(e.target.value)} className="text-xs" />
              </div>

              {/* Category Dropdown Selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">Category *</Label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-gray-50 border border-gray-200 dark:bg-black/20 text-xs rounded-lg p-2 text-gray-900 dark:text-white">
                  {CATEGORIES.filter(c => c.id !== 0).map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Description Input */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">Brief Description *</Label>
                <textarea rows={3} placeholder="Provide overview..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 text-xs rounded-lg dark:bg-black/20 text-gray-900 dark:text-white focus:outline-none" />
              </div>

              {/* PDF File Uploader */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">Upload PDF notes *</Label>
                <div className="border-2 border-dashed border-gray-300 p-5 rounded-xl text-center cursor-pointer hover:border-indigo-500 transition">
                  <input type="file" id="file-upload" accept=".pdf" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="file-upload" className="cursor-pointer block space-y-1">
                    <FileText className="h-7 w-7 text-indigo-500 mx-auto" />
                    {selectedFile ? (
                      <span className="text-xs font-bold block">{selectedFile.name}</span>
                    ) : (
                      <span className="text-xs text-indigo-600 block">Click to select PDF document</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 rounded-xl space-y-3">
                <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-emerald-500" /> Pricing Options
                </Label>
                <div className="flex items-center gap-6 text-xs font-semibold">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="pricing" checked={priceType === "paid"} onChange={() => setPriceType("paid")} />
                    Paid
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="pricing" checked={priceType === "free"} onChange={() => setPriceType("free")} />
                    Free
                  </label>
                </div>
                {priceType === "paid" && (
                  <div className="pt-2 max-w-[200px]">
                    <Input type="number" placeholder="299" value={price} onChange={(e) => setPrice(e.target.value)} className="text-xs" />
                  </div>
                )}
              </div>

              {/* Submit triggers */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={onCancel} className="text-xs">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5">
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
