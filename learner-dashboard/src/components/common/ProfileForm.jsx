import { UserCircle } from "lucide-react";

function ProfileForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm border">

      {/* Profile Header */}

      <div className="flex flex-col items-center">

        <UserCircle
          size={100}
          className="text-indigo-600"
        />

        <button
          className="
            mt-4
            rounded-xl
            bg-indigo-600
            px-5
            py-2
            text-white
            hover:bg-indigo-700
          "
        >
          Change Photo
        </button>

      </div>

      {/* Form */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Anuj Kumar"
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-600"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            defaultValue="anuj@email.com"
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-600"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="text"
            defaultValue="+91 9876543210"
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-600"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            College
          </label>

          <input
            type="text"
            defaultValue="CDAC PGCP-AC"
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-600"
          />

        </div>

      </div>

      {/* About */}

      <div className="mt-8">

        <label className="mb-2 block text-sm font-medium">
          About Me
        </label>

        <textarea
          rows="5"
          defaultValue="Passionate learner exploring Java, React and Spring Boot."
          className="w-full rounded-xl border p-4 outline-none focus:border-indigo-600"
        />

      </div>

      {/* Learning Preference */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Preferred Category
          </label>

          <select className="w-full rounded-xl border p-3">

            <option>Java</option>

            <option>React</option>

            <option>Spring Boot</option>

            <option>DSA</option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Skill Level
          </label>

          <select className="w-full rounded-xl border p-3">

            <option>Beginner</option>

            <option>Intermediate</option>

            <option>Advanced</option>

          </select>

        </div>

      </div>

      {/* Save Button */}

      <button
        className="
          mt-10
          rounded-xl
          bg-indigo-600
          px-8
          py-3
          text-white
          hover:bg-indigo-700
        "
      >
        Save Changes
      </button>

    </div>
  );
}

export default ProfileForm;