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
export default function EditModal({ editTitle, setEditTitle, editPrice, setEditPrice, onSave, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-4 relative animate-in fade-in zoom-in duration-200">

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer">
          <X size={18} />
        </button>

        <div>
          <h3 className="text-lg font-bold text-gray-900">Edit Resource Details</h3>
          <p className="text-xs text-gray-400">Update title and pricing metadata.</p>
        </div>

        <form onSubmit={onSave} className="space-y-4">

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Resource Title</label>
            <Input
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-xs border-gray-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Pricing (₹)</label>
            <Input
              type="number"
              min="0"
              required
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="text-xs border-gray-200 bg-slate-50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-500 hover:bg-slate-50 cursor-pointer">
              Cancel
            </button>
            <button type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs cursor-pointer">
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
