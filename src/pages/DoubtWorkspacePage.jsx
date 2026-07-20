import React, { useState } from "react";
import { Video, Calendar, Clock, CheckCircle2, XCircle, ExternalLink, Plus, MessageSquare, ShieldCheck, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Initial doubt sessions dataset
import { DOUBT_SESSIONS } from "@/data/mockData";

/**
 * DoubtWorkspacePage Component (Module 4 - Item 14: Doubt Session Workspace Page)
 * Interactive workspace to request 1-on-1 video sessions with creators and launch Jitsi call rooms.
 */
export default function DoubtWorkspacePage() {
  const [sessions, setSessions] = useState(DOUBT_SESSIONS);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // New session booking form state
  const [topic, setTopic] = useState("");
  const [creatorName, setCreatorName] = useState("Rohan Verma");
  const [duration, setDuration] = useState("45");
  const [price, setPrice] = useState("350");

  // Handle book new session submit
  const handleBookSession = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newSession = {
      id: Date.now(),
      learner_id: 101,
      creator_id: 202,
      topic: topic.trim(),
      scheduled_at: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      duration_minutes: parseInt(duration),
      session_price: parseFloat(price),
      booking_status: "PENDING",
      payment_status: "PAID",
      transaction_id: "txn_" + Math.random().toString(36).substr(2, 8),
      jitsi_room_name: "learnhub-doubt-" + Math.random().toString(36).substr(2, 6)
    };

    setSessions([newSession, ...sessions]);
    setShowBookingModal(false);
    setTopic("");
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-6 space-y-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Workspace Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Video className="h-6 w-6 text-indigo-600 dark:text-indigo-400" /> 1-on-1 Doubt Sessions Workspace
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Book live video calls with top creators to clarify complex code & architecture doubts.
            </p>
          </div>

          <Button
            onClick={() => setShowBookingModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-2 px-5 py-2.5 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Book New Session
          </Button>
        </div>

        {/* Sessions List Card */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                
                {/* Session Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={
                      session.booking_status === "APPROVED" 
                        ? "bg-emerald-500 text-white text-[10px]" 
                        : "bg-amber-500 text-white text-[10px]"
                    }>
                      {session.booking_status}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-emerald-500 text-emerald-600">
                      Payment {session.payment_status}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    {session.topic}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-indigo-500" /> {new Date(session.scheduled_at).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-indigo-500" /> {session.duration_minutes} mins
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">₹{session.session_price}</span>
                  </div>
                </div>

                {/* Video Action Button */}
                <div>
                  {session.booking_status === "APPROVED" ? (
                    <Button
                      onClick={() => alert(`Launching Jitsi Video Call: https://meet.jit.si/${session.jitsi_room_name}`)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-2 px-5 py-2.5 shadow-md"
                    >
                      <Video className="h-4 w-4" /> Join Jitsi Room
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="text-xs text-amber-600 border-amber-300">
                      Pending Creator Approval
                    </Button>
                  )}
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Booking Form Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Request Doubt Session</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Doubt Topic *</label>
                <Input
                  placeholder="e.g. Spring Boot Transaction rollback mechanics"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-gray-50 dark:bg-black/20 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Select Creator</label>
                <select
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-md p-2 text-xs"
                >
                  <option value="Rohan Verma">Rohan Verma (Java Microservices)</option>
                  <option value="Priya Sharma">Priya Sharma (DSA & Algorithms)</option>
                  <option value="Arjun Mehta">Arjun Mehta (React & Frontend)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-md p-2 text-xs"
                  >
                    <option value="30">30 Mins (₹250)</option>
                    <option value="45">45 Mins (₹350)</option>
                    <option value="60">60 Mins (₹500)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Session Fee</label>
                  <Input disabled value={`₹${price}`} className="bg-gray-100 dark:bg-gray-900 text-xs font-bold" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowBookingModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-indigo-600 text-white font-bold">Request & Pay</Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
