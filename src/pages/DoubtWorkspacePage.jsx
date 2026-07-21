import React, { useState } from "react";
import { Video, Calendar, Clock, CheckCircle2, XCircle, ExternalLink, Plus, MessageSquare, ShieldCheck, User, Settings, Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Initial doubt sessions dataset
import { DOUBT_SESSIONS } from "@/data/mockData";

/**
 * DoubtWorkspacePage Component (Module 8: Mentorship & Live Sessions)
 * Enables learners to choose date/time slots to book mentorship sessions, and creators to approve/reject requests or set availability.
 */
export default function DoubtWorkspacePage() {
  const [sessions, setSessions] = useState(DOUBT_SESSIONS);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  // Booking Form State
  const [topic, setTopic] = useState("");
  const [creatorName, setCreatorName] = useState("Rohan Verma");
  const [selectedDate, setSelectedDate] = useState("2026-07-22");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM - 10:45 AM");
  const [duration, setDuration] = useState("45");
  const [price, setPrice] = useState("350");

  // Available Time Slots Mock
  const availableSlots = [
    "10:00 AM - 10:45 AM",
    "02:00 PM - 02:45 PM",
    "05:00 PM - 05:45 PM",
    "08:00 PM - 08:45 PM"
  ];

  // Creator Approval Handlers
  const handleApproveSession = (id) => {
    setSessions(prev =>
      prev.map(s => s.id === id ? { ...s, booking_status: "APPROVED" } : s)
    );
  };

  const handleRejectSession = (id) => {
    setSessions(prev =>
      prev.map(s => s.id === id ? { ...s, booking_status: "REJECTED" } : s)
    );
  };

  // Handle Book Session Submit
  const handleBookSession = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newSession = {
      id: Date.now(),
      learner_id: 101,
      creator_id: 202,
      topic: topic.trim(),
      scheduled_at: `${selectedDate} T ${selectedTimeSlot.split(' - ')[0]}`,
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
              <Video className="h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Mentorship & Doubt Sessions Workspace
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Book live 1-on-1 video calls with top creators to clarify complex technical & architecture doubts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAvailabilityModal(true)}
              className="text-xs font-semibold gap-1.5 border-gray-200 dark:border-gray-800"
            >
              <Settings className="h-3.5 w-3.5 text-gray-500" /> Set Creator Slots
            </Button>
            <Button
              onClick={() => setShowBookingModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-2 px-4 py-2 shadow-sm"
            >
              <Plus className="h-4 w-4" /> Book New Session
            </Button>
          </div>
        </div>

        {/* Sessions List Card */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                
                {/* Session Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={
                      session.booking_status === "APPROVED" 
                        ? "bg-emerald-500 text-white text-[10px]" 
                        : session.booking_status === "REJECTED"
                        ? "bg-red-500 text-white text-[10px]"
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
                    <span className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
                      <Calendar className="h-3.5 w-3.5 text-indigo-500" /> {session.scheduled_at}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-indigo-500" /> {session.duration_minutes} mins
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">₹{session.session_price}</span>
                  </div>
                </div>

                {/* Session Actions */}
                <div className="flex items-center gap-2">
                  {session.booking_status === "APPROVED" ? (
                    <Button
                      onClick={() => alert(`Launching Jitsi Video Call: https://meet.jit.si/${session.jitsi_room_name}`)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-2 px-5 py-2.5 shadow-md"
                    >
                      <Video className="h-4 w-4" /> Join Jitsi Call
                    </Button>
                  ) : session.booking_status === "PENDING" ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveSession(session.id)}
                        className="bg-emerald-600 text-white text-xs font-bold gap-1"
                      >
                        <Check className="h-3.5 w-3.5" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectSession(session.id)}
                        className="border-red-200 text-red-600 text-xs font-bold gap-1"
                      >
                        <X className="h-3.5 w-3.5" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-lg">
                      Session Declined
                    </span>
                  )}
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Modal: Book Session with Date & Time Slot Picker */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Request 1-on-1 Mentorship</h3>
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
                <label className="font-bold text-gray-700 dark:text-gray-300">Select Creator / Mentor</label>
                <select
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-md p-2 text-xs"
                >
                  <option value="Rohan Verma">Rohan Verma (Java & Microservices)</option>
                  <option value="Priya Sharma">Priya Sharma (DSA & Algorithms)</option>
                  <option value="Arjun Mehta">Arjun Mehta (React & Web Dev)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Preferred Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-gray-50 dark:bg-black/20 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Available Time Slot</label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-md p-2 text-xs"
                  >
                    {availableSlots.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowBookingModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-indigo-600 text-white font-bold">Confirm & Request</Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal: Creator Availability Slot Setter */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Creator Availability Settings</h3>
              <button onClick={() => setShowAvailabilityModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="space-y-3 text-xs">
              <p className="text-gray-500">Configure your daily recurring time slots for student mentorship requests:</p>
              
              {availableSlots.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{slot}</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-300 text-[10px]">Active</Badge>
                </div>
              ))}
            </div>

            <Button onClick={() => setShowAvailabilityModal(false)} className="w-full bg-indigo-600 text-white font-bold text-xs">
              Save Slots Config
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
