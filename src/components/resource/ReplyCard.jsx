export default function ReplyCard({ reply }) {
  return (
    <div className="flex gap-3 pl-4">
      <img
        src={reply.avatar}
        alt={reply.name}
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
      <div className="flex-1 rounded-2xl bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">{reply.name}</span>
          {reply.isCreator && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Creator
            </span>
          )}
          <span className="text-xs text-gray-400">{reply.time}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{reply.reply}</p>
      </div>
    </div>
  );
}
