import React, { useState } from "react";
import { Bell, Heart, Share2, Plus, Sparkles, Pin, CheckCircle2, MessageCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/**
 * CreatorNoticeboardPage Component (Module 4 - Item 15: Creator Noticeboard Space)
 * Social feed component displaying updates, announcements, and alerts from creators.
 */
export default function CreatorNoticeboardPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      creatorName: "Rohan Verma",
      creatorRole: "Java & Microservices Author",
      avatar: "RV",
      isPinned: true,
      title: "🔥 Java 21 Virtual Threads & Spring Boot 3.2 Cheat Sheet Released!",
      content: "Hey everyone! I just published the updated Java 21 Virtual Threads guide to the marketplace. It covers Project Loom, executor service changes, and high-concurrency benchmark results. Check it out in the catalog!",
      createdAt: "3 hours ago",
      likes: 142,
      comments: 18,
      category: "Announcement"
    },
    {
      id: 2,
      creatorName: "Priya Sharma",
      creatorRole: "DSA & Interview Prep Lead",
      avatar: "PS",
      isPinned: false,
      title: "📌 Weekly DSA Challenge: Dynamic Programming Masterclass",
      content: "Reminder: Tomorrow at 5 PM IST we are conducting a live Q&A doubt session on 2D Matrix Dynamic Programming problems. Make sure to book your session early!",
      createdAt: "1 day ago",
      likes: 89,
      comments: 7,
      category: "Event Alert"
    }
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Like post handler
  const handleLikePost = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) return { ...p, likes: p.likes + 1 };
      return p;
    }));
  };

  // Post new notice
  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) return;

    const newPost = {
      id: Date.now(),
      creatorName: "Arjun Mehta",
      creatorRole: "React & Frontend Creator",
      avatar: "AM",
      isPinned: false,
      title: newNoticeTitle.trim(),
      content: newNoticeContent.trim(),
      createdAt: "Just now",
      likes: 1,
      comments: 0,
      category: "Creator Update"
    };

    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
    setNewNoticeTitle("");
    setNewNoticeContent("");
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-6 space-y-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Noticeboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Bell className="h-6 w-6 text-amber-500" /> Creator Noticeboard Feed
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Announcements, course updates, and text alerts from your followed creators.
            </p>
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs gap-2 px-5 py-2.5 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Post Announcement
          </Button>
        </div>

        {/* Posts Social Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
              
              <CardHeader className="p-6 pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                      {post.creatorName}
                      <Badge className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0">Creator</Badge>
                    </h4>
                    <p className="text-[11px] text-gray-400">{post.creatorRole} • {post.createdAt}</p>
                  </div>
                </div>

                {post.isPinned && (
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 text-[10px] gap-1">
                    <Pin className="h-3 w-3" /> Pinned
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="px-6 py-2 space-y-2">
                <h3 className="font-bold text-base text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
              </CardContent>

              <CardFooter className="px-6 py-4 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold transition"
                  >
                    <Heart className="h-4 w-4 fill-rose-500" /> {post.likes} Likes
                  </button>

                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {post.comments} Comments
                  </span>
                </div>

                <button className="flex items-center gap-1 hover:text-indigo-600">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </CardFooter>

            </Card>
          ))}
        </div>

      </div>

      {/* Post Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Post Creator Announcement</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handlePostNotice} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Announcement Title *</label>
                <Input
                  placeholder="e.g. New System Design guide released!"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="bg-gray-50 dark:bg-black/20 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Notice Body Text *</label>
                <textarea
                  rows={4}
                  placeholder="Write message for your learners..."
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-md p-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold">Publish Feed Alert</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
