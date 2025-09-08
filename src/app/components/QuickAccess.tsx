import Link from "next/link";

export default function QuickAccess() {
  return (
    <section className="mb-16">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          🚀 クイックアクセス
        </h2>

        {/* Login Button */}
        <div className="text-center mb-6">
          <Link
            href="/signin"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            ログイン / Sign In
          </Link>
        </div>

        {/* Demo Accounts */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
            🧪 デモアカウント（すぐにお試しいただけます）
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
              <div className="font-medium text-green-600 dark:text-green-400">👤 ユーザー</div>
              <div className="text-gray-600 dark:text-gray-300">user@demo.com</div>
              <div className="text-gray-500 dark:text-gray-400">password123</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
              <div className="font-medium text-blue-600 dark:text-blue-400">👨‍💼 管理者</div>
              <div className="text-gray-600 dark:text-gray-300">admin@demo.com</div>
              <div className="text-gray-500 dark:text-gray-400">password123</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">
              <div className="font-medium text-purple-600 dark:text-purple-400">👑 マスター</div>
              <div className="text-gray-600 dark:text-gray-300">master@demo.com</div>
              <div className="text-gray-500 dark:text-gray-400">password123</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
