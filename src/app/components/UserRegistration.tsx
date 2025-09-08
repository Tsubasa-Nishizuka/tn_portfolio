import Link from "next/link";

export default function UserRegistration() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
        新規アカウント作成
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* User Registration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              ユーザー登録
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm h-12 flex items-center justify-center">
              ユーザー機能がご利用いただけます。
              ユーザー用画面にアクセス可能。
            </p>
            <Link
              href="/signup/user"
              className="inline-block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              ユーザー登録
            </Link>
          </div>
        </div>

        {/* Admin Registration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              管理者登録
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm h-12 flex items-center justify-center">
              システム管理機能をご利用いただけます。
              ユーザー管理・設定変更が可能。
            </p>
            <Link
              href="/signup/admin"
              className="inline-block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              管理者登録
            </Link>
          </div>
        </div>

        {/* Master Registration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              マスター登録
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm h-12 flex items-center justify-center">
              最高権限でのアクセスが可能です。
              システム全体の完全制御権限。
            </p>
            <Link
              href="/signup/master"
              className="inline-block w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              マスター登録
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
