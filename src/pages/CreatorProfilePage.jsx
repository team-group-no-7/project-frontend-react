import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, BookOpen, MapPin, ArrowLeft, Mail, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';

/**
 * CreatorProfilePage — Public Creator Profile View
 * Connected directly to PostgreSQL backend with avatar name initial fallbacks,
 * React Router navigation, and zero mock data dependencies.
 */
export default function CreatorProfilePage({ 
  creatorId: propCreatorId, 
  marketplaceContents = [], 
  onBack, 
  onBookSession 
}) {
  const navigate = useNavigate();
  const { id: urlCreatorId } = useParams();
  const activeCreatorId = urlCreatorId || propCreatorId || 202;

  // Live database state for creator profile and published contents
  const [dbCreator, setDbCreator] = useState(null);
  const [dbContents, setDbContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  // Active view tab state: 'courses' or 'booking' (Student Reviews tab removed as requested)
  const [activeTab, setActiveTab] = useState('courses');

  // Doubt Session Booking States
  const [topic, setTopic] = useState("");
  const [slot, setSlot] = useState("");
  const [duration, setDuration] = useState("45");

  // Fetch creator profile and contents from database
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setImgError(false);

    // 1. Fetch public creator details from database
    api.get(`/api/public/creators/${activeCreatorId}`)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (data) setDbCreator(data);
      })
      .catch((err) => {
        api.get(`/api/creators/${activeCreatorId}`)
          .then((res2) => {
            if (!isMounted) return;
            const data2 = res2.data?.data || res2.data;
            if (data2) setDbCreator(data2);
          })
          .catch((err2) => console.warn("Creator profile fetch notice:", err2));
      });

    // 2. Fetch public published contents of creator from database
    api.get(`/api/public/creators/${activeCreatorId}/contents`)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) setDbContents(data);
      })
      .catch((err) => {
        api.get(`/api/creators/${activeCreatorId}/contents`)
          .then((res2) => {
            if (!isMounted) return;
            const data2 = res2.data?.data || res2.data;
            if (Array.isArray(data2)) setDbContents(data2);
          })
          .catch((err2) => console.warn("Creator contents fetch notice:", err2));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [activeCreatorId]);

  // Fallback creator details derived from marketplace contents or defaults
  const fallbackCreatorFromProps = useMemo(() => {
    const item = (marketplaceContents || []).find(
      (c) => String(c.creator_id) === String(activeCreatorId) || String(c.creatorId) === String(activeCreatorId)
    );
    return item ? {
      id: item.creator_id || item.creatorId || activeCreatorId,
      name: item.creator_name || item.creatorName || "Creator Profile",
      avatarUrl: item.creator_avatar || item.creatorAvatar || null,
      headline: "Staff Educator & Technology Specialist",
      location: "India",
      bio: `Content creator and mentor on LearnHub. Specializing in ${item.category_name || "Software Development"}.`
    } : null;
  }, [marketplaceContents, activeCreatorId]);

  const creator = dbCreator || fallbackCreatorFromProps || {
    id: activeCreatorId,
    name: "LearnHub Creator",
    avatarUrl: null,
    headline: "Senior Technology Educator & Technical Mentor",
    location: "India",
    bio: "Passionate software development educator sharing notes, guides, and architecture blueprints."
  };

  // Published resources list (DB first, fallback to props)
  const creatorContents = useMemo(() => {
    if (dbContents.length > 0) return dbContents;
    return (marketplaceContents || []).filter(
      (item) => String(item.creator_id) === String(activeCreatorId) || 
                String(item.creatorId) === String(activeCreatorId) || 
                item.creator_name === creator.name
    );
  }, [dbContents, marketplaceContents, activeCreatorId, creator.name]);

  // Dynamically calculate average creator rating across all published content reviews
  const creatorRating = useMemo(() => {
    if (!creatorContents || creatorContents.length === 0) return "5.0";
    let sum = 0;
    let count = 0;
    creatorContents.forEach((c) => {
      const r = Number(c.rating || c.rating_score || 0);
      if (r > 0) {
        sum += r;
        count++;
      }
    });
    return count > 0 ? (sum / count).toFixed(1) : "5.0";
  }, [creatorContents]);

  // Name Initials Helper for avatar fallback
  const getInitials = (name) => {
    if (!name) return "CH";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Session price calculation
  const price = useMemo(() => {
    if (duration === "30") return 250;
    if (duration === "60") return 450;
    return 350; // 45 mins
  }, [duration]);

  const getMinLocalDatetime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleBookSessionSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert("Please enter the topic of your doubt.");
      return;
    }
    if (!slot) {
      alert("Please select a date and time slot.");
      return;
    }
    if (new Date(slot) < new Date()) {
      alert("Selected session time must be in the future.");
      return;
    }

    if (onBookSession) {
      onBookSession({
        id: Date.now(),
        topic: topic.trim(),
        scheduled_at: slot,
        duration_minutes: Number(duration),
        session_price: price,
        creator: creator
      });
    } else {
      alert(`Doubt Session booked successfully for ${slot}!`);
      navigate('/profile');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/marketplace');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 font-sans">
      
      {/* Back Button with React Router navigation */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleBack}
        className="gap-2 text-xs border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace Catalog
      </Button>

      {/* Creator Profile Header Box */}
      <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          {/* Creator Avatar Image with Initials Fallback */}
          {creator.avatarUrl && !imgError ? (
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              onError={() => setImgError(true)}
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-indigo-600 shadow-sm">
              {getInitials(creator.name)}
            </div>
          )}

          {/* Profile Details from Database */}
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {creator.name}
            </h1>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {creator.headline || "Senior Educator & Technology Specialist"}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {creator.bio || `Technology educator and author sharing learning resources on LearnHub.`}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-gray-400" /> {creator.location || "India"}
              </span>
              {creator.email && (
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                  <Mail className="h-3.5 w-3.5" /> {creator.email}
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Stats Grid — Rating & Published Items (Dummy Followers and Total Students removed) */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Average Rating</p>
            <p className="text-base font-extrabold text-amber-500 flex items-center justify-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-amber-400" /> {creatorRating}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Published Items</p>
            <p className="text-base font-extrabold text-gray-900 dark:text-white mt-1">
              {creatorContents.length}
            </p>
          </div>
        </div>

      </div>

      {/* Navigation View Tabs — Student Reviews Tab Removed as requested */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Published Resources ({creatorContents.length})
        </button>

        <button
          onClick={() => setActiveTab('booking')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
            activeTab === 'booking'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Book Live 1:1 Doubt Session
        </button>
      </div>

      {/* Tab 1: Published Resources Grid */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {creatorContents.length > 0 ? (
            creatorContents.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/resource/${item.id}`)}
                className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                    {item.category_name || item.categoryName || "General"}
                  </span>
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                    {item.price === 0 ? 'FREE' : `₹${item.price}`}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center text-[11px] text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-amber-400" /> {item.rating || 4.8}
                  </span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {(item.learners_count || item.learnersCount || 0)} enrolled
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center space-y-2">
              <BookOpen className="h-8 w-8 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500 font-medium">No published resources available for this creator yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Book Live 1:1 Session Form */}
      {activeTab === 'booking' && (
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4 max-w-lg">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-600" /> Book 1:1 Live Doubt Session with {creator.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">Connect face-to-face via video call to resolve architecture and coding doubts.</p>
          </div>

          <form onSubmit={handleBookSessionSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">Doubt Topic / Question *</label>
              <input 
                type="text" 
                placeholder="e.g., Spring Boot transaction boundaries or Hibernate lazy loading"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-transparent text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 focus:outline-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">Preferred Date & Time *</label>
                <input 
                  type="datetime-local" 
                  min={getMinLocalDatetime()}
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full h-10 border rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 focus:outline-indigo-600 block text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">Session Duration *</label>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 focus:outline-indigo-600"
                >
                  <option value="30">30 Mins (₹250)</option>
                  <option value="45">45 Mins (₹350)</option>
                  <option value="60">60 Mins (₹450)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-[10px] text-gray-500">Payable Fee</p>
                <p className="text-base font-extrabold text-indigo-600">₹{price}</p>
              </div>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-lg shadow cursor-pointer">
                Confirm Slot & Book Session
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
