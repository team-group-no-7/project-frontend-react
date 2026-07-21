import React, { useState } from "react";
import { ArrowRightLeft, User, Lock, Bell, Sliders, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [activeTab, setActiveTab] = useState("DASHBOARD"); // "DASHBOARD" vs "SETTINGS"
  const [profile, setProfile] = useState(INITIAL_USER);

  // Settings form states
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState("");

  // Toggle Learner vs Creator view modes
  const handleToggleRole = () => {
    setActiveRole((prev) => (prev === "LEARNER" ? "CREATOR" : "LEARNER"));
  };

  // Update profile states when saving settings in Creator dashboard
  const handleSaveProfileSettings = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Handle Account Settings Form Submit
  const handleSaveAccountSettings = (e) => {
    e.preventDefault();
    const updated = { ...profile, name, email };
    setProfile(updated);
    setSavedSuccessMsg("Account settings updated successfully!");
    setTimeout(() => setSavedSuccessMsg(""), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] text-[#1A1A2E] dark:text-[#f3f4f6]">

      {/* Platform Header Navigation */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`px-3 py-1 font-semibold text-xs border uppercase rounded-full ${activeRole === "CREATOR"
                ? "bg-amber-50 dark:bg-amber-950/20 text-[#F5A623] border-[#F5A623]"
                : "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border-indigo-600"
              }`}>
              {activeRole} MODE
            </Badge>

            {/* Tab selector between Main Dashboard & Account Settings */}
            <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setActiveTab("DASHBOARD")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "DASHBOARD"
                    ? "bg-white dark:bg-[#121124] text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("SETTINGS")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "SETTINGS"
                    ? "bg-white dark:bg-[#121124] text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Account Settings
              </button>
            </div>
          </div>

          <Button
            onClick={handleToggleRole}
            variant="outline"
            className="gap-2 text-sm border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 transition-all duration-300 font-medium"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Switch to {activeRole === "LEARNER" ? "Creator" : "Learner"} Mode
          </Button>

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

        {/* Right Column - Dashboard or Settings Content */}
        <section className="md:col-span-8">
          {activeTab === "DASHBOARD" ? (
            activeRole === "LEARNER" ? (
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
            )
          ) : (
            /* Account & Preferences Settings View */
            <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-indigo-600" /> Account Preferences & Security
                </h2>
                <p className="text-xs text-gray-500">
                  Update your profile information, password, and notification settings
                </p>
              </div>

              {savedSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{savedSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveAccountSettings} className="space-y-6">
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> Profile Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Full Name</Label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Change */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" /> Security & Password
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Current Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">New Password</Label>
                      <Input
                        type="password"
                        placeholder="Leave blank to keep current"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Bell className="h-3.5 w-3.5" /> Email Notification Alerts
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-gray-900 dark:text-white block">Purchase & Receipt Confirmations</span>
                        <span className="text-[11px] text-gray-500">Receive emails when content is unlocked</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailAlerts}
                        onChange={(e) => setEmailAlerts(e.target.checked)}
                        className="h-4 w-4 rounded-sm text-indigo-600 accent-indigo-600"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-gray-900 dark:text-white block">Doubt Session Reminders</span>
                        <span className="text-[11px] text-gray-500">Receive alerts 1 hour prior to scheduled mentorship sessions</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={sessionAlerts}
                        onChange={(e) => setSessionAlerts(e.target.checked)}
                        className="h-4 w-4 rounded-sm text-indigo-600 accent-indigo-600"
                      />
                    </label>
                  </div>
                </div>

                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6">
                  Save Account Changes
                </Button>

              </form>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
