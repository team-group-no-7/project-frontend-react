import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '@/utils/api';
import AppRoutes from './routes/AppRoutes';

/**
 * App Root Component
 * Main Navigation & Data Orchestrator for LearnHub.
 * Managed cleanly using React Router DOM.
 */
function App() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const [selectedCreatorId, setSelectedCreatorId] = useState(202);
  const [selectedReaderItem, setSelectedReaderItem] = useState(null);
  const [selectedResourceItem, setSelectedResourceItem] = useState(null);

  // Persistent states — restored from localStorage and merged with DB
  const [purchasedContents, setPurchasedContents] = useState(() => {
    try { return JSON.parse(localStorage.getItem('learnhub_purchases')) || []; } catch (e) { return []; }
  });
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState(null);
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [doubtSessions, setDoubtSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('learnhub_sessions')) || []; } catch (e) { return []; }
  });
  const [selectedCallSession, setSelectedCallSession] = useState(null);
  const [marketplaceContents, setMarketplaceContents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('learnhub_uploads'));
      if (Array.isArray(saved) && saved.length > 0) {
        return saved;
      }
    } catch (e) {}
    return [];
  });
  const [uploadedContents, setUploadedContents] = useState(() => {
    try { return JSON.parse(localStorage.getItem('learnhub_uploads')) || []; } catch (e) { return []; }
  });

  // Sync states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('learnhub_purchases', JSON.stringify(purchasedContents));
  }, [purchasedContents]);

  useEffect(() => {
    localStorage.setItem('learnhub_sessions', JSON.stringify(doubtSessions));
  }, [doubtSessions]);

  useEffect(() => {
    localStorage.setItem('learnhub_uploads', JSON.stringify(uploadedContents));
  }, [uploadedContents]);

  // ─── Backend Data Loaders ─────────────────────────────────────────────────

  const fetchMarketplace = useCallback(() => {
    api.get("/api/contents")
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            type: item.type || "PDF",
            category_id: item.category_id || 1,
            category_name: item.category_name || item.category || "General",
            creator_id: item.creator_id || item.creatorId,
            creator_name: item.creator_name || item.creatorName || "Creator",
            creator_avatar: item.creator_avatar || item.creatorAvatar || "",
            rating: item.rating || 4.8,
            reviews_count: item.reviews_count || 12,
            learners_count: item.learners_count || 120,
            level: item.level || "Beginner",
            tags: item.tags || ["Guide"],
            fileUrl: item.fileUrl || item.file_url || item.thumbnail_url,
            file_url: item.fileUrl || item.file_url || item.thumbnail_url,
            preview_text: item.description || "Resource content preview."
          }));

          setMarketplaceContents((prev) => {
            const combined = [...normalized];
            prev.forEach((localItem) => {
              if (!combined.some((c) => c.id === localItem.id || c.title === localItem.title)) {
                combined.push(localItem);
              }
            });
            return combined;
          });
        }
      })
      .catch((err) => console.error("Marketplace fetch failed:", err));
  }, []);

  const fetchPurchases = useCallback((userId) => {
    if (!userId) return;
    api.get(`/api/purchases/library/${userId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          const normalised = data.map((item, idx) => ({
            id: item.id || idx + 1,
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
          setPurchasedContents((prev) => {
            const combined = [...normalised];
            prev.forEach(p => {
              if (p.user_id === userId && !combined.some(c => c.content_id === p.content_id)) {
                combined.push(p);
              }
            });
            return combined;
          });
        }
      })
      .catch((err) => console.error("Library fetch failed:", err));
  }, []);

  const fetchSessions = useCallback((userId, role) => {
    if (!userId) return;
    const url = role === 'CREATOR' ? `/api/sessions/${userId}?role=CREATOR` : `/api/sessions/${userId}`;
    api.get(url)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          const normalised = data.map((s) => ({
            id: s.id,
            learner_id: s.learnerId || userId,
            creator_id: s.creatorId,
            topic: s.topic,
            scheduled_at: s.scheduledAt,
            duration_minutes: s.durationMinutes,
            session_price: s.sessionPrice,
            booking_status: s.bookingStatus || "APPROVED",
            payment_status: s.paymentStatus || "PAID",
            transaction_id: s.transactionId,
            jitsi_room_name: s.jitsiRoomName,
            creator_name: s.creatorName,
            learner_name: s.learnerName || "Learner"
          }));
          setDoubtSessions((prev) => {
            const combined = [...normalised];
            prev.forEach(s => {
              if (!combined.some(c => c.id === s.id || (s.transaction_id && c.transaction_id === s.transaction_id))) {
                combined.push(s);
              }
            });
            return combined;
          });
        }
      })
      .catch((err) => console.error("Sessions fetch failed:", err));
  }, []);

  const fetchUploads = useCallback((userId) => {
    if (!userId) return;
    api.get(`/api/creator/content/${userId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          const normalised = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            type: item.type || "PDF Guide",
            status: item.status || "PUBLISHED",
            creator_id: userId,
            creatorId: userId,
            creator_name: item.creatorName || item.creator_name,
            category_name: item.categoryName || item.category_name || "General",
            created_at: item.createdAt || item.created_at || new Date().toISOString(),
            fileUrl: item.fileUrl || item.file_url,
            file_url: item.fileUrl || item.file_url,
            learners_count: item.learnersCount || item.learners_count || 1
          }));

          setUploadedContents((prev) => {
            const combined = [...normalised];
            prev.forEach(u => {
              if ((String(u.creator_id) === String(userId) || String(u.creatorId) === String(userId)) && !combined.some(c => c.id === u.id || c.title === u.title)) {
                combined.push(u);
              }
            });
            return combined;
          });
        }
      })
      .catch((err) => console.error("Uploads fetch failed:", err));
  }, []);

  // ─── Initial Data Load on Login / Page Refresh ────────────────────────────
  useEffect(() => {
    fetchMarketplace();
    if (isLoggedIn && profile?.id) {
      fetchPurchases(profile.id);
      fetchSessions(profile.id, profile.role);
      fetchUploads(profile.id);
    }
  }, [isLoggedIn, profile?.id, profile?.role, fetchPurchases, fetchSessions, fetchUploads, fetchMarketplace]);

  // Refetch creator uploads when visiting creator routes
  useEffect(() => {
    if (isLoggedIn && profile?.id && (location.pathname.startsWith('/creator'))) {
      fetchUploads(profile.id);
    }
  }, [location.pathname, isLoggedIn, profile?.id, fetchUploads]);

  // ─── Navigation & Business Callbacks ──────────────────────────────────────

  const handleOpenCreatorProfile = (id = 202) => {
    setSelectedCreatorId(id);
    navigate(`/creator/profile/${id}`);
  };

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
      preview_text: newContent.previewText || newContent.preview_text || "Newly published resource."
    };
    setMarketplaceContents((prev) => [dbContent, ...prev]);
    setUploadedContents((prev) => [dbContent, ...prev]);
    fetchMarketplace();
    alert(`Successfully published "${dbContent.title}"! It is now visible to all learners in the Marketplace.`);
    navigate('/creator/manage');
  };

  const handleDeleteContent = (id) => {
    setUploadedContents((prev) => prev.filter((item) => item.id !== id));
    setMarketplaceContents((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSwitchRole = () => {
    if (!profile) return;
    const targetRole = profile.role === 'LEARNER' ? 'CREATOR' : 'LEARNER';

    if (profile.id) {
      api.patch(`/api/users/${profile.id}/become-creator`)
        .then((res) => {
          const updatedUser = res.data?.data || res.data || { ...profile, role: targetRole };
          setProfile(updatedUser);
          localStorage.setItem("learnhub_user", JSON.stringify(updatedUser));
          if (updatedUser.role === 'CREATOR' && updatedUser.id) {
            fetchUploads(updatedUser.id);
          }
          navigate(updatedUser.role === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard');
        })
        .catch(() => {
          const updatedProfile = { ...profile, role: targetRole };
          setProfile(updatedProfile);
          localStorage.setItem("learnhub_user", JSON.stringify(updatedProfile));
          if (updatedProfile.role === 'CREATOR' && updatedProfile.id) {
            fetchUploads(updatedProfile.id);
          }
          navigate(targetRole === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard');
        });
    } else {
      const updatedProfile = { ...profile, role: targetRole };
      setProfile(updatedProfile);
      localStorage.setItem("learnhub_user", JSON.stringify(updatedProfile));
      navigate(targetRole === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard');
    }
  };

  const handleLoginSuccess = (user) => {
    setProfile(user);
    setIsLoggedIn(true);
    fetchPurchases(user.id);
    fetchSessions(user.id);
    if (user.role === 'CREATOR' || user.role === 'ADMIN') fetchUploads(user.id);
    navigate(user.role === 'ADMIN' ? '/admin' : (user.role === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard'));
  };

  const handleLogout = () => {
    const savedUser = localStorage.getItem("learnhub_user");
    let refreshToken = "";
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        refreshToken = parsed.refreshToken || parsed.refresh_token || "";
      } catch (e) {}
    }

    if (refreshToken) {
      api.post("/api/auth/logout", { refreshToken }).catch(() => {});
    }

    localStorage.removeItem("learnhub_token");
    localStorage.removeItem("learnhub_user");
    localStorage.removeItem("learnhub_purchases");
    localStorage.removeItem("learnhub_sessions");
    localStorage.removeItem("learnhub_uploads");
    setProfile(null);
    setIsLoggedIn(false);
    setPurchasedContents([]);
    setDoubtSessions([]);
    setUploadedContents([]);
    navigate('/');
  };

  const handlePaymentSuccess = (transactionData) => {
    if (transactionData.item?.isSession) {
      const sd = transactionData.item.sessionData;
      const scheduledDate = (sd.scheduled_at && !isNaN(Date.parse(sd.scheduled_at))) 
        ? new Date(sd.scheduled_at).toISOString() 
        : new Date(Date.now() + 86400000).toISOString();

      const sessionPayload = {
        learner_id: profile?.id || 101,
        creator_id: sd.creator?.id || sd.creator_id,
        topic: sd.topic,
        scheduled_at: scheduledDate,
        duration_minutes: sd.duration_minutes || 30,
        session_price: sd.session_price || 0
      };
      api.post("/api/sessions", sessionPayload)
        .then((res) => {
          const saved = res.data?.data || res.data;
          fetchSessions(profile?.id, profile?.role);
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
      const item = transactionData.item;
      const newPurchase = {
        id: Date.now(),
        user_id: profile?.id || 101,
        content_id: item?.id,
        amount_paid: transactionData.amountPaid || item?.price || 0,
        payment_status: "SUCCESS",
        transaction_id: transactionData.transactionId,
        purchased_at: transactionData.paidAt || new Date().toISOString(),
        content: {
          id: item?.id,
          title: item?.title || "Purchased Learning Resource",
          description: item?.description || "",
          price: item?.price || 0,
          category_name: item?.category_name || item?.categoryName || "General",
          creator_name: item?.creator_name || item?.creatorName || "Creator",
          type: item?.type || "PDF Guide",
          fileUrl: item?.fileUrl || item?.file_url,
          file_url: item?.fileUrl || item?.file_url
        }
      };

      setPurchasedContents((prev) => {
        if (prev.some(p => p.content_id === newPurchase.content_id)) return prev;
        return [newPurchase, ...prev];
      });

      const verifyPayload = {
        razorpayOrderId: transactionData.transactionId,
        razorpayPaymentId: transactionData.transactionId,
        razorpaySignature: "mock_" + transactionData.transactionId,
        userId: profile?.id || 101,
        contentId: item?.id
      };

      api.post("/api/payment/verify", verifyPayload)
        .then(() => {
          fetchPurchases(profile?.id || 101);
        })
        .catch((err) => {
          console.error("Purchase persist API warning:", err);
        });
    }
    setLatestTransaction(transactionData);
    navigate('/result');
  };

  const handlePaymentFailure = (transactionData) => {
    setLatestTransaction(transactionData);
    navigate('/result');
  };

  return (
    <AppRoutes
      isLoggedIn={isLoggedIn}
      profile={profile}
      purchasedContents={purchasedContents}
      marketplaceContents={marketplaceContents}
      uploadedContents={uploadedContents}
      doubtSessions={doubtSessions}
      selectedReaderItem={selectedReaderItem}
      setSelectedReaderItem={(item) => {
        setSelectedReaderItem(item);
        navigate('/reader');
      }}
      selectedResourceItem={selectedResourceItem}
      setSelectedResourceItem={(item) => {
        setSelectedResourceItem(item);
        navigate(`/resources/${item?.id || 1}`);
      }}
      selectedCheckoutItem={selectedCheckoutItem}
      setSelectedCheckoutItem={(item) => {
        setSelectedCheckoutItem(item);
        navigate('/checkout');
      }}
      latestTransaction={latestTransaction}
      selectedCallSession={selectedCallSession}
      selectedCreatorId={selectedCreatorId}
      handleLoginSuccess={handleLoginSuccess}
      handleLogout={handleLogout}
      handleSwitchRole={handleSwitchRole}
      handleUploadSuccess={handleUploadSuccess}
      handleDeleteContent={handleDeleteContent}
      handleOpenCreatorProfile={handleOpenCreatorProfile}
      handlePaymentSuccess={handlePaymentSuccess}
      handlePaymentFailure={handlePaymentFailure}
      setSelectedCallSession={(session) => {
        setSelectedCallSession(session);
        navigate('/jitsi');
      }}
    />
  );
}

export default App;
