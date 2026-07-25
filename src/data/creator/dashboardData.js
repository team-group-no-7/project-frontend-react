// Mock data for the Creator Dashboard
import { FileText, Eye, Users, IndianRupee, FileUp, PenTool, Calendar, BarChart2 } from 'lucide-react'

export const stats = [
    {
        id: 1,
        label: 'Total Resources',
        value: '24',
        delta: '+12% vs last month',
        icon: FileText,
        bg: 'bg-blue-50',
        color: 'text-blue-600',
    },
    {
        id: 2,
        label: 'Total Views',
        value: '12.5K',
        delta: '+18% vs last month',
        icon: Eye,
        bg: 'bg-blue-100',
        color: 'text-sky-600',
    },
    {
        id: 3,
        label: 'Total Learners',
        value: '3.2K',
        delta: '+14% vs last month',
        icon: Users,
        bg: 'bg-green-100',
        color: 'text-green-700',
    },
    {
        id: 4,
        label: 'Total Earnings',
        value: '₹48,650',
        delta: '+22% vs last month',
        icon: IndianRupee,
        bg: 'bg-amber-100',
        color: 'text-amber-700',
    },
]

// Analytics datasets for multiple ranges
export const analytics7 = [
    { date: '15 May', value: 700 },
    { date: '16 May', value: 1100 },
    { date: '17 May', value: 850 },
    { date: '18 May', value: 1600 },
    { date: '19 May', value: 1100 },
    { date: '20 May', value: 1400 },
    { date: '21 May', value: 1900 },
]

// Last 30 days (daily points)
export const analytics30 = Array.from({ length: 30 }).map((_, i) => {
    const day = i + 1
    return { date: `${day} Jun`, value: Math.round(600 + Math.sin(i / 3) * 300 + i * 10) }
})

// Last 3 months aggregated weekly (approx 12 weeks)
export const analytics90 = Array.from({ length: 12 }).map((_, i) => ({
    date: `Wk ${i + 1}`,
    value: Math.round(800 + Math.cos(i / 2) * 300 + i * 40),
}))

// Last 1 year aggregated monthly (12 months)
export const analytics365 = Array.from({ length: 12 }).map((_, i) => ({
    date: new Date(2025, i).toLocaleString('default', { month: 'short' }),
    value: Math.round(1000 + Math.sin(i / 2) * 500 + i * 20),
}))

// Helper to generate daily data for a custom ISO date range (inclusive)
export function generateRangeData(startISO, endISO) {
    const start = new Date(startISO)
    const end = new Date(endISO)
    if (isNaN(start) || isNaN(end) || start > end) return []
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1
    return Array.from({ length: days }).map((_, i) => {
        const d = new Date(start)
        d.setDate(start.getDate() + i)
        const iso = d.toISOString().slice(0, 10)
        // deterministic pseudo-random value based on day index
        const value = Math.round(700 + Math.abs(Math.sin(i / 5)) * 1200 + (i % 10) * 30)
        return { date: iso, value }
    })
}

export const topResources = [
    { id: 1, title: 'Data Structures Notes', type: 'PDF', views: '2.4K' },
    { id: 2, title: 'React Roadmap for Beginners', type: 'Article', views: '1.8K' },
    { id: 3, title: 'System Design Basics', type: 'PDF', views: '1.2K' },
    { id: 4, title: 'JavaScript Interview Questions', type: 'Article', views: '980' },
]

export const recentResources = [
    { id: 1, title: 'Operating System Notes', type: 'PDF', status: 'Published', updated: '20 May 2024', views: '1.1K' },
    { id: 2, title: 'Top 50 SQL Questions', type: 'Article', status: 'Draft', updated: '19 May 2024', views: '-' },
    { id: 3, title: 'Web Development Guide', type: 'Article', status: 'Published', updated: '18 May 2024', views: '860' },
    { id: 4, title: 'DBMS Important Questions', type: 'PDF', status: 'Published', updated: '17 May 2024', views: '920' },
]

export const quickActions = [
    { id: 1, title: 'Create PDF Resource', subtitle: 'Upload and publish PDF', icon: FileUp, color: 'bg-blue-50', accent: 'text-blue-600', to: '/content-studio?type=pdf' },
    { id: 2, title: 'Write Article', subtitle: 'Create new article', icon: PenTool, color: 'bg-blue-50', accent: 'text-blue-600', to: '/content-studio?type=article' },
    { id: 3, title: 'Schedule Live Session', subtitle: 'Connect with learners', icon: Calendar, color: 'bg-blue-50', accent: 'text-blue-600' },
    { id: 4, title: 'View Analytics', subtitle: 'Track your performance', icon: BarChart2, color: 'bg-blue-50', accent: 'text-blue-600' },
]
