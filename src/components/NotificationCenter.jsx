import React, { useState } from 'react';
import { Bell, Check, Trash2, ShoppingBag, MessageSquare, Video, Info } from 'lucide-react';
import { Button } from './ui/button';

/**
 * NotificationCenter Component (Module 9: Notifications)
 * Beginner friendly notification dropdown for navbar.
 * Displays notifications for purchases, Q&A replies, and doubt sessions.
 */
export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'PURCHASE',
      title: 'Purchase Successful! 🎉',
      message: 'You unlocked "Complete Java Spring Boot Guide". Check your library.',
      time: '10 mins ago',
      isRead: false,
      icon: ShoppingBag,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      id: 2,
      type: 'QA',
      title: 'New Reply on Q&A Forum',
      message: 'Rohan Verma answered your question regarding Spring Data JPA transactions.',
      time: '1 hour ago',
      isRead: false,
      icon: MessageSquare,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
      id: 3,
      type: 'SESSION',
      title: 'Doubt Session Confirmed',
      message: 'Your 1-on-1 session with Priya Sharma is confirmed for tomorrow at 10:00 AM.',
      time: '3 hours ago',
      isRead: false,
      icon: Video,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
    },
    {
      id: 4,
      type: 'SYSTEM',
      title: 'Welcome to LearnHub!',
      message: 'Explore marketplace notes and start learning or publishing content today.',
      time: '1 day ago',
      isRead: true,
      icon: Info,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40'
    }
  ]);

  // Count unread items
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true }))
    );
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };

  // Toggle single notification read state
  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item
      )
    );
  };

  return (
    <div className="relative inline-block text-left">
      
      {/* Bell Button Header Icon */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 h-9 w-9 rounded-xl border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Popover Dropdown */}
      {isOpen && (
        <>
          {/* Overlay click catcher */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 shadow-2xl z-50 overflow-hidden">
            
            {/* Popover Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs px-2 py-0.5 rounded-full font-bold">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 flex items-center gap-1"
                    title="Mark all as read"
                  >
                    <Check className="h-3 w-3" /> Mark read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-[11px] text-gray-400 hover:text-red-500 p-1 rounded-md"
                    title="Clear all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Notification List Content */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400">
                  No new notifications right now.
                </div>
              ) : (
                notifications.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleRead(item.id)}
                      className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                        item.isRead
                          ? 'bg-white dark:bg-[#121124] opacity-75'
                          : 'bg-indigo-50/40 dark:bg-indigo-950/20'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${item.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-gray-400">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.message}
                        </p>
                      </div>

                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="p-2.5 bg-gray-50 dark:bg-gray-900/40 text-center border-t border-gray-100 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                Showing recent activity alerts
              </span>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
