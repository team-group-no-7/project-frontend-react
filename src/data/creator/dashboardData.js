// Mock data for the Creator Dashboard
export const stats = [
    { id: 1, title: 'Total Resources', value: '24', change: '+12%' },
    { id: 2, title: 'Total Views', value: '12.5K', change: '+18%' },
    { id: 3, title: 'Total Learners', value: '3.2K', change: '+14%' },
    { id: 4, title: 'Total Earnings', value: '₹48,650', change: '+22%' },
];

export const topResources = [
    { id: 1, title: 'Data Structures Notes', type: 'PDF', views: '2.4K' },
    { id: 2, title: 'React Roadmap for Beginners', type: 'Article', views: '1.8K' },
    { id: 3, title: 'System Design Basics', type: 'PDF', views: '1.2K' },
    { id: 4, title: 'JavaScript Interview Questions', type: 'Article', views: '980' },
];

export const recentResources = [
    { id: 1, title: 'Operating System Notes', type: 'PDF', status: 'Published', updated: '20 May 2024', views: '1.1K' },
    { id: 2, title: 'Top 50 SQL Questions', type: 'Article', status: 'Draft', updated: '19 May 2024', views: '--' },
    { id: 3, title: 'Web Development Guide', type: 'Article', status: 'Published', updated: '18 May 2024', views: '860' },
    { id: 4, title: 'DBMS Important Questions', type: 'PDF', status: 'Published', updated: '17 May 2024', views: '920' },
];

export default { stats, topResources, recentResources };
