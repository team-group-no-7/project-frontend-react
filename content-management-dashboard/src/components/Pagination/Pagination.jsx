function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="mt-6 flex items-center justify-between">

      {/* Previous */}

      <button
        onClick={() =>
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
        disabled={currentPage === 1}
        className={`rounded-lg px-4 py-2 border transition
        ${
          currentPage === 1
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "bg-white hover:bg-slate-100"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}

      <div className="flex gap-2">

        {Array.from({ length: totalPages }, (_, index) => {

          const page = index + 1;

          return (

            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-10 w-10 rounded-lg transition
              ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-slate-100"
              }`}
            >
              {page}
            </button>

          );

        })}

      </div>

      {/* Next */}

      <button
        onClick={() =>
          setCurrentPage((prev) =>
            Math.min(prev + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className={`rounded-lg px-4 py-2 border transition
        ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "bg-white hover:bg-slate-100"
        }`}
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;