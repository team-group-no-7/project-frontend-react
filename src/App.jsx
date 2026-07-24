import React, { useState } from 'react';
import { ShoppingBag, UploadCloud, LayoutGrid, User, Sparkles, ShieldAlert } from 'lucide-react';

// Import Module Pages
import MarketplacePage from './pages/MarketplacePage';
import ContentUploadPage from './pages/ContentUploadPage';
import ContentManagementGrid from './pages/ContentManagementGrid';
import ProfilePage from './pages/ProfilePage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Import Layout Components
import DashboardLayout from './components/creator/DashboardLayout';
import { INITIAL_USER } from './data/mockData';

const getPageTitle = (page) => {
  const titles = {
    'marketplace': 'Marketplace Catalog',
    'creator-profile': 'Creator Profile',
    'upload': 'Publish Content',
    'manage': 'Management Grid',
    'profile': 'My Account',
    'admin': 'Admin Panel'
  };
  return titles[page] || 'LearnHub';
};

/**
 * App Root Component
 * Main Navigation Orchestrator for LearnHub with vertical side navbar and top navbar layout.
 */
function App() {
  // Navigation state: 'marketplace' | 'upload' | 'manage' | 'profile' | 'creator-profile' | 'admin'
  const [currentPage, setCurrentPage] = useState('marketplace');
  const [selectedCreatorId, setSelectedCreatorId] = useState(202);
  const [profile, setProfile] = useState(INITIAL_USER);

  // Switch view to public creator profile
  const handleOpenCreatorProfile = (id = 202) => {
    setSelectedCreatorId(id);
    setCurrentPage('creator-profile');
  };

  // Callback when a creator successfully uploads new content
  const handleUploadSuccess = (newContent) => {
    alert(`Successfully published "${newContent.title}"! Redirecting to Management Grid...`);
    setCurrentPage('manage');
  };

  // Handle switching learner vs creator modes globally
  const handleSwitchRole = () => {
    setProfile((prev) => ({
      ...prev,
      role: prev.role === 'LEARNER' ? 'CREATOR' : 'LEARNER'
    }));
  };

  return (
    <DashboardLayout
      title={getPageTitle(currentPage)}
      currentPage={currentPage}
      onChangePage={setCurrentPage}
      profile={profile}
      onSwitchRole={handleSwitchRole}
    >
      {currentPage === 'marketplace' && (
        <MarketplacePage
          onNavigateToProfile={() => setCurrentPage('profile')}
          onOpenCreatorProfile={(id) => handleOpenCreatorProfile(id)}
        />
      )}

      {currentPage === 'creator-profile' && (
        <CreatorProfilePage
          creatorId={selectedCreatorId}
          onBack={() => setCurrentPage('marketplace')}
          onSelectCreator={(id) => setSelectedCreatorId(id)}
        />
      )}
      
      {currentPage === 'upload' && (
        <ContentUploadPage
          onUploadSuccess={handleUploadSuccess}
          onCancel={() => setCurrentPage('manage')}
        />
      )}

      {currentPage === 'manage' && (
        <ContentManagementGrid
          onOpenUploadForm={() => setCurrentPage('upload')}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage />
      )}

      {currentPage === 'admin' && (
        <AdminDashboardPage />
      )}
    </DashboardLayout>
  );
}

export default App;
