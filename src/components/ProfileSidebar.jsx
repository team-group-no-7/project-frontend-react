import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileSidebar({ profile, activeRole, libraryCount, sessionsCount, uploadsCount, creatorRevenue = 0 }) {
  const user = profile || {};

  return (
    <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="text-center pb-2 pt-6">
        <div className="mx-auto relative">
          <Avatar className="h-24 w-24 border-4 border-blue-100 dark:border-slate-800 shadow-md">
            <AvatarImage src={user.avatar || user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
              {user.name ? user.name.substring(0, 2).toUpperCase() : "US"}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-bold mt-3 text-slate-800 dark:text-white">
          {user.name || "LearnHub User"}
        </CardTitle>
        <p className="text-xs text-slate-400 font-medium">{user.email || "user@learnhub.com"}</p>
        
        <div className="pt-2 flex justify-center">
          <Badge className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-0.5 text-xs rounded-full font-semibold">
            {activeRole || user.role || "LEARNER"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
        {(user.headline || user.bio) && (
          <div>
            <span className="font-semibold text-slate-400 block uppercase text-[10px]">Headline / Bio</span>
            <p className="text-slate-700 dark:text-slate-200 font-medium mt-0.5">{user.headline || user.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <span className="font-semibold text-slate-400 block uppercase text-[10px]">Location</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{user.location || "India"}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-400 block uppercase text-[10px]">Account Role</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{activeRole || user.role || "LEARNER"}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-4 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="grid grid-cols-2 w-full text-center divide-x divide-slate-200 dark:divide-slate-700">
          {activeRole === "ADMIN" ? (
            <>
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">ADMIN</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Role</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Active</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Status</div>
              </div>
            </>
          ) : activeRole === "LEARNER" ? (
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
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  ₹{creatorRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Revenue</div>
              </div>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
