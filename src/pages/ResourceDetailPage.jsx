import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, ChevronRight, FileText, Layers, Tag, User, ArrowLeft, ShieldCheck, Download, Award, Calendar, Globe } from "lucide-react";
import { CREATORS } from "@/data/mockData";
import api from "@/utils/api";

export default function ResourceDetailPage({ resourceItem: initialItem, profile, onBuyContent }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();

  const [dbItem, setDbItem] = useState(null);
  const [dbReviews, setDbReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const item = dbItem || initialItem || {
    id: routeId || 11,
    title: "Complete Java Spring Boot Monolith & Microservices",
    description: "Master Spring Boot backend architecture, REST APIs, Security, JPA, PostgreSQL integration with real-world enterprise code examples.",
    price: 599.00,
    category_id: 1,
    category_name: "Java",
    creator_id: 202,
    creator_name: "Rohan Verma",
    creator_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews_count: 142,
    learners_count: 1420,
    type: "Notes & Code",
    level: "Intermediate",
    tags: ["Java", "Spring Boot", "REST API", "PostgreSQL"],
    preview_text: "Chapter 1: Introduction to Spring Boot 3.x, Spring Core Annotations, Dependency Injection, and REST Controllers setup with Swagger docs.",
    created_at: "2026-06-10"
  };

  useEffect(() => {
    const targetId = routeId || initialItem?.id;
    if (!targetId) return;

    let isMounted = true;
    setIsLoading(true);

    api.get(`/api/public/resource/${targetId}`)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (data && data.id) {
          const formattedItem = {
            ...initialItem,
            ...data,
            id: data.id,
            title: data.title || initialItem?.title,
            description: data.description || initialItem?.description,
            price: data.price !== undefined ? data.price : (initialItem?.price || 0),
            category_name: data.categoryName || data.category || initialItem?.category_name || "General",
            creator_id: data.creatorId || initialItem?.creator_id || 202,
            creator_name: data.creatorName || initialItem?.creator_name || "Rohan Verma",
            creator_avatar: data.creatorAvatar || initialItem?.creator_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            rating: data.rating !== undefined ? data.rating : (initialItem?.rating || 4.8),
            reviews_count: data.reviewsCount !== undefined ? data.reviewsCount : (initialItem?.reviews_count || 0),
            learners_count: data.learnersCount !== undefined ? data.learnersCount : (initialItem?.learners_count || 0),
            type: data.type || initialItem?.type || "ARTICLE",
            level: data.level || initialItem?.level || "Intermediate",
            tags: Array.isArray(data.tags) ? data.tags : (initialItem?.tags || ["Java", "Spring Boot"]),
            preview_text: data.previewText || data.preview_text || initialItem?.preview_text
          };
          setDbItem(formattedItem);

          if (Array.isArray(data.reviews) && data.reviews.length > 0) {
            const formattedReviews = data.reviews.map(r => ({
              id: r.id,
              studentName: r.studentName || r.student_name || "Learner",
              avatar: r.avatar || r.avatarUrl || r.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
              rating: r.rating || 5,
              date: r.date || r.reviewDate || r.review_date || "Recently",
              comment: r.comment || r.reviewText || r.review_text || ""
            }));
            setDbReviews(formattedReviews);
          }
        }
      })
      .catch((err) => {
        console.warn("Resource detail database fetch notice:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [routeId, initialItem?.id]);

  const isCreatorOwner = profile && (
    profile.id === item.creator_id ||
    profile.id === item.creator?.id ||
    (profile.role === 'CREATOR' && (profile.name === item.creator_name || profile.name === item.creator))
  );

  const creatorProfile = CREATORS.find(c => c.id === item.creator_id) || CREATORS[0];
  const creatorReviews = (dbReviews && dbReviews.length > 0) ? dbReviews : (creatorProfile?.reviews || []);

  const handleBuy = () => {
    if (isCreatorOwner) {
      alert("As the creator of this resource, you cannot purchase your own content.");
      return;
    }
    if (onBuyContent) {
      onBuyContent(item);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4 space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-xs border border-gray-100">
          <button 
            onClick={() => navigate('/marketplace')}
            aria-label="Back to Catalog"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
          </button>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>LearnHub</span>
            <ChevronRight className="h-3 w-3" />
            <span>Marketplace</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-600 font-semibold">{item.category_name}</span>
          </div>
        </div>

        {/* Main Grid: Details + Purchase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Details (span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Content Panel */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {item.category_name}
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {item.title}
              </h1>

              {/* Stats & Creator Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-gray-400 font-normal">({item.reviews_count || 0} reviews)</span>
                </div>
                <span>•</span>
                <span>{item.learners_count?.toLocaleString("en-IN") || 0} learners enrolled</span>
              </div>

              {/* Creator details */}
              <div className="flex items-center gap-3 pt-2">
                {item.creator_avatar ? (
                  <img
                    src={item.creator_avatar}
                    alt={item.creator_name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-gray-200">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-400">Published by</p>
                  <p className="text-sm font-bold text-gray-900">{item.creator_name}</p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-gray-900">About this Resource</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Content Preview Block */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">Resource Preview</h2>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sneak Peek / Table of Contents</p>
                <p className="text-sm text-slate-700 font-mono leading-relaxed whitespace-pre-line">
                  {item.preview_text || "No preview chapter available for this resource."}
                </p>
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Layers,   label: "Skill Level",     value: item.level || "Beginner" },
                  { icon: FileText, label: "Resource Type",   value: item.type  || "PDF Document" },
                  { icon: Calendar, label: "Published Date",  value: item.created_at || "2026-06-10" },
                  { icon: Globe,    label: "Language",        value: "English" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Icon className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">{label}</p>
                      <p className="text-xs font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags list */}
              {item.tags && item.tags.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-gray-400 mb-2">Tags / Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                        <Tag className="h-3 w-3 text-slate-400" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <h2 className="text-lg font-bold text-gray-900">Learner Reviews</h2>
              </div>

              {creatorReviews.length > 0 ? (
                <div className="space-y-4 divide-y divide-gray-100">
                  {creatorReviews.map((rev, idx) => (
                    <div key={rev.id || idx} className={`pt-4 ${idx === 0 ? 'pt-0' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.avatar}
                            alt={rev.studentName}
                            className="h-8 w-8 rounded-full object-cover border border-gray-100"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800">{rev.studentName}</p>
                            <p className="text-[10px] text-gray-400">{rev.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No student reviews posted for this creator yet.</p>
              )}
            </div>

          </div>

          {/* Right Column: Sticky Purchase Panel */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Total Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {item.price === 0 ? "FREE" : `₹${item.price}`}
                  </span>
                  {item.price > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{(item.price * 1.5).toFixed(0)}
                    </span>
                  )}
                </div>
              </div>

              {isCreatorOwner ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                    You are the creator of this resource. Purchasing your own content is disabled.
                  </div>
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-xl bg-gray-300 py-3 text-sm font-bold text-gray-500 cursor-not-allowed"
                  >
                    Author Access (Owned)
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleBuy}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.99] transition-all cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              )}

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Secure checkout transaction</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Download className="h-4 w-4 text-indigo-500" />
                  <span>Instant downloads after payment</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span>Lifetime access to updates</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
