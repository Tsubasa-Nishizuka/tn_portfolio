import Link from "next/link";
import labels from "src/labels";

export default function QuickAccess() {
  return (
    <div className="bg-white p-6 h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          {labels.QUICK_ACCESS_HEADER}
      </h2>

      {/* Demo Accounts */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1 mb-6">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
            {labels.QUICK_ACCESS_DEMO_TITLE}
        </p>
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-600 rounded-lg p-3 border-l-4 border-green-500 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                  <div className="font-semibold text-green-600 dark:text-green-400 text-sm">{labels.QUICK_ACCESS_USER_ROLE}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs truncate">user@demo.com</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-600 rounded-lg p-3 border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-sm">👨‍💼</span>
              </div>
              <div className="flex-1 min-w-0">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 text-sm">{labels.QUICK_ACCESS_ADMIN_ROLE}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs truncate">admin@demo.com</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-600 rounded-lg p-3 border-l-4 border-purple-500 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-sm">👑</span>
              </div>
              <div className="flex-1 min-w-0">
                  <div className="font-semibold text-purple-600 dark:text-purple-400 text-sm">{labels.QUICK_ACCESS_MASTER_ROLE}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs truncate">master@demo.com</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
              {labels.QUICK_ACCESS_PASSWORD_LABEL} {labels.QUICK_ACCESS_USER_PASSWORD}
          </p>
        </div>
      </div>

      {/* Login Button */}
      <div className="text-center">
        <Link
          href="/signin"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-sm w-full"
        >
          {labels.QUICK_ACCESS_LOGIN_BUTTON}
        </Link>
      </div>
    </div>
  );
}
