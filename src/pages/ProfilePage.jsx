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
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] text-[#1A1A2E] dark:text-[#f3f4f6]">

      {/* Platform Header Navigation */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={`px-3 py-1 font-semibold text-xs border uppercase rounded-full ${activeRole === "CREATOR"
              ? "bg-amber-50 dark:bg-amber-950/20 text-[#F5A623] border-[#F5A623]"
              : "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border-indigo-600"
              }`}>
              {activeRole} MODE
            </Badge>
            <Button
              onClick={handleToggleRole}
              variant="outline"
              className="gap-2 text-sm border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 transition-all duration-300 font-medium"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Switch to {activeRole === "LEARNER" ? "Creator" : "Learner"} Mode
            </Button>
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">

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

      </main>
    </div>
  );
}
