import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import QuickAccess from "./components/QuickAccess";
import UserRegistration from "./components/UserRegistration";
import AIFeatures from "./components/AIFeatures";
import TechnologyStack from "./components/TechnologyStack";
import Features from "./components/Features";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Header />

        {/* セクション区切り - ページトップと認証セクションの間 */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 px-5 py-2 rounded-full shadow-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div role="heading" aria-level={2} className="text-2xl font-bold text-gray-800 dark:text-white">認証システム</div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 認証セクション */}
        <section className="mb-16">
          <div className="max-w-none mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <UserRegistration />
                </div>
                <div className="lg:col-span-1">
                  <QuickAccess />
                </div>
              </div>
            </div>
          </div>
        </section>

  {/* セクション区切り - 認証システムとAI開発の間 */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 px-5 py-2 rounded-full shadow-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div role="heading" aria-level={2} className="text-2xl font-bold text-gray-800 dark:text-white">AI開発</div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

  {/* AI機能セクション */}
  <section className="mb-16">
          <div className="max-w-none mx-auto">
            <div className="p-0">
              <AIFeatures />
            </div>
          </div>
        </section>

        {/* セクション区切り - AI開発と技術スタックの間 */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 px-5 py-2 rounded-full shadow-md">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div role="heading" aria-level={2} className="text-2xl font-bold text-gray-800 dark:text-white">技術スタック</div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 技術スタックセクション */}
        <section className="mb-16">
          <TechnologyStack />
        </section>

        {/* セクション区切り - 技術スタックと主な機能の間 */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 px-5 py-2 rounded-full shadow-md">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <div role="heading" aria-level={2} className="text-2xl font-bold text-gray-800 dark:text-white">主な機能</div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 主な機能セクション */}
        <section className="mb-16">
          <Features />
        </section>

        {/* セクション区切り - 主な機能とお問い合わせの間 */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 px-5 py-2 rounded-full shadow-md">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <div role="heading" aria-level={2} className="text-2xl font-bold text-gray-800 dark:text-white">お問い合わせ</div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* お問い合わせセクション */}
        <section className="mb-16">
          <Contact />
        </section>
        
        {/* チャットボット（1つだけ） */}
        <Chatbot />
      </div>
    </div>
  );
}
