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
    <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm">
      {/* Profile Header */}
      <CardHeader className="flex flex-col items-center text-center pb-6">
        <Avatar className="h-24 w-24 border-2 border-indigo-600 dark:border-indigo-400">
          <AvatarFallback className="bg-indigo-100 text-indigo-600 text-3xl font-bold dark:bg-indigo-950 dark:text-indigo-300">
            {initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{profile.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</CardDescription>
        <div className="flex gap-2 mt-3">
          <Badge className="bg-indigo-600 hover:bg-indigo-600/90 text-white font-medium">Learner</Badge>
          <Badge className="bg-amber-500 hover:bg-amber-500/90 text-white font-medium">Creator</Badge>
        </div>
      </CardHeader>

      {/* Role-Specific Stats Footer */}
      <CardFooter className="bg-gray-50/50 dark:bg-black/20 p-4 border-t border-gray-100 dark:border-gray-800 rounded-b-xl">
        <div className="grid grid-cols-2 w-full text-center divide-x divide-gray-200 dark:divide-gray-800">
          {activeRole === "LEARNER" ? (
            <>
              <div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{libraryCount}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Library</div>
              </div>
              <div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{sessionsCount}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Sessions</div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-lg font-bold text-amber-500">{uploadsCount}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Uploads</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-500">₹12,560</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Revenue</div>
              </div>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
