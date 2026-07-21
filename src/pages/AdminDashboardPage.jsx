import React, { useState } from "react";
import { ShieldAlert, Users, FileText, DollarSign, Activity, Lock, Unlock, UserCheck, Search, TrendingUp, AlertCircle, CheckCircle2, LayoutDashboard, Database, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/**
 * AdminDashboardPage Component (Module 10: Platform Administration)
 * Sidebar-driven executive dashboard for managing users, content moderation, transaction logs, and platform health.
 */
export default function AdminDashboardPage() {
  const [activeAdminTab, setActiveAdminTab] = useState("OVERVIEW"); // 'OVERVIEW' | 'USERS' | 'RESOURCES' | 'TRANSACTIONS'

  // Mock Platform Users Table state
  const [usersList, setUsersList] = useState([
    { id: 101, name: "Arjun Mehta", email: "arjun.mehta@learnhub.com", role: "LEARNER", status: "ACTIVE", joined: "2026-05-12" },
    { id: 202, name: "Rohan Verma", email: "rohan.verma@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "2026-04-10" },
    { id: 203, name: "Priya Sharma", email: "priya.sharma@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "2026-03-22" },
    { id: 304, name: "Vikram Singh", email: "vikram.s@learnhub.com", role: "LEARNER", status: "FROZEN", joined: "2026-06-01" },
    { id: 405, name: "Neha Gupta", email: "neha.gupta@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "2026-02-14" }
  ]);

  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [adminNotification, setAdminNotification] = useState("");

  const handleToggleFreeze = (userId, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "FROZEN" : "ACTIVE";
    setUsersList(usersList.map(u => {
      if (u.id === userId) return { ...u, status: newStatus };
      return u;
    }));
    setAdminNotification(`User ID #${userId} status updated to ${newStatus}.`);
    setTimeout(() => setAdminNotification(""), 4000);
  };

  const handleChangeRole = (userId, newRole) => {
    setUsersList(usersList.map(u => {
      if (u.id === userId) return { ...u, role: newRole };
      return u;
    }));
    setAdminNotification(`User ID #${userId} role changed to ${newRole}.`);
    setTimeout(() => setAdminNotification(""), 4000);
  };

  const filteredUsers = usersList.filter(u => {
    if (!searchUserQuery.trim()) return true;
    const query = searchUserQuery.toLowerCase();
    return u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query) || u.role.toLowerCase().includes(query);
  });

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Admin Executive Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-xs font-bold mb-1">
              <ShieldAlert className="h-3.5 w-3.5" /> Module 10: Executive Control Panel
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Platform Administration & Oversight
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Central workspace for user moderation, resource governance, and transactional health logs.
            </p>
          </div>
        </div>

        {adminNotification && (
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium flex items-center justify-between">
            <span>{adminNotification}</span>
          </div>
        )}

        {/* Sidebar + Main View Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Admin Navigation Sidebar */}
          <aside className="md:col-span-3 space-y-2 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-3 rounded-2xl shadow-xs self-start">
            <p className="text-[10px] font-extrabold uppercase text-gray-400 px-3 py-1 tracking-wider">
              Administration Navigation
            </p>

            <button
              onClick={() => setActiveAdminTab("OVERVIEW")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === "OVERVIEW"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" /> Platform Overview
            </button>

            <button
              onClick={() => setActiveAdminTab("USERS")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === "USERS"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <Users className="h-4 w-4" /> User Moderation
            </button>

            <button
              onClick={() => setActiveAdminTab("RESOURCES")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === "RESOURCES"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <FileText className="h-4 w-4" /> Resource Governance
            </button>

            <button
              onClick={() => setActiveAdminTab("TRANSACTIONS")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === "TRANSACTIONS"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <DollarSign className="h-4 w-4" /> Transaction Logs
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-9 space-y-6">
            
            {activeAdminTab === "OVERVIEW" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                      <span>Total Registrations</span>
                      <Users className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">50,420</div>
                    <p className="text-[11px] text-emerald-600 font-bold">+12% this month</p>
                  </Card>

                  <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                      <span>Active Published Files</span>
                      <FileText className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10,245</div>
                    <p className="text-[11px] text-gray-400">PDFs, Code & Cheat Sheets</p>
                  </Card>

                  <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                      <span>Total Platform Revenue</span>
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹2.45 Cr</div>
                    <p className="text-[11px] text-gray-400">Razorpay processed volume</p>
                  </Card>

                  <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                      <span>System Health</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">99.98%</div>
                    <p className="text-[11px] text-emerald-600 font-bold">Spring Boot & PostgreSQL Healthy</p>
                  </Card>
                </div>
              </div>
            )}

            {activeAdminTab === "USERS" && (
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-bold">User Moderation & Account Oversight</CardTitle>
                    <CardDescription className="text-xs">
                      View registered platform profiles, assign roles (`LEARNER`, `CREATOR`, `ADMIN`), or freeze accounts.
                    </CardDescription>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <Input
                      placeholder="Search user profile..."
                      value={searchUserQuery}
                      onChange={(e) => setSearchUserQuery(e.target.value)}
                      className="pl-9 bg-gray-50/50 dark:bg-black/20 text-xs"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 font-semibold uppercase">
                      <tr>
                        <th className="p-4">User Details</th>
                        <th className="p-4">Current Role</th>
                        <th className="p-4">Account Status</th>
                        <th className="p-4">Joined Date</th>
                        <th className="p-4 text-right">Moderation Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-black/20">
                          <td className="p-4">
                            <div className="font-bold text-gray-900 dark:text-white text-sm">{user.name}</div>
                            <div className="text-[11px] text-gray-400">{user.email} • ID #{user.id}</div>
                          </td>

                          <td className="p-4">
                            <select
                              value={user.role}
                              onChange={(e) => handleChangeRole(user.id, e.target.value)}
                              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs rounded-md px-2 py-1 font-semibold text-gray-800 dark:text-gray-200"
                            >
                              <option value="LEARNER">LEARNER</option>
                              <option value="CREATOR">CREATOR</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                          </td>

                          <td className="p-4">
                            <Badge className={user.status === "ACTIVE" ? "bg-emerald-500 text-white text-[10px]" : "bg-red-500 text-white text-[10px]"}>
                              {user.status}
                            </Badge>
                          </td>

                          <td className="p-4 text-gray-500">{user.joined}</td>

                          <td className="p-4 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleFreeze(user.id, user.status)}
                              className={`text-xs gap-1 h-8 ${
                                user.status === "ACTIVE" 
                                  ? "border-red-200 text-red-600 hover:bg-red-50" 
                                  : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                              }`}
                            >
                              {user.status === "ACTIVE" ? (
                                <><Lock className="h-3.5 w-3.5" /> Freeze Account</>
                              ) : (
                                <><Unlock className="h-3.5 w-3.5" /> Unfreeze</>
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}

            {activeAdminTab === "RESOURCES" && (
              <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center text-xs text-gray-500 space-y-2">
                <FileText className="h-8 w-8 text-indigo-500 mx-auto" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Resource Moderation Queue</h3>
                <p>All 10,245 published files are currently passing automated compliance checks.</p>
              </div>
            )}

            {activeAdminTab === "TRANSACTIONS" && (
              <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center text-xs text-gray-500 space-y-2">
                <DollarSign className="h-8 w-8 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Transaction Financial Logs</h3>
                <p>Recent Razorpay webhook transactions verified with 100% payout ledger match.</p>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
