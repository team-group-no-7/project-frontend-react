import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileSidebar({ profile, activeRole, libraryCount, sessionsCount, uploadsCount }) {
  // Generate user initials for avatar fallback (e.g., "Arjun Mehta" -> "AM")
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      {/* Profile Header */}
      <CardHeader className="flex flex-col items-center text-center pb-6">
        <Avatar className="h-24 w-24 border-2 border-blue-600 dark:border-blue-400">
          <AvatarFallback className="bg-blue-50 text-blue-600 text-3xl font-bold dark:bg-blue-950/50 dark:text-blue-400">
            {initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{profile.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</CardDescription>
        <div className="flex gap-2 mt-3">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Learner</Badge>
          <Badge className="bg-slate-700 hover:bg-slate-800 text-white font-semibold dark:bg-slate-800 dark:hover:bg-slate-700">Creator</Badge>
        </div>
      </CardHeader>

      {/* Role-Specific Stats Footer */}
      <CardFooter className="bg-slate-50/50 dark:bg-slate-900/50 p-4 border-t border-slate-100 dark:border-slate-800 rounded-b-xl">
        <div className="grid grid-cols-2 w-full text-center divide-x divide-slate-100 dark:divide-slate-800">
          {activeRole === "LEARNER" ? (
            <>
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{libraryCount}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Library</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{sessionsCount}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Sessions</div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{uploadsCount}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Uploads</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₹12,560</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Revenue</div>
              </div>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
