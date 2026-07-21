import React, { useState } from 'react';
import { User, Award, BookOpen, Star, Users, MessageSquare, CheckCircle2, ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MarketplaceCard from '@/components/MarketplaceCard';
import { MARKETPLACE_CONTENTS } from '@/data/mockData';

/**
 * CreatorProfilePage Component (Module 2: Public Creator Profile)
 * Displays public creator bio, published resources, follower stats, and achievements.
 */
export default function CreatorProfilePage({ creatorName = "Rohan Verma", onBack, onBookSession }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1420);

  // Creator profile metadata
  const creator = {
    name: creatorName,
    role: "Senior Java & Microservices Architect",
    bio: "Ex-Senior Software Engineer with 8+ years experience in Spring Boot, Distributed Systems, and Microservices. Passionate about helping students crack technical interviews.",
    rating: 4.9,
    reviewsCount: 380,
    totalStudents: 4850,
    publishedCount: 4,
    achievements: [
      "Top Rated Creator 2026",
      "Java & Spring Expert",
      "100+ Doubt Sessions Hosted"
    ]
  };

  // Filter creator's published resources from mock dataset
  const creatorResources = MARKETPLACE_CONTENTS.filter(
    (item) => item.creator_name === creatorName || item.creator_name === "Rohan Verma"
  );

  const handleToggleFollow = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowersCount((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Back Button */}
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Button>
        )}

        {/* Creator Banner Card */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-400 p-1 shrink-0">
                <div className="w-full h-full rounded-xl bg-indigo-900 flex items-center justify-center font-black text-2xl text-white">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {creator.name}
                  </h1>
                  <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3 text-amber-400" /> Verified Creator
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                  {creator.role}
                </p>
                <p className="text-xs text-indigo-300/80 max-w-xl leading-relaxed">
                  {creator.bio}
                </p>
              </div>
            </div>

            {/* Follow & Book Buttons */}
            <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Button
                onClick={handleToggleFollow}
                className={`w-full sm:w-36 font-bold text-xs py-2.5 rounded-xl transition-all ${
                  isFollowing
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow Creator'}
              </Button>
              {onBookSession && (
                <Button
                  onClick={onBookSession}
                  variant="outline"
                  className="w-full sm:w-36 border-white/30 text-white hover:bg-white/10 font-bold text-xs gap-1.5"
                >
                  <Calendar className="h-3.5 w-3.5" /> Book Session
                </Button>
              )}
            </div>

          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center sm:text-left">
            <div>
              <span className="text-xs text-indigo-300 font-medium block">Followers</span>
              <span className="text-lg font-extrabold text-white">{followersCount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-xs text-indigo-300 font-medium block">Students Taught</span>
              <span className="text-lg font-extrabold text-white">{creator.totalStudents.toLocaleString()}+</span>
            </div>
            <div>
              <span className="text-xs text-indigo-300 font-medium block">Rating</span>
              <span className="text-lg font-extrabold text-amber-300 flex items-center gap-1 justify-center sm:justify-start">
                <Star className="h-4 w-4 fill-amber-300" /> {creator.rating} ({creator.reviewsCount})
              </span>
            </div>
            <div>
              <span className="text-xs text-indigo-300 font-medium block">Published Notes</span>
              <span className="text-lg font-extrabold text-white">{creatorResources.length} Items</span>
            </div>
          </div>
        </div>

        {/* Creator Achievements Badges */}
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-3 shadow-xs">
          <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
            <Award className="h-4 w-4 text-amber-500" /> Verified Achievements & Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {creator.achievements.map((badge, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs px-3 py-1 rounded-lg"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Published Resources Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" /> Published Study Materials
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              Showing {creatorResources.length} curated resources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creatorResources.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onPreview={() => {}}
                onBuy={() => {}}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
