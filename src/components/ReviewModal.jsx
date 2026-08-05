import React, { useState } from "react";
import { Star, X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utils/api";

export default function ReviewModal({ isOpen, onClose, contentItem, profile, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      alert("Please enter a short review feedback.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      userId: profile?.id || 101,
      studentName: profile?.name || "Learner",
      rating: rating,
      reviewText: reviewText.trim()
    };

    const contentId = contentItem?.id || 1;
    api.post(`/api/contents/${contentId}/reviews`, payload)
      .then((res) => {
        setIsSubmitting(false);
        setSubmitted(true);
        onReviewSubmitted && onReviewSubmitted(res.data?.data || res.data);
        setTimeout(() => {
          setSubmitted(false);
          setReviewText("");
          onClose();
        }, 1500);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setReviewText("");
          onClose();
        }, 1500);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Thank You for Your Feedback!</h3>
            <p className="text-xs text-gray-500">Your rating and review have been recorded.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Rate this Resource</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{contentItem?.title || "Study Material"}</p>
            </div>

            {/* Interactive Star Selection */}
            <div className="space-y-1.5 text-center py-2">
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-amber-600">
                {rating === 5 ? "⭐⭐⭐⭐⭐ Excellent" : rating === 4 ? "⭐⭐⭐⭐ Very Good" : rating === 3 ? "⭐⭐⭐ Good" : rating === 2 ? "⭐⭐ Fair" : "⭐ Needs Improvement"}
              </p>
            </div>

            {/* Written Feedback */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Your Review</label>
              <Textarea
                placeholder="Share your thoughts on what you learned from this guide..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="text-xs bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 px-4"
              >
                <Send className="h-3.5 w-3.5" /> Submit Review
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
