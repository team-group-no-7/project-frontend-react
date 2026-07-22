import React, { useState } from 'react';
import { Home, ShoppingBag, UploadCloud, LayoutGrid, CreditCard, BookOpen, DollarSign, MessageSquare, Video, Bell, ShieldAlert, User, LogIn, LogOut } from 'lucide-react';

// Import All 5 Modules Pages & Components
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import ContentUploadPage from './pages/ContentUploadPage';
import ContentManagementGrid from './pages/ContentManagementGrid';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResultPage from './pages/PaymentResultPage';
import MyLibraryPage from './pages/MyLibraryPage';
import EarningsDashboard from './components/EarningsDashboard';
import QAThreadSection from './components/QAThreadSection';
import DoubtWorkspacePage from './pages/DoubtWorkspacePage';
import CreatorNoticeboardPage from './pages/CreatorNoticeboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import UnifiedContentViewerPage from './pages/UnifiedContentViewerPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import NotificationCenter from './components/NotificationCenter';
import { Button } from './components/ui/button';
import { INITIAL_USER } from './data/mockData';

/**
 * App Root Component (All 5 Modules Complete & Beginner Friendly)
 */
function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Selected item for checkout
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState(null);
  const [latestTransaction, setLatestTransaction] = useState(null);

  // Configuration for platform navigation links
  const navItems = [
    { name: 'landing', label: 'Home', icon: Home },
    { name: 'marketplace', label: 'Catalog', icon: ShoppingBag },
    { name: 'upload', label: 'Upload', icon: UploadCloud },
    { name: 'manage', label: 'Grid', icon: LayoutGrid },
    { name: 'checkout', label: 'Checkout', icon: CreditCard },
    { name: 'library', label: 'Library', icon: BookOpen },
    { name: 'earnings', label: 'Revenue', icon: DollarSign },
    { name: 'qa', label: 'Q&A', icon: MessageSquare },
    { name: 'doubts', label: 'Doubts', icon: Video },
    { name: 'noticeboard', label: 'Feed', icon: Bell },
    { name: 'admin', label: 'Admin', icon: ShieldAlert, activeClass: 'bg-red-600 text-white', iconClass: 'text-amber-300' },
    { name: 'profile', label: 'Profile', icon: User }
  ];

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('marketplace');
  };

  const handleLogout = () => {
    localStorage.removeItem("learnhub_token");
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleStartCheckout = (item) => {
    setSelectedCheckoutItem(item);
    setCurrentPage('checkout');
  };

  const handlePaymentSuccess = (transactionData) => {
    setLatestTransaction(transactionData);
    setCurrentPage('result');
  };

  const handlePaymentFailure = (transactionData) => {
    setLatestTransaction(transactionData);
    setCurrentPage('result');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Top Application Navigation Bar */}
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
            </div>
          </div>

          {/* Navigation Items (Modules 1 to 5) */}
          <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900/80 p-1 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.name;
              return (
                <Button
                  key={item.name}
                  size="sm"
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage(item.name)}
                  className={`gap-1 text-xs font-semibold rounded-lg ${
                    isActive
                      ? (item.activeClass || 'bg-indigo-600 text-white')
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${!isActive && item.iconClass ? item.iconClass : ''}`} /> {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Auth Action & Notification Center */}
          <div className="flex items-center gap-2">
            <NotificationCenter />
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

      {/* Main View Router */}
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

        {currentPage === 'checkout' && (
          <CheckoutPage
            item={selectedCheckoutItem}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={handlePaymentFailure}
            onCancel={() => setCurrentPage('marketplace')}
          />
        )}

        {currentPage === 'result' && (
          <PaymentResultPage
            transaction={latestTransaction}
            onGoToLibrary={() => setCurrentPage('library')}
            onTryAgain={() => setCurrentPage('checkout')}
          />
        )}

        {currentPage === 'library' && (
          <MyLibraryPage />
        )}

        {currentPage === 'earnings' && (
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
              Creator Revenue & Payout Dashboard
            </h1>
            <EarningsDashboard />
          </div>
        )}

        {currentPage === 'qa' && (
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Technical Q&A Community Forum
            </h1>
            <QAThreadSection />
          </div>
        )}

        {currentPage === 'doubts' && (
          <DoubtWorkspacePage />
        )}

        {currentPage === 'noticeboard' && (
          <CreatorNoticeboardPage />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage />
        )}

        {currentPage === 'profile' && (
          <ProfilePage />
        )}

        {currentPage === 'creator-profile' && (
          <CreatorProfilePage
            onBack={() => setCurrentPage('marketplace')}
            onBookSession={() => setCurrentPage('doubts')}
          />
        )}

        {currentPage === 'reader' && (
          <UnifiedContentViewerPage
            onBack={() => setCurrentPage('library')}
          />
        )}

        {currentPage === 'history' && (
          <PurchaseHistoryPage
            onBack={() => setCurrentPage('library')}
          />
        )}
      </div>

    </div>
  );
}

export default App;
