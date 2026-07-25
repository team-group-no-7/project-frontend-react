function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border bg-white p-5">

      <div className="h-48 rounded-xl bg-gray-200"></div>

      <div className="mt-5 h-5 rounded bg-gray-200"></div>

      <div className="mt-3 h-4 w-2/3 rounded bg-gray-200"></div>

      <div className="mt-6 h-10 rounded-xl bg-gray-200"></div>

    </div>
  );
}

export default CardSkeleton;