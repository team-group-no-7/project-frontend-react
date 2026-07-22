import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/creator/Dashboard'

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-slate-500 mt-2">Coming Soon</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/content-studio" element={<ComingSoon title="Content Studio" />} />
        <Route path="/my-resources" element={<ComingSoon title="My Resources" />} />
        <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
        <Route path="/earnings" element={<ComingSoon title="Earnings" />} />
        <Route path="/live-sessions" element={<ComingSoon title="Live Sessions" />} />
        <Route path="/community" element={<ComingSoon title="Community" />} />
        <Route path="/profile" element={<ComingSoon title="Profile" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Routes>
    </BrowserRouter>
  )
}
