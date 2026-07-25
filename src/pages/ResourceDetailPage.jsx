import { useState } from "react";

import Breadcrumb from "../components/resource/Breadcrumb";
import ResourcePreview from "../components/resource/ResourcePreview";
import ResourceInfo from "../components/resource/ResourceInfo";
import PurchaseCard from "../components/resource/PurchaseCard";
import CreatorProfile from "../components/resource/CreatorProfile";
import ResourceTabs from "../components/resource/ResourceTabs";
import DescriptionTab from "../components/resource/DescriptionTab";
import PreviewTab from "../components/resource/PreviewTab";
import ReviewsTab from "../components/resource/ReviewsTab";
import DiscussionTab from "../components/resource/DiscussionTab";
import RelatedResources from "../components/resource/RelatedResources";

import resource from "../data/resource";
import reviews, { ratingDistribution } from "../data/reviews";
import discussions from "../data/discussions";
import relatedResources from "../data/relatedResources";
import breadcrumbs from "../data/breadcrumbs";

export default function ResourceDetailPage({ resourceItem = resource, onBuyContent, onBack }) {
  const [activeTab, setActiveTab] = useState("Description");

  // Determine active resource values dynamically if passed
  const activeResource = {
    ...resource,
    ...resourceItem,
    // Merge creator subobject cleanly if present
    creator: {
      ...resource.creator,
      ...(resourceItem?.creator || {})
    }
  };

  const handleBuy = () => {
    if (onBuyContent) {
      onBuyContent(activeResource);
    }
  };

  const handleWishlist = () => console.log("Wishlist clicked");
  const handleShare = () => console.log("Share clicked");
  const handleReport = () => console.log("Report clicked");
  const handlePreview = () => console.log("Preview clicked");
  const handleFullscreen = () => console.log("Fullscreen clicked");

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-4 sm:px-6 sm:py-5 lg:px-10 xl:px-14">
        {/* Breadcrumb + Back Button */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            ← Back to Catalog
          </button>
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[65%_35%]">
          <ResourcePreview
            resource={activeResource}
            onPreview={handlePreview}
            onFullscreen={handleFullscreen}
          />
          <ResourceInfo
            resource={activeResource}
            onBuy={handleBuy}
            onWishlist={handleWishlist}
            onShare={handleShare}
            onReport={handleReport}
          />
        </div>

        {/* Main content column + sticky purchase card sit side by side on desktop */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-6">
            {/* Creator profile */}
            <CreatorProfile creator={activeResource.creator} />

            {/* Tabs + Tab content */}
            <div>
              <ResourceTabs
                activeTab={activeTab}
                onChange={setActiveTab}
                reviewCount={reviews.length}
                discussionCount={discussions.length}
              />

              {activeTab === "Description" && <DescriptionTab resource={activeResource} />}
              {activeTab === "Preview" && <PreviewTab resource={activeResource} />}
              {activeTab === "Reviews" && (
                <ReviewsTab resource={activeResource} reviews={reviews} distribution={ratingDistribution} />
              )}
              {activeTab === "Discussion" && <DiscussionTab discussions={discussions} />}
            </div>
          </div>

          {/* Sticky purchase card (desktop only) */}
          <PurchaseCard resource={activeResource} onBuy={handleBuy} />
        </div>

        {/* Related resources */}
        <RelatedResources resources={relatedResources} />
      </div>
    </div>
  );
}
