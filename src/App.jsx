import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/creator/DashboardLayout'
import Dashboard from './pages/creator/Dashboard'
import ComingSoon from './pages/ComingSoon'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/content-studio" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/my-resources" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/earnings" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/live-sessions" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/community" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><ComingSoon /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
