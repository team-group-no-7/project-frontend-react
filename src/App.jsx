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

            {/* Module 1: Home */}
            <Button
              size="sm"
              variant={currentPage === 'landing' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('landing')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'landing' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <Home className="h-3.5 w-3.5" /> Home
            </Button>

            {/* Module 2: Catalog */}
            <Button
              size="sm"
              variant={currentPage === 'marketplace' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('marketplace')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'marketplace' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Catalog
            </Button>

            {/* Module 2: Publish */}
            <Button
              size="sm"
              variant={currentPage === 'upload' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('upload')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'upload' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <UploadCloud className="h-3.5 w-3.5" /> Upload
            </Button>

            {/* Module 2: Manage */}
            <Button
              size="sm"
              variant={currentPage === 'manage' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('manage')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'manage' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Grid
            </Button>

            {/* Module 3: Checkout */}
            <Button
              size="sm"
              variant={currentPage === 'checkout' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('checkout')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'checkout' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <CreditCard className="h-3.5 w-3.5" /> Checkout
            </Button>

            {/* Module 3: Library */}
            <Button
              size="sm"
              variant={currentPage === 'library' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('library')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'library' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <BookOpen className="h-3.5 w-3.5" /> Library
            </Button>

            {/* Module 3: Earnings */}
            <Button
              size="sm"
              variant={currentPage === 'earnings' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('earnings')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'earnings' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <DollarSign className="h-3.5 w-3.5" /> Revenue
            </Button>

            {/* Module 4: Q&A */}
            <Button
              size="sm"
              variant={currentPage === 'qa' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('qa')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'qa' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <MessageSquare className="h-3.5 w-3.5" /> Q&A
            </Button>

            {/* Module 4: Doubts */}
            <Button
              size="sm"
              variant={currentPage === 'doubts' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('doubts')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'doubts' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <Video className="h-3.5 w-3.5" /> Doubts
            </Button>

            {/* Module 4: Feed */}
            <Button
              size="sm"
              variant={currentPage === 'noticeboard' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('noticeboard')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'noticeboard' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <Bell className="h-3.5 w-3.5" /> Feed
            </Button>

            {/* Module 5: Admin */}
            <Button
              size="sm"
              variant={currentPage === 'admin' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('admin')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'admin' ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <ShieldAlert className="h-3.5 w-3.5 text-amber-300" /> Admin
            </Button>

            {/* Module 1: Profile */}
            <Button
              size="sm"
              variant={currentPage === 'profile' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('profile')}
              className={`gap-1 text-xs font-semibold rounded-lg ${currentPage === 'profile' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <User className="h-3.5 w-3.5" /> Profile
            </Button>

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
