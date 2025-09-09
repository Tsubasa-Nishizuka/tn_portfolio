import labels from "src/labels";

export default function Header() {
  return (
    <header className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
        {labels.HEADER_TITLE}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto mb-6">
        {labels.HEADER_SUBTITLE}
      </p>

      {/* Technology Stack Badge */}
      <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {labels.HEADER_STATUS_NEXTJS}
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {labels.HEADER_STATUS_POSTGRESQL}
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            {labels.HEADER_DESCRIPTION}
          </span>
        </div>
      </div>
    </header>
  );
}
