import React, { useState } from 'react';

// Import Module Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import ContentManagementGrid from './pages/ContentManagementGrid';
import ProfilePage from './pages/ProfilePage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UnifiedContentViewerPage from './pages/UnifiedContentViewerPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResultPage from './pages/PaymentResultPage';
import JitsiCallPage from './pages/JitsiCallPage';
import CreatorDashboardMain from './pages/creator/Dashboard';
import ContentStudio from './pages/creator/ContentStudio';
import ResourceDetailPage from './pages/ResourceDetailPage';

// Import Layout Components
import DashboardLayout from './components/creator/DashboardLayout';
import { Button } from './components/ui/button';
import { INITIAL_USER, PURCHASED_CONTENTS, DOUBT_SESSIONS, MARKETPLACE_CONTENTS, UPLOADED_CONTENTS } from './data/mockData';

const getPageTitle = (page) => {
  const titles = {
    'marketplace': 'Marketplace Catalog',
    'creator-profile': 'Creator Profile',
    'manage': 'Management Grid',
    'profile': 'My Account',
    'admin': 'Admin Panel',
    'dashboard': 'Creator Dashboard',
    'content-studio': 'Content Studio',
    'resource-details': 'Resource Details'
  };
  return titles[page] || 'LearnHub';
};

/**
 * App Root Component
 * Main Navigation Orchestrator for LearnHub.
 * Displays Landing, Login, and Register screens full-screen for guests,
 * and handles dynamic role-switching for authenticated users.
 */
function App() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('learnhub_token');
  });
  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem('learnhub_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return localStorage.getItem('learnhub_token') ? INITIAL_USER : null;
  });

  // Current active page state
  const [currentPage, setCurrentPage] = useState(() => {
    const savedToken = localStorage.getItem('learnhub_token');
    if (savedToken) {
      const savedUser = localStorage.getItem('learnhub_user');
      const user = savedUser ? JSON.parse(savedUser) : null;
      if (user?.role === 'ADMIN') return 'admin';
      return user?.role === 'CREATOR' ? 'dashboard' : 'marketplace';
    }
    return 'landing';
  });

  const [selectedCreatorId, setSelectedCreatorId] = useState(202);
  const [selectedReaderItem, setSelectedReaderItem] = useState(null);
  const [selectedResourceItem, setSelectedResourceItem] = useState(null);

  // Dynamic purchasing ledger states
  const [purchasedContents, setPurchasedContents] = useState(PURCHASED_CONTENTS);
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState(null);
  const [latestTransaction, setLatestTransaction] = useState(null);

  // Mentorship Doubt Sessions state
  const [doubtSessions, setDoubtSessions] = useState(DOUBT_SESSIONS);
  const [selectedCallSession, setSelectedCallSession] = useState(null);

  // Global catalog and uploads states
  const [marketplaceContents, setMarketplaceContents] = useState(MARKETPLACE_CONTENTS);
  const [uploadedContents, setUploadedContents] = useState(UPLOADED_CONTENTS);

  // Switch view to public creator profile
  const handleOpenCreatorProfile = (id = 202) => {
    setSelectedCreatorId(id);
    setCurrentPage('creator-profile');
  };

  // Callback when a creator successfully uploads new content
  const handleUploadSuccess = (newContent) => {
    // Structure metadata conforming to the database model
    const dbContent = {
      ...newContent,
      creator_name: profile?.name || "Arjun Mehta",
      creator_avatar: profile?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviews_count: 0,
      learners_count: 0,
      type: newContent.type || "Cheat Sheet PDF",
      level: "Beginner",
      tags: ["New"],
      preview_text: "Includes course guides, code logs and setup files."
    };

    // Update global states
    setMarketplaceContents((prev) => [dbContent, ...prev]);
    setUploadedContents((prev) => [dbContent, ...prev]);

    alert(`Successfully published "${dbContent.title}"! Redirecting to Management Grid...`);
    setCurrentPage('manage');
  };

  // Callback when a creator deletes published content
  const handleDeleteContent = (id) => {
    setUploadedContents((prev) => prev.filter((item) => item.id !== id));
    setMarketplaceContents((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle switching learner vs creator modes globally
  const handleSwitchRole = () => {
    setProfile((prev) => {
      if (!prev) return null;
      const updatedProfile = {
        ...prev,
        role: prev.role === 'LEARNER' ? 'CREATOR' : 'LEARNER'
      };
      localStorage.setItem("learnhub_user", JSON.stringify(updatedProfile));
      // Route appropriately
      setCurrentPage(updatedProfile.role === 'CREATOR' ? 'dashboard' : 'marketplace');
      return updatedProfile;
    });
  };

  // Login handler
  const handleLoginSuccess = (user) => {
    setProfile(user);
    setIsLoggedIn(true);
    // If logging in as Admin, route to Admin Panel, otherwise route to Creator Dashboard or Marketplace
    setCurrentPage(user.role === 'ADMIN' ? 'admin' : (user.role === 'CREATOR' ? 'dashboard' : 'marketplace'));
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("learnhub_token");
    localStorage.removeItem("learnhub_user");
    setProfile(null);
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  // Payment success callback - adds item dynamically to ledger state
  const handlePaymentSuccess = (transactionData) => {
    if (transactionData.item.isSession) {
      const newSession = {
        id: transactionData.item.id,
        learner_id: profile?.id || 101,
        creator_id: transactionData.item.sessionData.creator.id,
        topic: transactionData.item.sessionData.topic,
        scheduled_at: transactionData.item.sessionData.scheduled_at,
        duration_minutes: transactionData.item.sessionData.duration_minutes,
        session_price: transactionData.item.sessionData.session_price,
        booking_status: "APPROVED",
        payment_status: "PAID",
        transaction_id: transactionData.transactionId,
        jitsi_room_name: `learnhub-doubt-${Math.random().toString(36).substr(2, 6)}`
      };
      setDoubtSessions((prev) => [...prev, newSession]);
    } else {
      const newPurchase = {
        id: Date.now(),
        user_id: profile?.id || 101,
        content_id: transactionData.item.id,
        amount_paid: transactionData.amountPaid,
        payment_status: "SUCCESS",
        transaction_id: transactionData.transactionId,
        purchased_at: transactionData.paidAt,
        content: transactionData.item
      };
      setPurchasedContents((prev) => [...prev, newPurchase]);
    }
    setLatestTransaction(transactionData);
    setCurrentPage('result');
  };

  // Payment failure callback
  const handlePaymentFailure = (transactionData) => {
    setLatestTransaction(transactionData);
    setCurrentPage('result');
  };

  // Guest view routing (Unauthenticated screens)
  if (!isLoggedIn) {
    return (
      <>
        {currentPage === 'landing' && (
          <LandingPage
            onExplore={() => setCurrentPage('login')} // prompt login to explore
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
      </>
    );
  }

  // Dashboard layout routing (Authenticated screens)
  if (currentPage === 'reader') {
    return (
      <UnifiedContentViewerPage
        contentItem={selectedReaderItem}
        onBack={() => setCurrentPage('profile')}
      />
    );
  }

  if (currentPage === 'checkout') {
    return (
      <CheckoutPage
        contentItem={selectedCheckoutItem}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={handlePaymentFailure}
        onCancel={() => setCurrentPage('marketplace')}
      />
    );
  }

  if (currentPage === 'result') {
    return (
      <PaymentResultPage
        transaction={latestTransaction}
        onGoToLibrary={() => setCurrentPage('profile')}
        onTryAgain={() => setCurrentPage('checkout')}
      />
    );
  }

  if (currentPage === 'jitsi') {
    return (
      <JitsiCallPage
        session={selectedCallSession}
        userName={profile?.name}
        onDisconnect={() => setCurrentPage('profile')}
      />
    );
  }

  return (
    <DashboardLayout
      title={getPageTitle(currentPage)}
      currentPage={currentPage}
      onChangePage={setCurrentPage}
      profile={profile}
      onSwitchRole={handleSwitchRole}
      onLogout={handleLogout}
    >
      {currentPage === 'marketplace' && (
        <MarketplacePage
          onNavigateToProfile={() => setCurrentPage('profile')}
          onOpenCreatorProfile={(id) => handleOpenCreatorProfile(id)}
          purchasedContents={purchasedContents}
          marketplaceContents={marketplaceContents}
          onBuyContent={(item) => {
            setSelectedResourceItem(item);
            setCurrentPage('resource-details');
          }}
        />
      )}

      {currentPage === 'resource-details' && (
        <ResourceDetailPage
          resourceItem={selectedResourceItem}
          onBuyContent={(item) => {
            setSelectedCheckoutItem(item);
            setCurrentPage('checkout');
          }}
          onBack={() => setCurrentPage('marketplace')}
        />
      )}

      {currentPage === 'dashboard' && (
        <CreatorDashboardMain 
          profile={profile}
          uploadedContents={uploadedContents}
          onChangePage={setCurrentPage}
        />
      )}

      {currentPage === 'content-studio' && (
        <ContentStudio
          onChangePage={setCurrentPage}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {currentPage === 'creator-profile' && (
        <CreatorProfilePage
          creatorId={selectedCreatorId}
          onBack={() => setCurrentPage('marketplace')}
          onSelectCreator={(id) => setSelectedCreatorId(id)}
          onBookSession={(sessionDetails) => {
            setSelectedCheckoutItem({
              id: sessionDetails.id,
              title: `1:1 Mentorship: ${sessionDetails.topic}`,
              price: sessionDetails.session_price,
              category_name: "Live Doubt",
              creator_name: sessionDetails.creator.name,
              isSession: true,
              sessionData: sessionDetails
            });
            setCurrentPage('checkout');
          }}
        />
      )}

      {currentPage === 'manage' && (
        <ContentManagementGrid
          onOpenUploadForm={() => setCurrentPage('content-studio')}
          contentsList={uploadedContents}
          onDeleteContent={handleDeleteContent}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage 
          activeRole={profile?.role} 
          onToggleRole={handleSwitchRole} 
          profile={profile}
          purchasedContents={purchasedContents}
          doubtSessions={doubtSessions}
          onJoinCall={(session) => {
            setSelectedCallSession(session);
            setCurrentPage('jitsi');
          }}
          onOpenReader={(content) => {
            setSelectedReaderItem(content);
            setCurrentPage('reader');
          }}
        />
      )}

      {currentPage === 'admin' && (
        <AdminDashboardPage />
      )}
    </DashboardLayout>
  );
}

export default App;
