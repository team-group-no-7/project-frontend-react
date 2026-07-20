import React, { useState } from 'react';
import { ShoppingBag, User } from 'lucide-react';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import { Button } from './components/ui/button';

/**
 * App Root Component
 * Beginner-Friendly Main Navigation Orchestrator for LearnHub.
 * Switches active view between "Marketplace Catalog" and "My Profile".
 */
function App() {
  const [currentPage, setCurrentPage] = useState('marketplace'); // 'marketplace' vs 'profile'

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Application Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121124]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
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

          {/* Navigation Buttons */}
          <nav className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900/80 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
            <Button
              size="sm"
              variant={currentPage === 'marketplace' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('marketplace')}
              className={`gap-2 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'marketplace'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <ShoppingBag className="h-4 w-4" /> Marketplace
            </Button>

            <Button
              size="sm"
              variant={currentPage === 'profile' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('profile')}
              className={`gap-2 text-xs font-semibold rounded-lg transition-all ${
                currentPage === 'profile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
              }`}
            >
              <User className="h-4 w-4" /> My Profile
            </Button>
          </nav>

        </div>
      </header>

      {/* Page Content View Router */}
      <div className="flex-1">
        {currentPage === 'marketplace' ? (
          <MarketplacePage onNavigateToProfile={() => setCurrentPage('profile')} />
        ) : (
          <ProfilePage />
        )}
      </div>

    </div>
  );
}

export default App;
