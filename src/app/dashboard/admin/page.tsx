"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'admin') {
            setUser(data.user);
          } else {
            router.push('/signin?message=管理者権限が必要です');
          }
        } else {
          router.push('/signin?message=ログインが必要です');
        }
      } catch (error) {
        router.push('/signin?message=認証に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">認証確認中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="text-blue-600 mr-3">👨‍💼</span>
                管理者ダッシュボード
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                ようこそ、{user.name}さん！システム管理機能をご利用ください。
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              ログアウト
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">ユーザー管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">アカウント管理・権限設定</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">総ユーザー数</span>
                <span className="font-semibold text-gray-800 dark:text-white">127</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">アクティブユーザー</span>
                <span className="font-semibold text-gray-800 dark:text-white">89</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                ユーザー管理画面
              </button>
            </div>
          </div>

          {/* System Settings Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">システム設定</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">アプリケーション設定</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">セキュリティ設定</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">認証・暗号化設定</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">メール設定</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">SMTP・通知設定</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">バックアップ設定</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">データベース・ファイル</div>
              </button>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">分析・統計</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">システム利用状況</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">今日のログイン</span>
                <span className="font-semibold text-gray-800 dark:text-white">45</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">月間アクセス</span>
                <span className="font-semibold text-gray-800 dark:text-white">2,341</span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                詳細レポート
              </button>
            </div>
          </div>

          {/* Content Management Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">コンテンツ管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">ページ・ファイル管理</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
                <div className="text-sm font-medium text-orange-800 dark:text-orange-200">ページ管理</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">CMS・コンテンツ編集</div>
              </button>
              <button className="w-full text-left p-3 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
                <div className="text-sm font-medium text-orange-800 dark:text-orange-200">ファイル管理</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">メディア・アップロード</div>
              </button>
              <button className="w-full text-left p-3 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
                <div className="text-sm font-medium text-orange-800 dark:text-orange-200">キャッシュ管理</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">パフォーマンス最適化</div>
              </button>
            </div>
          </div>

          {/* Security Monitor Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">セキュリティ監視</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">ログ・脅威検知</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">システム正常</p>
                <p className="text-xs text-green-600 dark:text-green-400">脅威は検出されていません</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">注意</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">3回のログイン失敗</p>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                ログ詳細確認
              </button>
            </div>
          </div>

          {/* Database Management Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">データベース管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">DB監視・メンテナンス</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">データベース容量</span>
                <span className="font-semibold text-gray-800 dark:text-white">2.3 GB</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">アクティブ接続</span>
                <span className="font-semibold text-gray-800 dark:text-white">12</span>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors">
                DB管理画面
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-3">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">クイックアクション</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">よく使用する管理機能</p>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">新規ユーザー作成</div>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                <div className="text-sm font-medium text-green-800 dark:text-green-200">システムバックアップ</div>
              </button>
              <button className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">メンテナンスモード</div>
              </button>
              <button className="p-4 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                <div className="text-sm font-medium text-red-800 dark:text-red-200">キャッシュクリア</div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            トップページに戻る
          </Link>
        </footer>
      </div>
    </div>
  );
}
