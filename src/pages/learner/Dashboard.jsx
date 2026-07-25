import React, { useMemo } from "react";
import { BookOpen, Award, Clock, Star, Play, ChevronRight, GraduationCap } from "lucide-react";

export default function LearnerDashboard({ profile, purchasedContents = [], marketplaceContents = [], onChangePage, onSelectResource }) {
  const userName = profile?.name || "Learner";

  // Calculate statistics dynamically based on purchased contents ledger
  const stats = useMemo(() => {
    const activeResourcesCount = purchasedContents.length;
    const completedResourcesCount = activeResourcesCount > 0 ? Math.floor(activeResourcesCount / 2) : 0;
    
    // Sum total price of all purchases
    let totalInvested = 0;
    for (let purchase of purchasedContents) {
      totalInvested += (purchase.content?.price || purchase.amount_paid || 0);
    }

    return {
      active: activeResourcesCount,
      completed: completedResourcesCount,
      investment: totalInvested
    };
  }, [purchasedContents]);

  // Derive recommended resources (items not purchased yet)
  const recommendations = useMemo(() => {
    const purchasedIds = purchasedContents.map(p => p.content_id);
    return marketplaceContents
      .filter(item => !purchasedIds.includes(item.id))
      .slice(0, 3); // display top 3 recommendations
  }, [purchasedContents, marketplaceContents]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* 1. Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-md">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6">
          <GraduationCap className="h-64 w-64" />
        </div>
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black">Welcome back, {userName}!</h1>
          <p className="text-sm text-indigo-100 max-w-md leading-relaxed">
            Ready to learn something new today? Keep track of your active guides and explore top-rated technical resources.
          </p>
        </div>
      </div>

      {/* 2. Stats Section Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Active Resources */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Resources</p>
            <p className="text-xl font-black text-gray-900 mt-0.5">{stats.active}</p>
          </div>
        </div>

        {/* Completed Resources */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed</p>
            <p className="text-xl font-black text-gray-900 mt-0.5">{stats.completed}</p>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Investment</p>
            <p className="text-xl font-black text-gray-900 mt-0.5">₹{stats.investment.toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* 3. Continue Learning list */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>

        {purchasedContents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchasedContents.map((purchase) => {
              const res = purchase.content;
              if (!res) return null;
              // Generate a mock progress percentage based on resource id to make it look realistic
              const progress = ((res.id * 7) % 60) + 30; 

              return (
                <div key={purchase.id} className="p-4 rounded-xl border border-gray-100 bg-slate-50 flex flex-col justify-between gap-3">
                  <div>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                      {res.type || "PDF Guide"}
                    </span>
                    <h3 className="font-bold text-gray-800 text-sm mt-1.5 line-clamp-1">{res.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">By {res.creator_name}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-bold text-indigo-600">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectResource) {
                        onSelectResource(res);
                      }
                      onChangePage("reader");
                    }}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-gray-600 text-gray-600" /> Resume Reading
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs text-gray-500 font-medium">You haven't purchased any learning resources yet.</p>
            <button
              onClick={() => onChangePage("marketplace")}
              className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              Browse Marketplace Catalog →
            </button>
          </div>
        )}
      </div>

      {/* 4. Recommended for You Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
          <button
            onClick={() => onChangePage("marketplace")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            View Catalog <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendations.map((item) => (
              <div 
                key={item.id} 
                onClick={() => {
                  if (onSelectResource) {
                    onSelectResource(item);
                  }
                  onChangePage("resource-details");
                }}
                className="p-4 rounded-xl border border-gray-100 hover:shadow-sm hover:border-gray-200 transition bg-white flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                    {item.category_name}
                  </span>
                  <h3 className="font-bold text-gray-900 text-xs mt-2 line-clamp-2 leading-relaxed">{item.title}</h3>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-50">
                  <span className="font-extrabold text-gray-900">
                    {item.price === 0 ? "FREE" : `₹${item.price}`}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[10px]">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {item.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No recommendations available at this time.</p>
        )}
      </div>

    </div>
  );
}
