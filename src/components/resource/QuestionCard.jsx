import { useState } from "react";
import { FaReply } from "react-icons/fa";
import ReplyCard from "./ReplyCard";

export default function QuestionCard({ question }) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-4">
      <div className="flex gap-3">
        <img
          src={question.avatar}
          alt={question.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">{question.name}</span>
            <span className="text-xs text-gray-400">{question.time}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">{question.question}</p>

          <button
            type="button"
            onClick={() => setShowReplyBox((v) => !v)}
            className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            <FaReply className="h-3 w-3" />
            Reply
          </button>

          {showReplyBox && (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Write a reply..."
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-blue-400"
              />
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>

      {question.replies.length > 0 && (
        <div className="flex flex-col gap-3 border-l-2 border-gray-100 pl-4">
          {question.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
