import Link from "next/link";
import labels from "src/labels";

export default function UserRegistration() {
  return (
    <div className="bg-white  p-8 h-full">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-8">
        {labels.USER_REG_TITLE}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Registration */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              {labels.USER_REG_USER_TITLE}
            </h3>
            <div className="h-16 flex items-center justify-center mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                {labels.USER_REG_USER_DESC}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                href="/signup/user"
                className="inline-block w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold text-center"
              >
                {labels.USER_REG_USER_BUTTON}
              </Link>
            </div>
          </div>
        </div>

        {/* Admin Registration */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              {labels.USER_REG_ADMIN_TITLE}
            </h3>
            <div className="h-16 flex items-center justify-center mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                {labels.USER_REG_ADMIN_DESC}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                href="/signup/admin"
                className="inline-block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-center"
              >
                {labels.USER_REG_ADMIN_BUTTON}
              </Link>
            </div>
          </div>
        </div>

        {/* Master Registration */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300 flex flex-col">
          <div className="text-center flex-1 flex flex-col">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              {labels.USER_REG_MASTER_TITLE}
            </h3>
            <div className="h-16 flex items-center justify-center mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                {labels.USER_REG_MASTER_DESC}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                href="/signup/master"
                className="inline-block w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold text-center"
              >
                {labels.USER_REG_MASTER_BUTTON}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
