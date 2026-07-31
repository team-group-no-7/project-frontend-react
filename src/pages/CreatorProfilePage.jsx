import React, { useState, useMemo } from 'react';
import { Star, Users, BookOpen, MapPin, ArrowLeft, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Database Data
import { CREATORS, MARKETPLACE_CONTENTS } from '@/data/mockData';

/**
 * Creator Profile Page (Module 1 - Item 3)
 * Developed by: Shubham (CDAC PGCP-AC Project)
 * 
 * Simple, beginner-friendly component displaying public creator profile details:
 * 1. Creator Information (Name, Avatar, Bio, Headline, Location)
 * 2. Quick Statistics (Rating, Students, Published Items)
 * 3. Creator's Published Courses / Notes
 * 4. Learner Reviews
 */
export default function CreatorProfilePage({ creatorId = 202, onBack, onBookSession }) {
  // Find creator details from mock database (default to Rohan Verma if not found)
  const creator = CREATORS.find((c) => c.id === Number(creatorId)) || CREATORS[0];
  
  // Tab state to switch between 'courses', 'reviews', and 'booking'
  const [activeTab, setActiveTab] = useState('courses');

  // Doubt Session Booking States
  const [topic, setTopic] = useState("");
  const [slot, setSlot] = useState("");
  const [duration, setDuration] = useState("45"); // default 45 mins

  // Recalculate price dynamically based on session duration selection
  const price = useMemo(() => {
    if (duration === "30") return 250;
    if (duration === "60") return 450;
    return 350; // 45 mins
  }, [duration]);

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
    onBookSession && onBookSession({
      id: Date.now(),
      topic: topic.trim(),
      scheduled_at: slot,
      duration_minutes: Number(duration),
      session_price: price,
      creator: creator
    });
  };

  // Filter resources published by this specific creator
  const creatorContents = MARKETPLACE_CONTENTS.filter(
    (item) => item.creator_id === creator.id
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Back to Marketplace Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="gap-2 text-xs border-gray-300"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </Button>

      {/* Creator Profile Summary Box */}
      <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          {/* Creator Avatar Image */}
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 shadow-sm"
          />

          {/* Profile Text Details */}
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {creator.name}
            </h1>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {creator.headline}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {creator.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-gray-400" /> {creator.location}
              </span>
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                <Mail className="h-3.5 w-3.5" /> Contact Creator
              </span>
            </div>
          </div>

        </div>

        {/* Quick Stats Grid — 4 columns now that followersCount is in use */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-500 font-medium">Rating</p>
            <p className="text-base font-bold text-amber-500 flex items-center justify-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-amber-400" /> {creator.rating}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-500 font-medium">Total Students</p>
            <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
              {creator.totalStudents}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-500 font-medium">Followers</p>
            <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1 mt-1">
              <Heart className="h-4 w-4" /> {creator.followersCount?.toLocaleString()}
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-500 font-medium">Published Items</p>
            <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              {creatorContents.length}
            </p>
          </div>
        </div>

      </div>

      {/* View Toggle Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Published Resources ({creatorContents.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'reviews'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Student Reviews ({creator.reviews ? creator.reviews.length : 0})
        </button>

        <button
          onClick={() => setActiveTab('booking')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'booking'
              ? 'bg-indigo-600 text-white font-bold'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          Book Live 1:1 Doubt Session
        </button>
      </div>

      {/* Tab 1: Published Resources List */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {creatorContents.length > 0 ? (
            creatorContents.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                    {item.category_name}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {item.price === 0 ? 'FREE' : `₹${item.price}`}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center text-[11px] text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-amber-400" /> {item.rating}
                  </span>
                  <span>{item.learners_count} learners</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 py-4">No published resources found for this creator.</p>
          )}
        </div>
      )}

      {/* Tab 2: Learner Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {creator.reviews && creator.reviews.length > 0 ? (
            creator.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {rev.studentName}
                  </span>
                  <span className="text-xs text-amber-500 font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400" /> {rev.rating}/5
                  </span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300">
                  "{rev.comment}"
                </p>

                <p className="text-[10px] text-gray-400">{rev.date}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 py-4">No reviews available yet.</p>
          )}
        </div>
      )}

      {/* Tab 3: Book Live 1:1 Session Form */}
      {activeTab === 'booking' && (
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4 max-w-lg">
          <div className="border-b pb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Book 1:1 Live doubt session with {creator.name}</h3>
            <p className="text-xs text-gray-500">Connect face-to-face via embedded Jitsi Video Call to clear backend conceptual doubts.</p>
          </div>

          <form onSubmit={handleBookSessionSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">Doubt Topic / Question *</label>
              <input 
                type="text" 
                placeholder="e.g., Struggling with Spring Boot Transaction boundaries or Hibernate lazy loading"
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
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-lg shadow">
                Confirm Slot & Proceed to Pay
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
