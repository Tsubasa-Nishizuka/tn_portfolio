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

export default function MasterDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'master') {
            setUser(data.user);
          } else {
            router.push('/signin?message=マスター権限が必要です');
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">認証確認中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="text-purple-600 mr-3">👑</span>
                マスターダッシュボード
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                ようこそ、{user.name}さん！最高権限でシステム全体を制御できます。
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

        {/* System Status Overview */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">🚀 システム状態概要</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm opacity-80">稼働率</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2.1s</div>
                <div className="text-sm opacity-80">応答時間</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8.4GB</div>
                <div className="text-sm opacity-80">メモリ使用量</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-80">アクティブユーザー</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Super Admin Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">スーパー管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">最高権限機能</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">管理者権限付与</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">ユーザーの権限昇格</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">システム強制停止</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">緊急メンテナンス</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">データベース直接操作</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">SQL管理コンソール</div>
              </button>
            </div>
          </div>

          {/* Infrastructure Control */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">インフラ制御</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">サーバー・ネットワーク</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">CPU使用率</span>
                <span className="font-semibold text-gray-800 dark:text-white">23%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">ディスク容量</span>
                <span className="font-semibold text-gray-800 dark:text-white">67%</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                サーバー管理画面
              </button>
            </div>
          </div>

          {/* Critical Operations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">重要操作</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">慎重な操作が必要</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">⚠️ 全ユーザーデータ削除</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">復元不可能な操作</div>
              </button>
              <button className="w-full text-left p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">⚠️ システム初期化</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">工場出荷状態に戻す</div>
              </button>
              <button className="w-full text-left p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">⚠️ 緊急停止</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">即座にサービス停止</div>
              </button>
            </div>
          </div>

          {/* Advanced Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">高度分析</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">システム全体の洞察</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">パフォーマンス分析</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">詳細メトリクス</div>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">予測分析</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">AI機械学習</div>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">カスタムレポート</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">高度な可視化</div>
              </button>
            </div>
          </div>

          {/* Global Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">グローバル設定</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">システム全体の設定</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                <div className="text-sm font-medium text-green-800 dark:text-green-200">API制限設定</div>
                <div className="text-xs text-green-600 dark:text-green-400">レート制限・アクセス制御</div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                <div className="text-sm font-medium text-green-800 dark:text-green-200">ライセンス管理</div>
                <div className="text-xs text-green-600 dark:text-green-400">企業ライセンス・課金</div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                <div className="text-sm font-medium text-green-800 dark:text-green-200">法的設定</div>
                <div className="text-xs text-green-600 dark:text-green-400">プライバシー・コンプライアンス</div>
              </button>
            </div>
          </div>

          {/* Audit & Compliance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">監査・コンプライアンス</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">監査ログ・規制対応</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">監査ログ: 正常</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">すべての操作が記録されています</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">GDPR: 準拠</p>
                <p className="text-xs text-green-600 dark:text-green-400">データ保護規制に適合</p>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors">
                監査レポート出力
              </button>
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-3">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">🚨 緊急制御パネル</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">システム全体の緊急制御機能（使用時は十分注意してください）</p>
              </div>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              <button className="p-4 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors border-2 border-red-200 dark:border-red-700">
                <div className="text-sm font-medium text-red-800 dark:text-red-200">緊急停止</div>
                <div className="text-xs text-red-600 dark:text-red-400">全サービス停止</div>
              </button>
              <button className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors border-2 border-orange-200 dark:border-orange-700">
                <div className="text-sm font-medium text-orange-800 dark:text-orange-200">メンテナンス</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">保守モード移行</div>
              </button>
              <button className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors border-2 border-yellow-200 dark:border-yellow-700">
                <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">全ユーザー強制ログアウト</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">セキュリティ対応</div>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors border-2 border-purple-200 dark:border-purple-700">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">システム復旧</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">自動復旧実行</div>
              </button>
              <button className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors border-2 border-blue-200 dark:border-blue-700">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">フェイルオーバー</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">予備システム切替</div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-medium inline-flex items-center"
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
