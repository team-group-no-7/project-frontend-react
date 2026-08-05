import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import All Page Components
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MarketplacePage from '../pages/MarketplacePage';
import ContentManagementGrid from '../pages/ContentManagementGrid';
import ProfilePage from '../pages/ProfilePage';
import CreatorProfilePage from '../pages/CreatorProfilePage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import UnifiedContentViewerPage from '../pages/UnifiedContentViewerPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentResultPage from '../pages/PaymentResultPage';
import JitsiCallPage from '../pages/JitsiCallPage';
import CreatorDashboardMain from '../pages/creator/Dashboard';
import ContentStudio from '../pages/creator/ContentStudio';
import ResourceDetailPage from '../pages/ResourceDetailPage';
import LearnerDashboard from '../pages/learner/Dashboard';

// Import Dashboard Layout Wrapper
import DashboardLayout from '../components/creator/DashboardLayout';

/**
 * Helper component to wrap authenticated pages with DashboardLayout (Sidebar + TopNavbar)
 */
function AuthenticatedLayoutWrapper({ title, children, profile, onSwitchRole, onLogout }) {
    return (
        <DashboardLayout
            title={title}
            profile={profile}
            onSwitchRole={onSwitchRole}
            onLogout={onLogout}
        >
            {children}
        </DashboardLayout>
    );
}

/**
 * AppRoutes — Central Router Configuration for LearnHub
 * Uses standard React Router DOM <Routes> and <Route> tags.
 */
export default function AppRoutes({
    isLoggedIn,
    profile,
    purchasedContents,
    marketplaceContents,
    uploadedContents,
    doubtSessions,
    selectedReaderItem,
    setSelectedReaderItem,
    selectedResourceItem,
    setSelectedResourceItem,
    selectedCheckoutItem,
    setSelectedCheckoutItem,
    latestTransaction,
    selectedCallSession,
    selectedCreatorId,
    handleLoginSuccess,
    handleLogout,
    handleSwitchRole,
    handleUploadSuccess,
    handleDeleteContent,
    handleProfileUpdate,
    handleOpenCreatorProfile,
    handlePaymentSuccess,
    handlePaymentFailure,
    setSelectedCallSession
}) {
    const navigate = useNavigate();
    return (
        <Routes>
            {/* ── Public / Guest Routes ── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLoginSuccess} />} />

            {/* ── Learner Workspace Routes ── */}
            <Route
                path="/learner/dashboard"
                element={
                    <AuthenticatedLayoutWrapper title="Learner Dashboard" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <LearnerDashboard
                            profile={profile}
                            purchasedContents={purchasedContents}
                            marketplaceContents={marketplaceContents}
                            doubtSessions={doubtSessions}
                            onResumeReading={(item) => {
                                setSelectedReaderItem(item);
                                navigate('/reader');
                            }}
                            onViewRecommendation={(item) => {
                                setSelectedResourceItem(item);
                                navigate(`/resources/${item.id}`);
                            }}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/marketplace"
                element={
                    <AuthenticatedLayoutWrapper title="Marketplace Catalog" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <MarketplacePage
                            onOpenCreatorProfile={(id) => handleOpenCreatorProfile(id)}
                            purchasedContents={purchasedContents}
                            marketplaceContents={marketplaceContents}
                            onBuyContent={(item) => {
                                setSelectedResourceItem(item);
                                navigate(`/resources/${item.id}`);
                            }}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/resources/:id"
                element={
                    <AuthenticatedLayoutWrapper title="Resource Details" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <ResourceDetailPage
                            resourceItem={selectedResourceItem}
                            profile={profile}
                            purchasedContents={purchasedContents}
                            onBuyContent={(item) => setSelectedCheckoutItem(item)}
                            onOpenCreatorProfile={(id) => handleOpenCreatorProfile(id)}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/resource/:id"
                element={
                    <AuthenticatedLayoutWrapper title="Resource Details" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <ResourceDetailPage
                            resourceItem={selectedResourceItem}
                            profile={profile}
                            purchasedContents={purchasedContents}
                            onBuyContent={(item) => setSelectedCheckoutItem(item)}
                            onOpenCreatorProfile={(id) => handleOpenCreatorProfile(id)}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            {/* ── Creator Workspace Routes ── */}
            <Route
                path="/creator/dashboard"
                element={
                    <AuthenticatedLayoutWrapper title="Creator Dashboard" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <CreatorDashboardMain
                            profile={profile}
                            uploadedContents={uploadedContents}
                            marketplaceContents={marketplaceContents}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/creator/studio"
                element={
                    <AuthenticatedLayoutWrapper title="Content Studio" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <ContentStudio
                            profile={profile}
                            onUploadSuccess={handleUploadSuccess}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/creator/manage"
                element={
                    <AuthenticatedLayoutWrapper title="Management Grid" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <ContentManagementGrid
                            contentsList={uploadedContents}
                            onDeleteContent={handleDeleteContent}
                            onOpenReader={(item) => setSelectedReaderItem(item)}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/creator/profile/:id"
                element={
                    <AuthenticatedLayoutWrapper title="Creator Profile" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <CreatorProfilePage
                            creatorId={selectedCreatorId}
                            marketplaceContents={marketplaceContents}
                            onSelectCreator={(id) => handleOpenCreatorProfile(id)}
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
                            }}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />
            <Route
                path="/creator/:id"
                element={
                    <AuthenticatedLayoutWrapper title="Creator Profile" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <CreatorProfilePage
                            creatorId={selectedCreatorId}
                            marketplaceContents={marketplaceContents}
                            onSelectCreator={(id) => handleOpenCreatorProfile(id)}
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
                            }}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            {/* ── User Account & Admin Routes ── */}
            <Route
                path="/profile"
                element={
                    <AuthenticatedLayoutWrapper title="My Account" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <ProfilePage
                            activeRole={profile?.role}
                            onToggleRole={handleSwitchRole}
                            profile={profile}
                            onUpdateProfile={handleProfileUpdate}
                            purchasedContents={purchasedContents}
                            uploadedContents={uploadedContents}
                            doubtSessions={doubtSessions}
                            onJoinCall={(session) => setSelectedCallSession(session)}
                            onOpenReader={(content) => setSelectedReaderItem(content)}
                        />
                    </AuthenticatedLayoutWrapper>
                }
            />

            <Route
                path="/admin"
                element={
                    <AuthenticatedLayoutWrapper title="Admin Panel" profile={profile} onSwitchRole={handleSwitchRole} onLogout={handleLogout}>
                        <AdminDashboardPage />
                    </AuthenticatedLayoutWrapper>
                }
            />

            {/* ── Fullscreen Reader, Checkout & Video Call Routes ── */}
            <Route
                path="/reader"
                element={
                    <UnifiedContentViewerPage
                        contentItem={selectedReaderItem}
                        profile={profile}
                    />
                }
            />
            <Route
                path="/reader/:id"
                element={
                    <UnifiedContentViewerPage
                        contentItem={selectedReaderItem}
                        profile={profile}
                    />
                }
            />

            <Route
                path="/checkout"
                element={
                    <CheckoutPage
                        item={selectedCheckoutItem}
                        profile={profile}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentFailure={handlePaymentFailure}
                    />
                }
            />

            <Route
                path="/result"
                element={
                    <PaymentResultPage
                        transaction={latestTransaction}
                    />
                }
            />

            <Route
                path="/jitsi"
                element={
                    <JitsiCallPage
                        session={selectedCallSession}
                        userName={profile?.name}
                    />
                }
            />

            {/* ── Catch-All Fallback Route ── */}
            <Route
                path="*"
                element={
                    isLoggedIn ? (
                        <Navigate to={profile?.role === 'ADMIN' ? '/admin' : (profile?.role === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard')} replace />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />
        </Routes>
    );
}
