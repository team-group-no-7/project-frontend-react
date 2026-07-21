const StepCard = ({ step }) => {
  const Icon = step.icon;

  return (
    <div
      className="
      group
      relative
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-8
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
    "
    >
      <div
        className={`
        ${step.bg}
        ${step.color}
        mb-6
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
      `}
      >
        <Icon size={30} />
      </div>

      <h3 className="mb-3 text-xl font-bold text-gray-900">
        {step.title}
      </h3>

      <p className="leading-7 text-gray-500">
        {step.description}
      </p>
    </div>
  );
};

export default StepCard;