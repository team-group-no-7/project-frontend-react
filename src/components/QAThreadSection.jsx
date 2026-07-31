import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Send, CornerDownRight, CheckCircle2, User, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import api from "@/utils/api";

export default function QAThreadSection({ contentId = 11, title = "Java Spring Boot Guide", profile }) {
  const [threads, setThreads] = useState([]);

  // Fetch threads from DB backend on mount or contentId change
  useEffect(() => {
    if (!contentId) return;
    api.get(`/api/qa/content/${contentId}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(t => ({
            id: t.id,
            author: t.authorName || "Learner",
            role: t.role || "LEARNER",
            question: t.question,
            createdAt: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "Recently",
            upvotes: t.upvotes || 1,
            isResolved: Boolean(t.isResolved),
            replies: (t.replies || []).map(r => ({
              id: r.id,
              author: r.authorName || "Mentor",
              role: r.role || "CREATOR",
              reply: r.reply,
              createdAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recently",
              upvotes: r.upvotes || 1,
              isVerifiedAnswer: Boolean(r.isVerifiedAnswer)
            }))
          }));
          setThreads(normalized);
        } else {
          setThreads([
            {
              id: 1,
              author: "Priya Sharma",
              role: "LEARNER",
              question: "How do we handle circular dependency issues in Spring Boot when using @Autowired on constructor injection?",
              createdAt: "2 hours ago",
              upvotes: 8,
              isResolved: true,
              replies: [
                {
                  id: 101,
                  author: "Rohan Verma",
                  role: "CREATOR",
                  reply: "Great question! You can resolve it using @Lazy annotation on one of the constructor parameters.",
                  createdAt: "1 hour ago",
                  upvotes: 12,
                  isVerifiedAnswer: true
                }
              ]
            }
          ]);
        }
      })
      .catch(() => {});
  }, [contentId]);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState("");
  
  // Reply box state
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Post a new question
  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const payload = {
      contentId: Number(contentId),
      authorName: profile?.name || "Arjun Mehta",
      role: profile?.role || "LEARNER",
      question: newQuestionText.trim(),
      upvotes: 1,
      isResolved: false
    };

    api.post("/api/qa/question", payload)
      .then((res) => {
        const saved = res.data?.data || res.data;
        const newThread = {
          id: saved?.id || Date.now(),
          author: payload.authorName,
          role: payload.role,
          question: payload.question,
          createdAt: "Just now",
          upvotes: 1,
          isResolved: false,
          replies: []
        };
        setThreads([newThread, ...threads]);
        setNewQuestionText("");
      })
      .catch(() => {
        const newThread = {
          id: Date.now(),
          author: payload.authorName,
          role: payload.role,
          question: payload.question,
          createdAt: "Just now",
          upvotes: 1,
          isResolved: false,
          replies: []
        };
        setThreads([newThread, ...threads]);
        setNewQuestionText("");
      });
  };

  // Post a reply to an existing question
  const handlePostReply = (threadId) => {
    if (!replyText.trim()) return;

    const payload = {
      authorName: profile?.name || "Arjun Mehta",
      role: profile?.role || "LEARNER",
      reply: replyText.trim(),
      upvotes: 1
    };

    api.post(`/api/qa/thread/${threadId}/reply`, payload)
      .then((res) => {
        const saved = res.data?.data || res.data;
        setThreads(threads.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              isResolved: payload.role === "CREATOR" ? true : t.isResolved,
              replies: [...t.replies, {
                id: saved?.id || Date.now(),
                author: payload.authorName,
                role: payload.role,
                reply: payload.reply,
                createdAt: "Just now",
                upvotes: 1,
                isVerifiedAnswer: payload.role === "CREATOR"
              }]
            };
          }
          return t;
        }));
        setReplyText("");
        setActiveReplyId(null);
      })
      .catch(() => {
        setThreads(threads.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              replies: [...t.replies, {
                id: Date.now(),
                author: payload.authorName,
                role: payload.role,
                reply: payload.reply,
                createdAt: "Just now",
                upvotes: 1,
                isVerifiedAnswer: false
              }]
            };
          }
          return t;
        }));
        setReplyText("");
        setActiveReplyId(null);
      });
  };

  // Upvote question
  const handleUpvoteQuestion = (threadId) => {
    setThreads(threads.map(t => {
      if (t.id === threadId) {
        return { ...t, upvotes: t.upvotes + 1 };
      }
      return t;
    }));
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <CardTitle className="text-base font-bold">Q&A Discussion Forum</CardTitle>
        </div>
        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 text-xs">
          {threads.length} Questions
        </Badge>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        
        {/* Post Question Input Form */}
        <form onSubmit={handlePostQuestion} className="space-y-3 p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
            <HelpCircle className="h-4 w-4 text-indigo-500" /> Ask a Technical Question about this Content
          </div>
          <Input
            placeholder="Type your doubt (e.g. How does garbage collection work in Java 21?)..."
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            className="bg-white dark:bg-gray-900 text-xs"
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-1.5 px-4">
              <Send className="h-3.5 w-3.5" /> Post Question
            </Button>
          </div>
        </form>

        {/* Discussion Threads List */}
        <div className="space-y-5">
          {threads.map((thread) => (
            <div key={thread.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#18172c] space-y-3">
              
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 font-bold text-xs flex items-center justify-center">
                    {thread.author[0]}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gray-900 dark:text-white">{thread.author}</span>
                    <span className="text-[10px] text-gray-400 block">{thread.createdAt}</span>
                  </div>
                </div>

                {thread.isResolved && (
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-300 text-[10px] gap-1" variant="outline">
                    <CheckCircle2 className="h-3 w-3" /> Resolved
                  </Badge>
                )}
              </div>

              {/* Question Text */}
              <p className="text-xs text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                {thread.question}
              </p>

              {/* Question Actions */}
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 border-t border-gray-50 dark:border-gray-800">
                <button
                  onClick={() => handleUpvoteQuestion(thread.id)}
                  className="flex items-center gap-1 hover:text-indigo-600 text-[11px] font-semibold"
                >
                  <ThumbsUp className="h-3.5 w-3.5" /> {thread.upvotes} Upvotes
                </button>

                <button
                  onClick={() => setActiveReplyId(activeReplyId === thread.id ? null : thread.id)}
                  className="flex items-center gap-1 hover:text-indigo-600 text-[11px] font-semibold"
                >
                  <CornerDownRight className="h-3.5 w-3.5" /> Reply ({thread.replies.length})
                </button>
              </div>

              {/* Nested Replies List */}
              {thread.replies.length > 0 && (
                <div className="pl-6 border-l-2 border-indigo-100 dark:border-indigo-950 space-y-3 pt-2">
                  {thread.replies.map((reply) => (
                    <div key={reply.id} className="p-3 rounded-lg bg-gray-50 dark:bg-black/30 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-white">{reply.author}</span>
                          {reply.role === "CREATOR" && (
                            <Badge className="bg-amber-500 text-white text-[9px] px-1.5 py-0">Creator</Badge>
                          )}
                        </div>
                        {reply.isVerifiedAnswer && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            ✓ Verified Answer
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{reply.reply}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Reply Input */}
              {activeReplyId === thread.id && (
                <div className="pl-6 pt-2 space-y-2">
                  <Input
                    placeholder="Write your answer..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="bg-gray-50 dark:bg-black/20 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setActiveReplyId(null)} className="text-[11px]">
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handlePostReply(thread.id)} className="bg-indigo-600 text-white text-[11px]">
                      Submit Reply
                    </Button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
