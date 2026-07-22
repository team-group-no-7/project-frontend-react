import React, { useState } from "react";
import { ShieldAlert, Users, FileText, DollarSign, CheckCircle2, Lock, Unlock, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/**
 * AdminDashboardPage Component (Module 10: Platform Administration)
 * Tab-free dashboard displaying platform overview metrics & user moderation list.
 */
export default function AdminDashboardPage() {
  // Mock users database
  const [usersList, setUsersList] = useState([
    { id: 101, name: "Arjun Mehta", email: "arjun.mehta@learnhub.com", role: "LEARNER", status: "ACTIVE", joined: "2026-05-12" },
    { id: 202, name: "Rohan Verma", email: "rohan.verma@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "2026-04-10" },
    { id: 203, name: "Priya Sharma", email: "priya.sharma@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "2026-03-22" },
    { id: 304, name: "Vikram Singh", email: "vikram.s@learnhub.com", role: "LEARNER", status: "FROZEN", joined: "2026-06-01" },
    { id: 405, name: "Neha Gupta", email: "neha.gupta@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "2026-02-14" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  const handleToggleFreeze = (userId, currentStatus) => {
    const nextStatus = currentStatus === "ACTIVE" ? "FROZEN" : "ACTIVE";
    setUsersList(usersList.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
    showNotification(`User ID #${userId} status changed to ${nextStatus}.`);
  };

  const handleChangeRole = (userId, newRole) => {
    setUsersList(usersList.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showNotification(`User ID #${userId} role changed to ${newRole}.`);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const filteredUsers = usersList.filter(u =>
    !searchQuery.trim() ||
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Executive Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs font-bold px-2 py-0.5 rounded mb-1.5">
            <ShieldAlert className="h-3.5 w-3.5" /> Platform Admin Workspace
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Platform Administration</h1>
          <p className="text-xs text-gray-500 mt-1">Monitor site-wide metrics and manage user privileges.</p>
        </div>

        {notification && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs rounded-xl font-semibold">
            {notification}
          </div>
        )}

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 space-y-1">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Registrations</span>
              <Users className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="text-lg font-bold">50,420</div>
            <span className="text-[10px] text-emerald-600 font-bold">+12%</span>
          </Card>

          <Card className="p-4 space-y-1">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Active Files</span>
              <FileText className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-lg font-bold">10,245</div>
            <span className="text-[10px] text-gray-400">PDFs & Notes</span>
          </Card>

          <Card className="p-4 space-y-1">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Total Volume</span>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-lg font-bold text-emerald-600">₹2.45 Cr</div>
            <span className="text-[10px] text-gray-400">Razorpay Sales</span>
          </Card>

          <Card className="p-4 space-y-1">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>System Health</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-lg font-bold">99.98%</div>
            <span className="text-[10px] text-emerald-600 font-bold">Services Online</span>
          </Card>
        </div>

        {/* User Accounts Moderation Board */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-sm font-bold">User Privilege Moderation</CardTitle>
              <CardDescription className="text-[11px]">Freeze student accounts or update publisher roles.</CardDescription>
            </div>
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input placeholder="Filter users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 text-xs" />
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gray-50 font-semibold uppercase text-gray-500">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Account Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-[10px] text-gray-400">{user.email} • ID #{user.id}</div>
                    </td>
                    <td className="p-3">
                      <select value={user.role} onChange={(e) => handleChangeRole(user.id, e.target.value)} className="bg-gray-50 border border-gray-200 text-xs rounded px-1.5 py-0.5">
                        <option value="LEARNER">LEARNER</option>
                        <option value="CREATOR">CREATOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <Badge className={user.status === "ACTIVE" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}>{user.status}</Badge>
                    </td>
                    <td className="p-3 text-gray-500">{user.joined}</td>
                    <td className="p-3 text-right">
                      <Button size="sm" variant="outline" onClick={() => handleToggleFreeze(user.id, user.status)} className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50 gap-1">
                        {user.status === "ACTIVE" ? <><Lock className="h-3 w-3" /> Freeze</> : <><Unlock className="h-3 w-3" /> Unfreeze</>}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
