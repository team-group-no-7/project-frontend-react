import { MessageSquare } from "lucide-react";
import QuestionCard from "./QuestionCard";

export default function DiscussionTab({ discussions }) {
  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="flex flex-col gap-3 rounded-2xl bg-gray-50 p-4 sm:flex-row sm:items-center">
        <textarea
          rows={1}
          placeholder="Ask the creator a question about this resource..."
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-blue-400"
        />
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Post
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {discussions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
