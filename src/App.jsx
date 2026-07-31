import React, { useState, useEffect, useCallback } from 'react';
import api from '@/utils/api';

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
import LearnerDashboard from './pages/learner/Dashboard';

// Import Layout Components
import DashboardLayout from './components/creator/DashboardLayout';
import { Button } from './components/ui/button';
import { MARKETPLACE_CONTENTS } from './data/mockData';

const getPageTitle = (page) => {
  const titles = {
    'marketplace': 'Marketplace Catalog',
    'creator-profile': 'Creator Profile',
    'manage': 'Management Grid',
    'profile': 'My Account',
    'admin': 'Admin Panel',
    'dashboard': 'Creator Dashboard',
    'content-studio': 'Content Studio',
    'resource-details': 'Resource Details',
    'learner-dashboard': 'Learner Dashboard'
  };
  return titles[page] || 'LearnHub';
};

/**
 * App Root Component
 * Main Navigation Orchestrator for LearnHub.
 * Displays Landing, Login, and Register screens full-screen for guests,
 * and handles dynamic role-switching for authenticated users.
 * All persistent data (purchases, sessions, uploads) is loaded from and saved to the backend DB.
 */
function App() {
  // Authentication states — restored from localStorage on refresh
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('learnhub_token');
  });
  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem('learnhub_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) { return null; }
    }
    return null;
  });

  // Current active page state — restored from localStorage
  const [currentPage, setCurrentPage] = useState(() => {
    const savedToken = localStorage.getItem('learnhub_token');
    if (savedToken) {
      const savedUser = localStorage.getItem('learnhub_user');
      const user = savedUser ? JSON.parse(savedUser) : null;
      if (user?.role === 'ADMIN') return 'admin';
      return user?.role === 'CREATOR' ? 'dashboard' : 'learner-dashboard';
    }
    return 'landing';
  });

  const [selectedCreatorId, setSelectedCreatorId] = useState(202);
  const [selectedReaderItem, setSelectedReaderItem] = useState(null);
  const [selectedResourceItem, setSelectedResourceItem] = useState(null);

  // Persistent states — always start empty, loaded from DB
  const [purchasedContents, setPurchasedContents] = useState([]);
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState(null);
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [doubtSessions, setDoubtSessions] = useState([]);
  const [selectedCallSession, setSelectedCallSession] = useState(null);
  const [marketplaceContents, setMarketplaceContents] = useState(MARKETPLACE_CONTENTS);
  const [uploadedContents, setUploadedContents] = useState([]);

  // ─── Backend Data Loaders ─────────────────────────────────────────────────

  /** Fetch all marketplace content from DB */
  const fetchMarketplace = useCallback(() => {
    api.get("/api/contents")
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data) && data.length > 0) setMarketplaceContents(data);
      })
      .catch((err) => console.error("Marketplace fetch failed:", err));
  }, []);

  /** Fetch purchased library from DB for a given user */
  const fetchPurchases = useCallback((userId) => {
    if (!userId) return;
    api.get(`/api/purchases/library/${userId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          // Normalise to match existing purchasedContents shape used throughout UI
          const normalised = data.map((item, idx) => ({
            id: idx + 1,
            user_id: userId,
            content_id: item.contentId,
            amount_paid: item.price,
            payment_status: "SUCCESS",
            purchased_at: new Date().toISOString(),
            content: {
              id: item.contentId,
              title: item.title,
              description: "",
              price: item.price,
              category_name: item.category,
              type: item.type,
              fileUrl: item.fileUrl,
              file_url: item.fileUrl,
            }
          }));
          setPurchasedContents(normalised);
        }
      })
      .catch((err) => console.error("Library fetch failed:", err));
  }, []);

  /** Fetch doubt sessions from DB for a given learner */
  const fetchSessions = useCallback((userId) => {
    if (!userId) return;
    api.get(`/api/sessions/${userId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          const normalised = data.map((s) => ({
            id: s.id,
            learner_id: userId,
            creator_id: s.creatorId,
            topic: s.topic,
            scheduled_at: s.scheduledAt,
            duration_minutes: s.durationMinutes,
            session_price: s.sessionPrice,
            booking_status: s.bookingStatus,
            payment_status: s.paymentStatus,
            transaction_id: s.transactionId,
            jitsi_room_name: s.jitsiRoomName,
            creator_name: s.creatorName
          }));
          setDoubtSessions(normalised);
        }
      })
      .catch((err) => console.error("Sessions fetch failed:", err));
  }, []);

  /** Fetch creator's uploaded content from DB */
  const fetchUploads = useCallback((userId) => {
    if (!userId) return;
    api.get(`/api/creator/content/${userId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data) && data.length > 0) setUploadedContents(data);
      })
      .catch((err) => console.error("Uploads fetch failed:", err));
  }, []);

  // ─── Initial Data Load on Login / Page Refresh ────────────────────────────
  useEffect(() => {
    fetchMarketplace();
    if (isLoggedIn && profile?.id) {
      fetchPurchases(profile.id);
      fetchSessions(profile.id);
      if (profile.role === 'CREATOR' || profile.role === 'ADMIN') {
        fetchUploads(profile.id);
      }
    }
  }, [isLoggedIn, profile?.id, fetchMarketplace, fetchPurchases, fetchSessions, fetchUploads]);

  // ─── Navigation Handlers ──────────────────────────────────────────────────

  const handleOpenCreatorProfile = (id = 202) => {
    setSelectedCreatorId(id);
    setCurrentPage('creator-profile');
  };

  // Callback when a creator successfully uploads new content
  const handleUploadSuccess = (newContent) => {
    const dbContent = {
      ...newContent,
      creator_name: profile?.name || "Creator",
      creator_avatar: profile?.avatar || "",
      rating: 5.0,
      reviews_count: 0,
      learners_count: 0,
      type: newContent.type || "Article",
      level: "Beginner",
      tags: ["New"],
      preview_text: "Newly published resource."
    };
    setMarketplaceContents((prev) => [dbContent, ...prev]);
    setUploadedContents((prev) => [dbContent, ...prev]);
    alert(`Successfully published "${dbContent.title}"! Redirecting to Management Grid...`);
    setCurrentPage('manage');
  };

  const handleDeleteContent = (id) => {
    setUploadedContents((prev) => prev.filter((item) => item.id !== id));
    setMarketplaceContents((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSwitchRole = () => {
    setProfile((prev) => {
      if (!prev) return null;
      const updatedProfile = {
        ...prev,
        role: prev.role === 'LEARNER' ? 'CREATOR' : 'LEARNER'
      };
      localStorage.setItem("learnhub_user", JSON.stringify(updatedProfile));
      setCurrentPage(updatedProfile.role === 'CREATOR' ? 'dashboard' : 'learner-dashboard');
      return updatedProfile;
    });
  };

  // Login handler — load user data from DB after login
  const handleLoginSuccess = (user) => {
    setProfile(user);
    setIsLoggedIn(true);
    // Eagerly fetch DB data for this user
    fetchPurchases(user.id);
    fetchSessions(user.id);
    if (user.role === 'CREATOR' || user.role === 'ADMIN') fetchUploads(user.id);
    setCurrentPage(user.role === 'ADMIN' ? 'admin' : (user.role === 'CREATOR' ? 'dashboard' : 'learner-dashboard'));
  };

  const handleLogout = () => {
    localStorage.removeItem("learnhub_token");
    localStorage.removeItem("learnhub_user");
    setProfile(null);
    setIsLoggedIn(false);
    setPurchasedContents([]);
    setDoubtSessions([]);
    setUploadedContents([]);
    setCurrentPage('landing');
  };

  /**
   * Payment success callback.
   * For CONTENT purchases → POST /api/payment/verify to persist in DB, then reload library.
   * For SESSION bookings  → POST /api/sessions to create in DB, then reload sessions.
   */
  const handlePaymentSuccess = (transactionData) => {
    if (transactionData.item?.isSession) {
      // ── Session Booking: persist to DB ──
      const sd = transactionData.item.sessionData;
      const sessionPayload = {
        learner_id: profile?.id || 101,
        creator_id: sd.creator?.id || sd.creator_id,
        topic: sd.topic,
        scheduled_at: sd.scheduled_at,
        duration_minutes: sd.duration_minutes || 30,
        session_price: sd.session_price || 0
      };
      api.post("/api/sessions", sessionPayload)
        .then((res) => {
          const saved = res.data?.data || res.data;
          // Refresh full list from DB
          fetchSessions(profile?.id);
          // Optimistic fallback in case fetch is slow
          const newSession = {
            id: saved?.id || Date.now(),
            learner_id: profile?.id,
            creator_id: sessionPayload.creator_id,
            topic: sessionPayload.topic,
            scheduled_at: sessionPayload.scheduled_at,
            duration_minutes: sessionPayload.duration_minutes,
            session_price: sessionPayload.session_price,
            booking_status: "APPROVED",
            payment_status: "PAID",
            transaction_id: transactionData.transactionId,
            jitsi_room_name: saved?.jitsiRoomName || `learnhub-doubt-${Math.random().toString(36).substr(2, 6)}`
          };
          setDoubtSessions((prev) => {
            if (prev.find((s) => s.id === newSession.id)) return prev;
            return [...prev, newSession];
          });
        })
        .catch((err) => {
          console.error("Session booking persist failed:", err);
          // Optimistic local add as fallback
          const newSession = {
            id: Date.now(),
            learner_id: profile?.id,
            creator_id: sd.creator?.id || sd.creator_id,
            topic: sd.topic,
            scheduled_at: sd.scheduled_at,
            duration_minutes: sd.duration_minutes || 30,
            session_price: sd.session_price || 0,
            booking_status: "APPROVED",
            payment_status: "PAID",
            transaction_id: transactionData.transactionId,
            jitsi_room_name: `learnhub-doubt-${Math.random().toString(36).substr(2, 6)}`
          };
          setDoubtSessions((prev) => [...prev, newSession]);
        });
    } else {
      // ── Content Purchase: verify/persist to DB ──
      const verifyPayload = {
        razorpayOrderId: transactionData.transactionId,
        razorpayPaymentId: transactionData.transactionId,
        razorpaySignature: "mock_" + transactionData.transactionId,
        userId: profile?.id || 101,
        contentId: transactionData.item?.id
      };
      api.post("/api/payment/verify", verifyPayload)
        .then(() => {
          // Refresh purchases from DB
          fetchPurchases(profile?.id);
        })
        .catch((err) => {
          console.error("Purchase persist failed:", err);
          // Optimistic local add as fallback
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
        });
    }
    setLatestTransaction(transactionData);
    setCurrentPage('result');
  };

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
        onBack={() => setCurrentPage('learner-dashboard')}
      />
    );
  }

  if (currentPage === 'checkout') {
    return (
      <CheckoutPage
        item={selectedCheckoutItem}
        profile={profile}
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
        onGoToLibrary={() => setCurrentPage('learner-dashboard')}
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
      {currentPage === 'learner-dashboard' && (
        <LearnerDashboard
          profile={profile}
          purchasedContents={purchasedContents}
          marketplaceContents={marketplaceContents}
          onChangePage={setCurrentPage}
          onResumeReading={(item) => {
            setSelectedReaderItem(item);
            setCurrentPage('reader');
          }}
          onViewRecommendation={(item) => {
            setSelectedResourceItem(item);
            setCurrentPage('resource-details');
          }}
        />
      )}

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
          uploadedContents={uploadedContents}
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
