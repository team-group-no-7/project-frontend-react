import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Sub-components
import ProfileSidebar from "@/components/ProfileSidebar";
import LearnerDashboard from "@/components/LearnerDashboard";
import CreatorDashboard from "@/components/CreatorDashboard";

// Dummy Data matching database models
import {
  INITIAL_USER,
  PURCHASED_CONTENTS,
  UPLOADED_CONTENTS,
  DOUBT_SESSIONS
} from "@/data/mockData";

export default function ProfilePage({ activeRole = "LEARNER", onToggleRole, profile: initialProfile, onOpenReader, purchasedContents = PURCHASED_CONTENTS, doubtSessions = DOUBT_SESSIONS, onJoinCall }) {
  const [profile, setProfile] = useState(() => initialProfile || INITIAL_USER);

  // Update profile states when saving settings in Creator dashboard
  const handleSaveProfileSettings = (updatedProfile) => {
    setProfile(updatedProfile);
  };

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
              {activeRole} MODE
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
            libraryCount={purchasedContents.length}
            sessionsCount={DOUBT_SESSIONS.length}
            uploadsCount={UPLOADED_CONTENTS.length}
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
              purchasedContents={purchasedContents}
              doubtSessions={doubtSessions}
              onOpenReader={onOpenReader}
              onJoinCall={onJoinCall}
            />
          ) : (
            <CreatorDashboard
              uploadedContents={UPLOADED_CONTENTS}
              profile={profile}
              onSaveSettings={handleSaveProfileSettings}
            />
          )}
        </section>

      </div>
    </div>
  );
}
