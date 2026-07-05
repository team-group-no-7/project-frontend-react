import React from "react";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LearnerDashboard({ purchasedContents, doubtSessions }) {
  // Helper to map category_id to tag name (mimics database relation)
  const getCategoryName = (categoryId) => {
    const categories = { 1: "Java", 2: "DSA", 3: "Web Dev", 4: "System Design" };
    return categories[categoryId] || "General";
  };

  return (
    <Tabs defaultValue="library" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-1 rounded-lg">
        <TabsTrigger value="library" className="gap-2 py-2.5 rounded-md text-sm">
          <BookOpen className="h-4 w-4" /> My Library
        </TabsTrigger>
        <TabsTrigger value="sessions" className="gap-2 py-2.5 rounded-md text-sm">
          <Calendar className="h-4 w-4" /> Doubt Sessions
        </TabsTrigger>
      </TabsList>

      {/* Library Tab (Matches SQL query result: PURCHASES JOIN CONTENTS) */}
      <TabsContent value="library">
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124]">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Purchased Learning Resources</CardTitle>
            <CardDescription>Courses, notes, and guides purchased on LearnHub.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {purchasedContents.map((purchase) => (
              <div key={purchase.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 dark:border-gray-800/80 rounded-lg gap-3 hover:shadow-md transition-shadow">
                <div>
                  <Badge className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold mb-1" variant="outline">
                    {getCategoryName(purchase.content.category_id)}
                  </Badge>
                  <h4 className="font-semibold text-base text-gray-900 dark:text-white">{purchase.content.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Transaction ID: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-[11px] font-mono">{purchase.transaction_id}</code> • Purchased {new Date(purchase.purchased_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-bold text-gray-900 dark:text-white">₹{purchase.amount_paid}</span>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">Open Content</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Doubt Sessions Tab (Matches DOUBT_SESSIONS table columns) */}
      <TabsContent value="sessions">
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124]">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Scheduled Doubt Sessions</CardTitle>
            <CardDescription>Track booking status and join video sessions with creators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {doubtSessions.map((session) => (
              <div key={session.id} className="p-4 border border-gray-100 dark:border-gray-800/80 rounded-lg space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white text-base">{session.topic}</span>
                  <div className="flex gap-2">
                    <Badge className={session.booking_status === "APPROVED" ? "bg-emerald-500 text-white" : "bg-yellow-500 text-white"}>
                      {session.booking_status}
                    </Badge>
                    <Badge variant="outline" className={session.payment_status === "PAID" ? "border-emerald-500 text-emerald-500" : "border-red-500 text-red-500"}>
                      {session.payment_status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500 gap-2 border-t border-gray-50 dark:border-gray-800/50 pt-2">
                  <div>
                    <span className="block">Scheduled Time: <strong>{new Date(session.scheduled_at).toLocaleString()}</strong></span>
                    <span className="block mt-0.5">Duration: <strong>{session.duration_minutes} mins</strong> • Price: <strong>₹{session.session_price}</strong></span>
                  </div>
                  {session.booking_status === "APPROVED" && (
                    <Button size="sm" variant="outline" className="border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white gap-1 w-full sm:w-auto mt-2 sm:mt-0 font-medium">
                      <ExternalLink className="h-3 w-3" /> Join {session.jitsi_room_name}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
