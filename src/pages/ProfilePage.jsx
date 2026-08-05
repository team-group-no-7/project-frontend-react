import React, { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Sub-components
import ProfileSidebar from "@/components/ProfileSidebar";
import LearnerDashboard from "@/components/LearnerDashboard";
import CreatorDashboard from "@/components/CreatorDashboard";

const DEFAULT_USER = { name: "Learner User", email: "user@learnhub.com", role: "LEARNER" };

export default function ProfilePage({ 
  activeRole = "LEARNER", 
  onToggleRole, 
  profile: initialProfile, 
  onUpdateProfile,
  onOpenReader, 
  purchasedContents, 
  marketplaceContents = [],
  doubtSessions, 
  uploadedContents, 
  onJoinCall 
}) {
  const [profile, setProfile] = useState(() => initialProfile || (() => {
    try { return JSON.parse(localStorage.getItem("learnhub_user")) || DEFAULT_USER; }
    catch (e) { return DEFAULT_USER; }
  })());

  // Sync state if initialProfile prop changes (e.g. after login/registration)
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  // Fallbacks to empty arrays if props are not supplied
  const purchases = purchasedContents ?? [];
  const sessions = doubtSessions ?? [];
  const uploads = uploadedContents ?? [];

  const handleSaveProfileSettings = async (updatedProfile) => {
    if (onUpdateProfile) {
      try {
        const savedProfile = await onUpdateProfile(updatedProfile);
        if (savedProfile) setProfile(savedProfile);
      } catch (err) {
        console.error('Profile save failed:', err);
        alert('Unable to save profile changes. Please try again.');
      }
    } else {
      setProfile(updatedProfile);
    }
  };

  const creatorRevenue = uploads.reduce((sum, item) => {
    const learnersCount = Number(item.learnersCount || item.learners_count || 0);
    const price = parseFloat(item.price) || 0;
    return sum + (learnersCount * price);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Sub-header row for Role Switcher inside content */}
      {activeRole !== "ADMIN" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`px-3 py-1 font-semibold text-xs border uppercase rounded-full ${activeRole === "CREATOR"
              ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}>
              {activeRole === 'CREATOR' ? 'CREATOR' : (activeRole === 'ADMIN' ? 'ADMIN' : 'LEARNER')} MODE
            </Badge>
            <Button
              onClick={onToggleRole}
              variant="outline"
              className="gap-2 text-sm border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 transition-all duration-300 font-semibold"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Switch to {activeRole === "LEARNER" ? "Creator" : "Learner"} Mode
            </Button>
          </div>
        </div>
      )}

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Left Column - Profile Sidebar Summary */}
        <section className="md:col-span-4 flex flex-col gap-6">
          <ProfileSidebar
            profile={profile}
            activeRole={activeRole}
            libraryCount={purchases.length}
            sessionsCount={sessions.length}
            uploadsCount={uploads.length}
            creatorRevenue={creatorRevenue}
          />
        </section>

        {/* Right Column - Role Dashboards */}
        <section className="md:col-span-8">
          {activeRole === "ADMIN" ? (
            <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Admin Account Overview</h2>
              <p className="text-sm text-slate-500">You are logged in as a System Administrator. Your role is dedicated to platform oversight, resource moderation, and system monitoring.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <span className="text-xs text-slate-400 block font-semibold uppercase">System Role</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">Full Administrator</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <span className="text-xs text-slate-400 block font-semibold uppercase">Access Control</span>
                  <span className="text-sm font-bold text-emerald-600">All Modules Granted</span>
                </div>
              </div>
            </Card>
          ) : activeRole === "LEARNER" ? (
            <LearnerDashboard
              profile={profile}
              purchasedContents={purchases}
              marketplaceContents={marketplaceContents}
              doubtSessions={sessions}
              onOpenReader={onOpenReader}
              onJoinCall={onJoinCall}
              onSaveProfile={handleSaveProfileSettings}
            />
          ) : (
            <CreatorDashboard
              uploadedContents={uploads}
              doubtSessions={sessions}
              profile={profile}
              onSaveSettings={handleSaveProfileSettings}
              onJoinCall={onJoinCall}
            />
          )}
        </section>

      </div>
    </div>
  );
}

