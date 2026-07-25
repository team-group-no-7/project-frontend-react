import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * JitsiCallPage Component (Module 8: Live Mentorship Call Screen)
 * Developed by: Team Member (CDAC Final Project)
 * 
 * Embedded Jitsi meeting frame launcher.
 */
export default function JitsiCallPage({ session, userName = "Learner", onDisconnect }) {
  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0b0a14] text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-[#121124] border-b border-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full animate-pulse">LIVE CALL</span>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-gray-100">{session.topic}</h1>
            <p className="text-[10px] text-gray-500">Duration: {session.duration_minutes} Mins • Secure Embed</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onDisconnect} className="border-red-500 text-red-500 hover:bg-red-600 hover:text-white text-xs rounded-xl font-bold transition-all">
          Disconnect & Exit
        </Button>
      </header>
      {/* Jitsi Meeting Iframe */}
      <div className="flex-1 flex items-center justify-center p-4">
        <iframe 
          src={`https://meet.jit.si/${session.jitsi_room_name}#userInfo.displayName="${userName}"`} 
          className="w-full max-w-5xl h-[550px] rounded-2xl border border-gray-800 shadow-2xl"
          allow="camera; microphone; fullscreen; display-capture; autoplay"
        />
      </div>
    </div>
  );
}
