import React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * EditModal — Overlay form to edit a resource's title and price.
 * Extracted from ContentManagementGrid to keep the parent file readable.
 *
 * Props:
 *  - editTitle, setEditTitle
 *  - editPrice, setEditPrice
 *  - onSave    : form submit handler (receives event)
 *  - onClose   : close/cancel handler
 */
export default function EditModal({ formData, setFormData, onSave, onClose, isLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-4 relative animate-in fade-in zoom-in duration-200">

        {/* Close button */}
        <button onClick={onClose} disabled={isLoading} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer">
          <X size={18} />
        </button>

        <div>
          <h3 className="text-lg font-bold text-gray-900">Edit Resource Details</h3>
          <p className="text-xs text-gray-400">Update course content, pricing, and metadata.</p>
        </div>

        <form onSubmit={onSave} className="space-y-3">

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Resource Title *</label>
            <Input
              type="text"
              required
              value={formData?.title || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="text-xs border-gray-200 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Pricing (₹)</label>
              <Input
                type="number"
                min="0"
                required
                value={formData?.price !== undefined ? formData.price : 0}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="text-xs border-gray-200 bg-slate-50"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Skill Level</label>
              <select
                value={formData?.level || "Beginner"}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                className="w-full h-8 px-2 text-xs border border-gray-200 bg-slate-50 rounded-lg text-gray-700"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Description</label>
            <textarea
              rows={2}
              value={formData?.description || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-slate-50 text-gray-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Tags (comma separated)</label>
            <Input
              type="text"
              placeholder="Java, Spring Boot, React"
              value={formData?.tags || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="text-xs border-gray-200 bg-slate-50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-500 hover:bg-slate-50 cursor-pointer disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs cursor-pointer disabled:opacity-50">
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
