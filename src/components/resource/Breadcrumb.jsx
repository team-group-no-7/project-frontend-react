import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto">
      <ol className="flex items-center gap-2 whitespace-nowrap text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span className="font-medium text-blue-600" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <a
                    href={item.path}
                    className="text-gray-500 transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </a>
                  <FaChevronRight className="h-2.5 w-2.5 text-gray-300" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
