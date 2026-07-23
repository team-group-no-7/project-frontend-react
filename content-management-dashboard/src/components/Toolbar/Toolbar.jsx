import { FaPlus, FaSearch } from "react-icons/fa";

function Toolbar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  sortBy,
  setSortBy,
  onAddResource,
}) {

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Controls */}

        <div className="flex flex-1 flex-col gap-4 lg:flex-row">

          {/* Search */}

          <div className="relative flex-1">

            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />

          </div>

          {/* Category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          >
            <option>All Categories</option>
            <option>Programming</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
          </select>

        </div>

        {/* Add Resource Button */}

       <button
          onClick={onAddResource}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <FaPlus />
          Add Resource
        </button>

      </div>

    </section>
  );
}

export default Toolbar;