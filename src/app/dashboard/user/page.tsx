"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  website?: string;
  location?: string;
  birth_date?: string;
  github_url?: string;
  linkedin_url?: string;
  created_at?: string;
  updated_at?: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    avatar_url: '',
    bio: '',
    phone: '',
    website: '',
    location: '',
    birth_date: '',
    github_url: '',
    linkedin_url: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'user') {
            setUser(data.user);
            // フォームに現在の値を設定
            setEditForm({
              name: data.user.name || '',
              avatar_url: data.user.avatar_url || '',
              bio: data.user.bio || '',
              phone: data.user.phone || '',
              website: data.user.website || '',
              location: data.user.location || '',
              birth_date: data.user.birth_date || '',
              github_url: data.user.github_url || '',
              linkedin_url: data.user.linkedin_url || ''
            });
          } else {
            router.push('/signin?message=ユーザー権限が必要です');
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

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    // フォームをリセット
    if (user) {
      setEditForm({
        name: user.name || '',
        avatar_url: user.avatar_url || '',
        bio: user.bio || '',
        phone: user.phone || '',
        website: user.website || '',
        location: user.location || '',
        birth_date: user.birth_date || '',
        github_url: user.github_url || '',
        linkedin_url: user.linkedin_url || ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user);
        setIsEditModalOpen(false);
        // 成功メッセージを表示（オプション）
        alert('プロフィールが正常に更新されました！');
      } else {
        const errorData = await response.json();
        alert(`エラー: ${errorData.message || 'プロフィールの更新に失敗しました'}`);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('プロフィールの更新中にエラーが発生しました');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">認証確認中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="text-green-600 mr-3">👤</span>
                ユーザーダッシュボード
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                ようこそ、{user.name}さん！個人用機能をご利用ください。
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
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">プロフィール</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">個人情報の確認・編集</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">名前</p>
                <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">メールアドレス</p>
                <p className="font-medium text-gray-800 dark:text-white">{user.email}</p>
              </div>
              {user.bio && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">自己紹介</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user.bio}</p>
                </div>
              )}
              {user.location && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">所在地</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user.location}</p>
                </div>
              )}
              {user.website && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">ウェブサイト</p>
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="font-medium text-green-600 dark:text-green-400 hover:underline">
                    {user.website}
                  </a>
                </div>
              )}
              <div className="flex space-x-2">
                {user.github_url && (
                  <a href={user.github_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-800 text-white text-center py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    GitHub
                  </a>
                )}
                {user.linkedin_url && (
                  <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    LinkedIn
                  </a>
                )}
              </div>
              <button 
                onClick={handleEditProfile}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
              >
                プロフィール編集
              </button>
            </div>
          </div>

          {/* My Tasks Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">マイタスク</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">個人のタスク管理</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">進行中のタスク</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">3件のタスクが残っています</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">完了済み</p>
                <p className="text-xs text-green-600 dark:text-green-400">今週12件のタスクを完了</p>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                タスク管理
              </button>
            </div>
          </div>

          {/* My Files Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">マイファイル</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">個人ファイル管理</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">総ファイル数</span>
                <span className="font-semibold text-gray-800 dark:text-white">24</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">使用容量</span>
                <span className="font-semibold text-gray-800 dark:text-white">2.3 GB</span>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                ファイル管理
              </button>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">通知</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">重要なお知らせ</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">システム更新</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">新機能が追加されました</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">重要</p>
                <p className="text-xs text-red-600 dark:text-red-400">パスワード変更推奨</p>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors">
                全ての通知
              </button>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">個人設定</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">アカウント設定</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">パスワード変更</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">通知設定</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">プライバシー設定</div>
              </button>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">活動サマリー</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">今月の活動状況</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">ログイン回数</span>
                <span className="font-semibold text-gray-800 dark:text-white">28回</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">完了タスク</span>
                <span className="font-semibold text-gray-800 dark:text-white">45件</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">アップロード</span>
                <span className="font-semibold text-gray-800 dark:text-white">12ファイル</span>
              </div>
            </div>
          </div>
        </main>

        {/* プロフィール編集モーダル */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">プロフィール編集</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        名前 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        所在地
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={editForm.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="東京都渋谷区"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      自己紹介
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={editForm.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="あなたについて簡単に教えてください..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="090-1234-5678"
                      />
                    </div>

                    <div>
                      <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        生年月日
                      </label>
                      <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        value={editForm.birth_date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      アバター画像URL
                    </label>
                    <input
                      type="url"
                      id="avatar_url"
                      name="avatar_url"
                      value={editForm.avatar_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ウェブサイト
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={editForm.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        id="github_url"
                        name="github_url"
                        value={editForm.github_url}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        id="linkedin_url"
                        name="linkedin_url"
                        value={editForm.linkedin_url}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isUpdating ? '更新中...' : '更新'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <Link
            href="/"
            className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium inline-flex items-center"
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
