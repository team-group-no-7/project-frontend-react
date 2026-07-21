import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-r
            from-indigo-600
            via-blue-600
            to-purple-600
            px-8
            py-16
            text-center
            text-white
            lg:px-20
          "
        >
          {/* Background Decorations */}

          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

          {/* Content */}

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              🚀 Join Thousands of Learners
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
              Start Your Learning Journey Today
            </h2>

            <p className="mt-6 text-lg text-indigo-100">
              Discover high-quality notes, projects, interview experiences,
              and connect with creators who are passionate about sharing
              knowledge.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                className="
                  rounded-xl
                  bg-white
                  px-7
                  py-3.5
                  font-semibold
                  text-indigo-600
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                Get Started
              </button>

              <button
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/40
                  bg-white/10
                  px-7
                  py-3.5
                  font-semibold
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:bg-white/20
                "
              >
                Explore Resources
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;