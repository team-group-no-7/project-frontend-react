import React, { useState } from 'react';
import { Home, ShoppingBag, UploadCloud, LayoutGrid, User, LogIn, LogOut } from 'lucide-react';

// Import All Module 1 & Module 2 Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import ContentUploadPage from './pages/ContentUploadPage';
import ContentManagementGrid from './pages/ContentManagementGrid';
import ProfilePage from './pages/ProfilePage';
import { Button } from './components/ui/button';
import { INITIAL_USER } from './data/mockData';

/**
 * App Root Component
 * Main Navigation & State Orchestrator for LearnHub (Modules 1 & 2 Complete)
 */
function App() {
  // Navigation State: 'landing' | 'login' | 'register' | 'marketplace' | 'upload' | 'manage' | 'profile'
  const [currentPage, setCurrentPage] = useState('landing');
  
  // Auth User State
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default logged in for easy demo

  // Handle Login success
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('marketplace');
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("learnhub_token");
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121124]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('landing')}>
            <div className="bg-indigo-600 text-white font-black text-xl px-2.5 py-1 rounded-lg tracking-wider shadow-sm">
              LH
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white block leading-none">
                LearnHub
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-widest block mt-0.5">
                Modules 1 & 2 Active
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900/80 p-1 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
            
            {/* Landing */}
            <Button
              size="sm"
              variant={currentPage === 'landing' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('landing')}
              className={`gap-1 text-xs font-semibold rounded-lg ${
                currentPage === 'landing' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Home className="h-3.5 w-3.5" /> Home
            </Button>

            {/* Marketplace */}
            <Button
              size="sm"
              variant={currentPage === 'marketplace' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('marketplace')}
              className={`gap-1 text-xs font-semibold rounded-lg ${
                currentPage === 'marketplace' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Catalog
            </Button>

            {/* Upload Form */}
            <Button
              size="sm"
              variant={currentPage === 'upload' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('upload')}
              className={`gap-1 text-xs font-semibold rounded-lg ${
                currentPage === 'upload' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <UploadCloud className="h-3.5 w-3.5" /> Upload
            </Button>

            {/* Management Grid */}
            <Button
              size="sm"
              variant={currentPage === 'manage' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('manage')}
              className={`gap-1 text-xs font-semibold rounded-lg ${
                currentPage === 'manage' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Manage
            </Button>

            {/* Profile */}
            <Button
              size="sm"
              variant={currentPage === 'profile' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('profile')}
              className={`gap-1 text-xs font-semibold rounded-lg ${
                currentPage === 'profile' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <User className="h-3.5 w-3.5" /> Profile
            </Button>

          </nav>

          {/* User Auth Action Button */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
                className="gap-1 text-xs border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setCurrentPage('login')}
                className="gap-1 text-xs bg-indigo-600 text-white font-semibold"
              >
                <LogIn className="h-3.5 w-3.5" /> Sign In
              </Button>
            )}
          </div>

        </div>
      </header>

      {/* Main Page View Router */}
      <div className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onExplore={() => setCurrentPage('marketplace')}
            onLogin={() => setCurrentPage('login')}
            onRegister={() => setCurrentPage('register')}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        )}

        {currentPage === 'register' && (
          <RegisterPage
            onRegisterSuccess={handleLoginSuccess}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        )}

        {currentPage === 'marketplace' && (
          <MarketplacePage onNavigateToProfile={() => setCurrentPage('profile')} />
        )}

        {currentPage === 'upload' && (
          <ContentUploadPage
            onUploadSuccess={() => setCurrentPage('manage')}
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
