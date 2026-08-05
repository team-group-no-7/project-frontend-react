import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeBanner from '../../components/creator/WelcomeBanner';
import StatCard from '../../components/creator/StatCard';
import RecentResourcesTable from '../../components/creator/RecentResourcesTable';
import { FileText, Users, IndianRupee } from 'lucide-react';
import api from '../../utils/api';

export default function Dashboard({ profile, uploadedContents = [], marketplaceContents = [], onChangePage }) {
    const navigate = useNavigate();
    const creatorId = profile?.id || 101;

    const [dbResources, setDbResources] = useState([]);

    useEffect(() => {
        api.get("/api/creator/content/my-resources")
            .then((res) => {
                const list = res.data?.data || res.data || [];
                if (Array.isArray(list)) {
                    setDbResources(list);
                }
            })
            .catch((err) => {
                console.error("Dashboard fetch error:", err);
            });
    }, []);

    // Use dbResources fetched directly from Spring Boot backend, or fallback to uploadedContents
    const creatorItems = dbResources.length > 0 
        ? dbResources 
        : (uploadedContents || []).filter(item => 
            String(item.creator_id) === String(creatorId) || 
            String(item.creatorId) === String(creatorId)
          );
    
    // Dynamically calculate statistics from DB creator items
    const totalResources = creatorItems.length;
    const totalLearners = creatorItems.reduce((sum, item) => sum + Number(item.learnersCount || item.learners_count || 0), 0);

    // Total Earnings = Sum of (Learners Purchase Count * Content Price)
    const totalEarnings = creatorItems.reduce((sum, item) => {
        const learnersCount = Number(item.learnersCount || item.learners_count || 0);
        const price = parseFloat(item.price) || 0;
        return sum + (learnersCount * price);
    }, 0);

    const statsData = [
        {
            id: 1,
            label: 'Total Resources',
            value: totalResources.toString(),
            delta: 'Total resources published',
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

    // Build resources list dynamically from DB creator items
    const recentResources = creatorItems.map(item => ({
        id: item.id || Date.now(),
        title: item.title || "Untitled Resource",
        type: item.type || 'PDF Guide',
        status: (item.status || 'PUBLISHED').toUpperCase() === 'PUBLISHED' ? 'Published' : 'Draft',
        updated: item.created_at || item.createdAt ? new Date(item.created_at || item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        views: (item.learners_count || item.learnersCount || 0).toString()
    }));

    return (
        <div className="max-w-8xl mx-auto space-y-6">
            <WelcomeBanner 
                profile={profile} 
                onCreateResource={() => {
                    if (onChangePage) onChangePage('content-studio');
                    else navigate('/creator/studio');
                }} 
            />

            {/* 3-column stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsData.map((s) => (
                    <StatCard key={s.id} item={s} />
                ))}
            </div>

            {/* Recent resources table */}
            <div className="w-full">
                <RecentResourcesTable items={recentResources} />
            </div>
        </div>
    );
}


