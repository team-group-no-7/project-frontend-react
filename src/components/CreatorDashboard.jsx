import React from "react";
import { BookOpen, Settings, Calendar, Video, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AccountSettingsForm from "@/components/AccountSettingsForm";

export default function CreatorDashboard({ uploadedContents = [], doubtSessions = [], profile, onSaveSettings, onJoinCall }) {

  return (
    <Tabs defaultValue="uploads" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 rounded-lg">
        <TabsTrigger value="uploads" className="gap-2 py-2.5 rounded-md text-sm font-semibold">
          <BookOpen className="h-4 w-4" /> Content List
        </TabsTrigger>
        <TabsTrigger value="sessions" className="gap-2 py-2.5 rounded-md text-sm font-semibold">
          <Calendar className="h-4 w-4" /> Doubt Sessions ({doubtSessions.length})
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-2 py-2.5 rounded-md text-sm font-semibold">
          <Settings className="h-4 w-4" /> Account Settings
        </TabsTrigger>
      </TabsList>

      {/* Content List Tab */}
      <TabsContent value="uploads">
        <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Uploaded Content</CardTitle>
              <CardDescription>Manage your published learning resources.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedContents.length > 0 ? uploadedContents.map((content) => (
              <div key={content.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 dark:border-slate-800/80 rounded-lg gap-3 hover:shadow-sm transition-shadow bg-white dark:bg-slate-900">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                    {content.category_name || "General"}
                  </span>
                  <h4 className="font-semibold text-base text-gray-900 dark:text-white mt-1">{content.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{content.description}</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {content.price > 0 ? `₹${content.price}` : "Free"}
                  </span>
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs">
                    {content.status || "Published"}
                  </Badge>
                </div>
              </div>
            )) : (
              <p className="text-center py-8 text-sm text-gray-400">No resources published yet.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Booked Doubt Sessions Tab */}
      <TabsContent value="sessions">
        <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Learner Doubt Sessions</CardTitle>
            <CardDescription>View upcoming 1:1 mentorship requests and launch live video calls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {doubtSessions.length > 0 ? (
              doubtSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {session.booking_status || "Approved"}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">• {session.duration_minutes || 45} Mins</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{session.topic}</h3>
                    <p className="text-xs text-gray-500">
                      Learner: <strong className="text-gray-700 dark:text-gray-300">{session.learner_name || "Learner"}</strong> • Slot: {session.scheduled_at}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                      ₹{session.session_price || 350}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => onJoinCall && onJoinCall(session)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 shadow-sm"
                    >
                      <Video className="h-4 w-4" /> Start Video Call
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-sm text-gray-400">No mentorship doubt sessions booked yet.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Account Settings Tab */}
      <TabsContent value="settings">
        <AccountSettingsForm profile={profile} onSaveProfile={onSaveSettings} />
      </TabsContent>
    </Tabs>
  );
}
