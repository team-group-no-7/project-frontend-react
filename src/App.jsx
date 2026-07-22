import React, { useState } from 'react';
import { ShoppingBag, UploadCloud, LayoutGrid, User, Sparkles } from 'lucide-react';

// Import Module Pages
import MarketplacePage from './pages/MarketplacePage';
import ContentUploadPage from './pages/ContentUploadPage';
import ContentManagementGrid from './pages/ContentManagementGrid';
import ProfilePage from './pages/ProfilePage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import { Button } from './components/ui/button';

/**
 * App Root Component
 * Beginner-Friendly Main Navigation Orchestrator for LearnHub.
 * Allows switching between:
 *  - Marketplace Catalog
 *  - Public Creator Profile
 *  - Content Upload Form
 *  - Content Management Grid
 *  - User Profile
 */
function App() {
  // Navigation state: 'marketplace' | 'upload' | 'manage' | 'profile' | 'creator-profile'
  const [currentPage, setCurrentPage] = useState('marketplace');
  const [selectedCreatorId, setSelectedCreatorId] = useState(202);

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

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Application Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121124]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 lg:px-12 py-3 shadow-xs">
        <div className="w-full flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('marketplace')}>
            <div className="bg-indigo-600 text-white font-black text-xl px-2.5 py-1 rounded-lg tracking-wider shadow-sm">
              LH
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white block leading-none">
                LearnHub
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-widest block mt-0.5">
                Content Platform
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900/80 p-1 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
            
            {/* 1. Marketplace */}
            <Button
              size="sm"
              variant={currentPage === 'marketplace' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('marketplace')}
              className={`gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'marketplace'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Marketplace
            </Button>

            {/* 2. Public Creator Profile */}
            <Button
              size="sm"
              variant={currentPage === 'creator-profile' ? 'default' : 'ghost'}
              onClick={() => handleOpenCreatorProfile(202)}
              className={`gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'creator-profile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" /> Creator Profile
            </Button>

            {/* 3. Upload Form */}
            <Button
              size="sm"
              variant={currentPage === 'upload' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('upload')}
              className={`gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'upload'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <UploadCloud className="h-3.5 w-3.5" /> Publish Content
            </Button>

            {/* 4. Creator Management Grid */}
            <Button
              size="sm"
              variant={currentPage === 'manage' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('manage')}
              className={`gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'manage'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Management Grid
            </Button>

            {/* 5. User Account Profile */}
            <Button
              size="sm"
              variant={currentPage === 'profile' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('profile')}
              className={`gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'profile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <User className="h-3.5 w-3.5" /> My Account
            </Button>

          </nav>

        </div>
      </header>

      {/* View Router */}
      <div className="flex-1">
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
      </div>

    </div>
  );
}

export default App;
