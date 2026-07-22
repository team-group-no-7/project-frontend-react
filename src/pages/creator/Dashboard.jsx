import React from 'react'
import DashboardLayout from '../../components/creator/DashboardLayout'
import WelcomeBanner from '../../components/creator/WelcomeBanner'
import StatCard from '../../components/creator/StatCard'
import AnalyticsChart from '../../components/creator/AnalyticsChart'
import TopResources from '../../components/creator/TopResources'
import RecentResourcesTable from '../../components/creator/RecentResourcesTable'
import QuickActions from '../../components/creator/QuickActions'
import { stats, topResources, recentResources, quickActions } from '../../data/creator/dashboardData'

export default function Dashboard() {
    return (
        <DashboardLayout title="Creator Dashboard">
            <div className="max-w-8xl mx-auto">
                <WelcomeBanner />

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-8">
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            {stats.map((s) => (
                                <StatCard key={s.id} item={s} />
                            ))}
                        </div>

                        <AnalyticsChart />
                        <div className="mt-6">
                            <RecentResourcesTable items={recentResources} />
                        </div>
                    </div>

                    <div className="col-span-4 space-y-4">
                        <TopResources items={topResources} />
                        <QuickActions items={quickActions} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
