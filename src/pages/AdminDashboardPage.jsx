import React, { useState, useMemo } from "react";
import { 
  ShieldAlert, Users, FileText, DollarSign, CheckCircle2, Lock, Unlock, 
  Search, BarChart3, AlertCircle, ShieldCheck, HeartPulse, RefreshCw, Flag, Trash2
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/**
 * AdminDashboardPage Component (Module 10: Central Admin Control Panel [Large])
 * Managed by: Shubham (CDAC Final Project)
 * 
 * Provides an executive dashboard for overall platform moderation:
 *  - Tab 1: Platform Analytics & Service Health
 *  - Tab 2: User Moderation (Role changing, account freezing)
 *  - Tab 3: Resource Governance (Approving, rejecting, and flagging uploaded PDFs)
 *  - Tab 4: Transaction Ledger (Razorpay checkout logs tracking payment receipts)
 */
export default function AdminDashboardPage() {
  // Navigation tabs selection state: 'ANALYTICS' | 'USERS' | 'RESOURCES' | 'TRANSACTIONS'
  const [activeTab, setActiveTab] = useState("ANALYTICS");

  // Feedback banner state
  const [notification, setNotification] = useState("");

  // Search filter query states
  const [searchUser, setSearchUser] = useState("");
  const [searchResource, setSearchResource] = useState("");
  const [searchTxn, setSearchTxn] = useState("");

  // 1. Users Mock Database State (Conforms to USERS table schema)
  const [usersList, setUsersList] = useState([
    { id: 101, name: "Arjun Mehta", email: "arjun.mehta@learnhub.com", role: "LEARNER", status: "ACTIVE", joined: "22-05-2026" },
    { id: 202, name: "Rohan Verma", email: "rohan.verma@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "10-04-2026" },
    { id: 203, name: "Priya Sharma", email: "priya.sharma@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "22-03-2026" },
    { id: 304, name: "Vikram Singh", email: "vikram.s@learnhub.com", role: "LEARNER", status: "FROZEN", joined: "01-06-2026" },
    { id: 405, name: "Neha Gupta", email: "neha.gupta@learnhub.com", role: "CREATOR", status: "ACTIVE", joined: "14-02-2026" }
  ]);

  // 2. Resources Mock Database State (Conforms to CONTENTS table schema)
  const [resourcesList, setResourcesList] = useState([
    { id: 11, title: "Complete Java Spring Boot Guide", creator: "Rohan Verma", category: "Java", price: 599, status: "APPROVED", reports: 0 },
    { id: 12, title: "LeetCode Dynamic Programming Mastery", creator: "Priya Sharma", category: "DSA", price: 399, status: "PENDING", reports: 2 },
    { id: 13, title: "React 19 Hooks & Rendering Optimization", creator: "Arjun Mehta", category: "Web Dev", price: 299, status: "APPROVED", reports: 0 },
    { id: 14, title: "Low-Level System Design Handbook", creator: "Arjun Mehta", category: "System Design", price: 499, status: "FLAGGED", reports: 5 },
    { id: 15, title: "Kubernetes & Docker Microservices", creator: "Vikram Singh", category: "DevOps", price: 799, status: "PENDING", reports: 1 }
  ]);

  // 3. Transactions Mock Database State (Conforms to PURCHASES table schema)
  const [transactionsList, setTransactionsList] = useState([
    { id: "pay_N8s92f1Kds", user: "Arjun Mehta", item: "Complete Java Spring Boot Guide", amount: 707, date: "2026-07-22 10:30 AM", status: "SUCCESS" },
    { id: "pay_FAIL_M9a73", user: "Vikram Singh", item: "Low-Level System Design Handbook", amount: 588, date: "2026-07-21 02:15 PM", status: "FAILED" },
    { id: "pay_K8d82j1Hda", user: "Neha Gupta", item: "LeetCode Dynamic Programming Mastery", amount: 470, date: "2026-07-20 05:45 PM", status: "SUCCESS" },
    { id: "pay_P8q12k1Jsd", user: "Arjun Mehta", item: "React 19 Hooks & Rendering Optimization", amount: 352, date: "2026-07-18 11:20 AM", status: "SUCCESS" }
  ]);

  // UI toast notifier trigger
  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  // User Management Actions
  const handleToggleFreeze = (id, currentStatus) => {
    const nextStatus = currentStatus === "ACTIVE" ? "FROZEN" : "ACTIVE";
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: nextStatus } : u));
    triggerNotification(`Account status for User #${id} successfully updated to ${nextStatus}.`);
  };

  const handleChangeRole = (id, newRole) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    triggerNotification(`Account role for User #${id} successfully updated to ${newRole}.`);
  };

  // Resource Moderation Actions
  const handleModerateResource = (id, newStatus) => {
    setResourcesList(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    triggerNotification(`Resource #${id} status changed to ${newStatus}.`);
  };

  const handleFlagResource = (id) => {
    setResourcesList(prev => prev.map(r => r.id === id ? { ...r, status: "FLAGGED", reports: r.reports + 1 } : r));
    triggerNotification(`Resource #${id} has been flagged for administrative review.`);
  };

  // Filter calculations using useMemo for render performance
  const filteredUsers = useMemo(() => {
    return usersList.filter(u => 
      !searchUser.trim() ||
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.role.toLowerCase().includes(searchUser.toLowerCase())
    );
  }, [usersList, searchUser]);

  const filteredResources = useMemo(() => {
    return resourcesList.filter(r => 
      !searchResource.trim() ||
      r.title.toLowerCase().includes(searchResource.toLowerCase()) ||
      r.creator.toLowerCase().includes(searchResource.toLowerCase()) ||
      r.category.toLowerCase().includes(searchResource.toLowerCase())
    );
  }, [resourcesList, searchResource]);

  const filteredTransactions = useMemo(() => {
    return transactionsList.filter(t => 
      !searchTxn.trim() ||
      t.id.toLowerCase().includes(searchTxn.toLowerCase()) ||
      t.user.toLowerCase().includes(searchTxn.toLowerCase()) ||
      t.item.toLowerCase().includes(searchTxn.toLowerCase())
    );
  }, [transactionsList, searchTxn]);

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Executive Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-xs font-bold px-2.5 py-0.5 rounded">
              <ShieldAlert className="h-3.5 w-3.5" /> Module 10: Executive Control Panel
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Platform Administration & Oversight
            </h1>
            <p className="text-xs text-gray-500">
              Central workspace for platform analytics, user privilege moderation, resource governance, and transactional health logs.
            </p>
          </div>

          {/* Unified Tab Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
            {[
              { id: "ANALYTICS", label: "Analytics", icon: BarChart3 },
              { id: "USERS", label: "Users", icon: Users },
              { id: "RESOURCES", label: "Resources", icon: FileText },
              { id: "TRANSACTIONS", label: "Transactions", icon: DollarSign }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-[#121124] text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Notification Toast Banner */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span>{notification}</span>
          </div>
        )}

        {/* -------------------- VIEW 1: PLATFORM ANALYTICS -------------------- */}
        {activeTab === "ANALYTICS" && (
          <div className="space-y-6">
            
            {/* Top Overview Metric Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-white dark:bg-[#121124] space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Total Users</span>
                  <Users className="h-4 w-4 text-indigo-500" />
                </div>
                <div className="text-xl font-bold">50,420</div>
                <span className="text-[10px] text-emerald-600 font-bold">+12% this month</span>
              </Card>

              <Card className="p-4 bg-white dark:bg-[#121124] space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Active Notes (PDFs)</span>
                  <FileText className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-xl font-bold">10,245</div>
                <span className="text-[10px] text-gray-400">Resource files online</span>
              </Card>

              <Card className="p-4 bg-white dark:bg-[#121124] space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Sales Volume</span>
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-emerald-600">₹2.45 Cr</div>
                <span className="text-[10px] text-gray-400">Razorpay processed volume</span>
              </Card>

              <Card className="p-4 bg-white dark:bg-[#121124] space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Platform Health</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">99.98%</div>
                <span className="text-[10px] text-emerald-600 font-bold">Services Status Green</span>
              </Card>
            </div>

            {/* CSS Sales Growth Chart Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Visual Graph Panel */}
              <Card className="md:col-span-2 p-5 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 space-y-4 rounded-2xl shadow-xs">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                  <div>
                    <h3 className="font-bold text-sm">Monthly Transaction Growth</h3>
                    <p className="text-[10px] text-gray-400">Sales volume ledger index</p>
                  </div>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 text-[10px]">Year 2026</Badge>
                </div>
                
                {/* CSS Bar Chart */}
                <div className="h-44 flex items-end justify-between gap-4 pt-6 px-2 border-b border-gray-100 dark:border-gray-800">
                  {[
                    { month: "Jan", sales: 34 },
                    { month: "Feb", sales: 48 },
                    { month: "Mar", sales: 65 },
                    { month: "Apr", sales: 72 },
                    { month: "May", sales: 94 }
                  ].map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                      <span className="text-[9px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">₹{data.sales}k</span>
                      <div style={{ height: `${data.sales}%` }} className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md group-hover:from-indigo-500" />
                      <span className="text-[10px] text-gray-400">{data.month}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Service Health Monitoring Panel */}
              <Card className="p-5 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 space-y-4 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                  <HeartPulse className="h-4 w-4 text-rose-500" />
                  <h3 className="font-bold text-sm">Services Infrastructure Status</h3>
                </div>

                <div className="space-y-3.5 text-xs">
                  {[
                    { service: "Spring Boot Web Monolith", desc: "Running on HostPort 8080", status: "HEALTHY" },
                    { service: "PostgreSQL Database Engine", desc: "Active connection pool", status: "HEALTHY" },
                    { service: "Razorpay Payment Gateway", desc: "Webhook trigger verified", status: "HEALTHY" },
                    { service: "Jitsi Live Session Server", desc: "Interactive RTC channel active", status: "HEALTHY" }
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <span className="font-bold block text-gray-900 dark:text-white">{s.service}</span>
                        <span className="text-[10px] text-gray-500 block">{s.desc}</span>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-300 text-[9px] px-1 py-0">{s.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        )}

        {/* -------------------- VIEW 2: USER PRIVILEGE MODERATION -------------------- */}
        {activeTab === "USERS" && (
          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
              <div>
                <CardTitle className="text-sm font-bold">User System Control Ledger</CardTitle>
                <CardDescription className="text-xs">Search registered profile accounts, adjust access roles, or freeze profiles.</CardDescription>
              </div>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input 
                  placeholder="Search user name or role..." 
                  value={searchUser} 
                  onChange={(e) => setSearchUser(e.target.value)} 
                  className="pl-9 text-xs" 
                />
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50/80 font-semibold uppercase text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="p-3.5">User Identity Profile</th>
                    <th className="p-3.5">Assigned Role</th>
                    <th className="p-3.5">Access State</th>
                    <th className="p-3.5">Joined Date</th>
                    <th className="p-3.5 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/40">
                        <td className="p-3.5">
                          <div className="font-bold text-gray-900 dark:text-white text-sm">{user.name}</div>
                          <div className="text-[10px] text-gray-400">{user.email} • User ID #{user.id}</div>
                        </td>
                        <td className="p-3.5">
                          <select 
                            value={user.role} 
                            onChange={(e) => handleChangeRole(user.id, e.target.value)} 
                            className="bg-gray-50 border border-gray-200 text-xs rounded px-1.5 py-0.5 text-gray-700 dark:text-gray-300 font-semibold"
                          >
                            <option value="LEARNER">LEARNER</option>
                            <option value="CREATOR">CREATOR</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                        <td className="p-3.5">
                          <Badge className={user.status === "ACTIVE" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-gray-500 font-semibold">{user.joined}</td>
                        <td className="p-3.5 text-right">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleToggleFreeze(user.id, user.status)} 
                            className={`h-7 text-xs gap-1 font-bold ${
                              user.status === "ACTIVE" ? "border-red-200 text-red-600 hover:bg-red-50" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            }`}
                          >
                            {user.status === "ACTIVE" ? <><Lock className="h-3 w-3" /> Freeze</> : <><Unlock className="h-3 w-3" /> Unfreeze</>}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-400">No profile matches found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* -------------------- VIEW 3: RESOURCE GOVERNANCE -------------------- */}
        {activeTab === "RESOURCES" && (
          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
              <div>
                <CardTitle className="text-sm font-bold">Content Security & Resource Governance</CardTitle>
                <CardDescription className="text-xs">Moderate creator uploads (Approve, Reject, or Flag reported spam PDFs).</CardDescription>
              </div>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input 
                  placeholder="Search resources, topics..." 
                  value={searchResource} 
                  onChange={(e) => setSearchResource(e.target.value)} 
                  className="pl-9 text-xs" 
                />
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50/80 font-semibold uppercase text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="p-3.5">Uploaded File Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Publisher</th>
                    <th className="p-3.5">Reports</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Moderation Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((res) => (
                      <tr key={res.id} className="hover:bg-gray-50/40">
                        <td className="p-3.5">
                          <div className="font-bold text-gray-900 dark:text-white text-sm">{res.title}</div>
                          <div className="text-[10px] text-gray-400">Resource ID #{res.id} • Base price: ₹{res.price}</div>
                        </td>
                        <td className="p-3.5">
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 font-semibold">{res.category}</Badge>
                        </td>
                        <td className="p-3.5 text-gray-700 dark:text-gray-300 font-semibold">{res.creator}</td>
                        <td className="p-3.5 font-bold">
                          <span className={res.reports > 0 ? "text-red-500 font-extrabold" : "text-gray-400"}>
                            {res.reports} Reports
                          </span>
                        </td>
                        <td className="p-3.5">
                          <Badge className={
                            res.status === "APPROVED" ? "bg-emerald-500 text-white" : 
                            res.status === "FLAGGED" ? "bg-red-500 text-white animate-pulse" : 
                            "bg-amber-500 text-white"
                          }>
                            {res.status}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {res.status !== "APPROVED" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleModerateResource(res.id, "APPROVED")} 
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold h-7 py-1 px-2.5"
                              >
                                Approve
                              </Button>
                            )}
                            {res.status !== "FLAGGED" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleFlagResource(res.id)} 
                                variant="outline" 
                                className="border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-bold h-7 py-1 px-2.5"
                              >
                                <Flag className="h-3 w-3 shrink-0" /> Flag
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-400">No resources matched the filter query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* -------------------- VIEW 4: TRANSACTION LEDGER -------------------- */}
        {activeTab === "TRANSACTIONS" && (
          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
              <div>
                <CardTitle className="text-sm font-bold">Razorpay Financial Transaction Log</CardTitle>
                <CardDescription className="text-xs">Live checkouts ledger audit trail monitoring payment completions.</CardDescription>
              </div>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input 
                  placeholder="Search Txn ID or User..." 
                  value={searchTxn} 
                  onChange={(e) => setSearchTxn(e.target.value)} 
                  className="pl-9 text-xs" 
                />
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50/80 font-semibold uppercase text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="p-3.5">Razorpay Txn Token</th>
                    <th className="p-3.5">Purchaser</th>
                    <th className="p-3.5">Unlocked Content</th>
                    <th className="p-3.5">Amount Paid</th>
                    <th className="p-3.5">Checkout Timestamp</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/40">
                        <td className="p-3.5 font-mono font-bold text-gray-800 dark:text-gray-200">{tx.id}</td>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-white">{tx.user}</td>
                        <td className="p-3.5 font-semibold text-gray-600 dark:text-gray-300 max-w-[200px] truncate">{tx.item}</td>
                        <td className="p-3.5 font-bold text-sm text-gray-900 dark:text-white">₹{tx.amount}</td>
                        <td className="p-3.5 text-gray-500 font-semibold">{tx.date}</td>
                        <td className="p-3.5 text-right">
                          <Badge className={tx.status === "SUCCESS" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}>
                            {tx.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-400">No transaction logs match search query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
