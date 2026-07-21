import { ArrowRight } from "lucide-react";
import StepCard from "./StepCard";
import { steps } from "../data/steps";

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Share your knowledge, help learners, and start earning
            in just three easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <StepCard step={step} />

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute right-[-35px] top-1/2 hidden -translate-y-1/2 text-gray-300 md:block">
                  <ArrowRight size={40} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;