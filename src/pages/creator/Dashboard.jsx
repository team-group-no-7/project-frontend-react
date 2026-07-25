import React from 'react'
import WelcomeBanner from '../../components/creator/WelcomeBanner'
import StatCard from '../../components/creator/StatCard'
import RecentResourcesTable from '../../components/creator/RecentResourcesTable'
import { FileText, Users, IndianRupee } from 'lucide-react'
import { MARKETPLACE_CONTENTS } from '../../data/mockData'

export default function Dashboard({ profile, uploadedContents, onChangePage }) {
    const creatorId = profile?.id || 101;
    
    // Filter marketplace contents belonging to this creator
    const creatorItems = MARKETPLACE_CONTENTS.filter(item => item.creator_id === creatorId);
    
    // Dynamically calculate statistics from mockData.js
    const totalResources = creatorItems.length;
    const totalLearners = creatorItems.reduce((sum, item) => sum + (item.learners_count || 0), 0);
    const totalEarnings = creatorItems.reduce((sum, item) => sum + ((item.learners_count || 0) * (item.price || 0)), 0);

    const statsData = [
        {
            id: 1,
            label: 'Total Resources',
            value: totalResources.toString(),
            delta: 'Synchronized with Database',
            icon: FileText,
            bg: 'bg-blue-50',
            color: 'text-blue-600',
        },
        {
            id: 2,
            label: 'Total Learners',
            value: totalLearners >= 1000 ? `${(totalLearners / 1000).toFixed(1)}K` : totalLearners.toString(),
            delta: 'Active enrolled learners',
            icon: Users,
            bg: 'bg-green-100',
            color: 'text-green-700',
        },
        {
            id: 3,
            label: 'Total Earnings',
            value: `₹${totalEarnings.toLocaleString('en-IN')}`,
            delta: 'Estimated course revenue',
            icon: IndianRupee,
            bg: 'bg-amber-100',
            color: 'text-amber-700',
        },
    ];

    // Build resources list dynamically from mockData.js
    const recentResources = creatorItems.map(item => ({
        id: item.id,
        title: item.title,
        type: item.type || 'Handbook',
        status: 'Published',
        updated: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '24 May 2026',
        views: item.learners_count ? `${Math.round(item.learners_count * 1.4)}` : '0'
    }));

    return (
        <div className="max-w-8xl mx-auto space-y-6">
            <WelcomeBanner profile={profile} onCreateResource={() => onChangePage && onChangePage('content-studio')} />

            {/* 3-column stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsData.map((s) => (
                    <StatCard key={s.id} item={s} />
                ))}
            </div>

            {/* 12-column full screen wide recent resources table */}
            <div className="w-full">
                <RecentResourcesTable items={recentResources} />
            </div>
        </div>
    )
}


