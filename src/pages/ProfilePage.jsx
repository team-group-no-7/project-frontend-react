import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

export default function ProfilePage() {
  const [activeRole, setActiveRole] = useState("LEARNER"); // Toggles "LEARNER" vs "CREATOR"
  const [profile, setProfile] = useState(INITIAL_USER);

  // Toggle Learner vs Creator view modes
  const handleToggleRole = () => {
    setActiveRole((prev) => (prev === "LEARNER" ? "CREATOR" : "LEARNER"));
  };

  // Update profile states when saving settings in Creator dashboard
  const handleSaveProfileSettings = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Sub-header row for Role Switcher inside content */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Account Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your student learning and creator publishing modes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`px-3 py-1 font-semibold text-xs border uppercase rounded-full ${activeRole === "CREATOR"
            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}>
            {activeRole} MODE
          </Badge>
          <Button
            onClick={handleToggleRole}
            variant="outline"
            className="gap-2 text-sm border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 transition-all duration-300 font-semibold"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Switch to {activeRole === "LEARNER" ? "Creator" : "Learner"} Mode
          </Button>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Left Column - Profile Sidebar Summary */}
        <section className="md:col-span-4 flex flex-col gap-6">
          <ProfileSidebar
            profile={profile}
            activeRole={activeRole}
            libraryCount={PURCHASED_CONTENTS.length}
            sessionsCount={DOUBT_SESSIONS.length}
            uploadsCount={UPLOADED_CONTENTS.length}
          />
        </section>

        {/* Right Column - Role Dashboards */}
        <section className="md:col-span-8">
          {activeRole === "LEARNER" ? (
            <LearnerDashboard
              purchasedContents={PURCHASED_CONTENTS}
              doubtSessions={DOUBT_SESSIONS}
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
