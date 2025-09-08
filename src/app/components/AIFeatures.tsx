export default function AIFeatures() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
        AI開発サービス
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* 営業AI */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">営業AI</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              アウトバウンド営業
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              スケジュール調整・リマインド
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              ワークフロー自動処理
            </div>
          </div>
        </div>

        {/* サポートAI */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">サポートAI</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Web/電話/LINE/メール/SNS対応
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              面接日程調整・自動通知
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              HubSpot等との統合
            </div>
          </div>
        </div>

        {/* 事務・バックオフィスAI */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">事務・バックオフィスAI</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              ワークフロー自動処理
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              スケジュール調整・リマインド
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              事務・バックオフィスAI
            </div>
          </div>
        </div>

        {/* 経営支援AI */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl shadow-lg p-6 border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">経営支援AI</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              AIアナリスト
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              売上・顧客データ分析
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              施策提案
            </div>
          </div>
        </div>

        {/* 経理AI */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl shadow-lg p-6 border border-pink-200 dark:border-pink-800 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">経理AI</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              AI経理エージェント
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              請求書処理自動化
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              財務分析・レポート
            </div>
          </div>
        </div>

        {/* 人事AI */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl shadow-lg p-6 border border-indigo-200 dark:border-indigo-800 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">人事AI</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              採用プロセス最適化
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              研修・育成プログラム
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              パフォーマンス分析
            </div>
          </div>
        </div>
      </div>

      {/* 統合・基盤機能 */}
      <div className="mt-16 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900/20 dark:to-blue-900/20 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          統合・基盤機能
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m-6-2l1.5-1.5M6 12l-1.5-1.5M3 9l1.5-1.5M6 6l1.5-1.5m7.5 0L15 6m1.5-1.5L18 6m1.5 1.5L18 9m-1.5 1.5L15 12" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">セキュリティ</h4>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">エンタープライズレベルのセキュリティ</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 backdrop-blur-sm rounded-xl p-6 border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">スコアリング</h4>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">商談確度・顧客価値の自動算出</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">API連携</h4>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">既存システムとのシームレス統合</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">分析・レポート</h4>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">詳細なパフォーマンス分析レポート</div>
          </div>
        </div>
      </div>

      {/* 可能な具体的な業務改善効果 */}
      <div className="mt-16 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl shadow-xl p-8 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          可能な具体的な業務改善効果
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* 売上向上 */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">売上向上</h4>
            </div>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                営業効率30-50%向上
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                商談成約率20-40%改善
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                15-25%アップ
              </div>
            </div>
          </div>

          {/* コスト削減 */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">コスト削減</h4>
            </div>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                人件費40-60%削減
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                事務処理時間70-80%短縮
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                サポート対応コスト50%減
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                採用・研修コスト30%削減
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                ヒューマンエラー90%以上削減
              </div>
            </div>
          </div>

          {/* 意思決定支援 */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">意思決定支援</h4>
            </div>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                データ分析時間90%短縮
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                予測精度80-95%向上
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                レポート作成自動化
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                リアルタイム経営判断可能
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                リスク予測・早期対応実現
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
