import labels from "src/labels";

export default function AIFeatures() {
  return (
    <section className="mb-12">
      {/* AI開発サービス */}
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
             {labels.AI_FEATURES_TITLE}
          </h2>
          <div className="w-20 h-0.5 bg-gray-900 dark:bg-white mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* 営業AI */}
          <div className="group bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_SALES_NAME}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{labels.AI_SALES_DESC}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_SALES_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_SALES_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_SALES_FEATURE3}</span>
              </div>
            </div>
          </div>

          {/* サポートAI */}
          <div className="group bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1C18.08 1 23 5.92 23 12S18.08 23 12 23C10.35 23 8.78 22.6 7.38 21.9L3 23L4.1 18.62C3.4 17.22 3 15.65 3 14C3 7.92 7.92 3 14 3H12C12 1 12 1 12 1ZM8.5 11A1.5 1.5 0 1 0 8.5 14A1.5 1.5 0 0 0 8.5 11ZM12 11A1.5 1.5 0 1 0 12 14A1.5 1.5 0 0 0 12 11ZM15.5 11A1.5 1.5 0 1 0 15.5 14A1.5 1.5 0 0 0 15.5 11Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_SUPPORT_NAME}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{labels.AI_SUPPORT_DESC}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_SUPPORT_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_SUPPORT_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_SUPPORT_FEATURE3}</span>
              </div>
            </div>
          </div>

          {/* 事務・バックオフィスAI */}
          <div className="group bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12V14H16V12H8ZM8 16V18H13V16H8Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_OFFICE_NAME}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{labels.AI_OFFICE_DESC}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_OFFICE_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_OFFICE_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_OFFICE_FEATURE3}</span>
              </div>
            </div>
          </div>

          {/* 経営支援AI */}
          <div className="group bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-purple-500 rounded-lg flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18V4C5 2.9 5.9 2 7 2H17C18.1 2 19 2.9 19 4V13.18C19.3 13.07 19.65 13 20 13C21.1 13 22 13.9 22 15V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V15C2 13.9 2.9 13 4 13C4.35 13 4.7 13.07 5 13.18ZM12 7.5C11.17 7.5 10.5 8.17 10.5 9S11.17 10.5 12 10.5 13.5 9.83 13.5 9 12.83 7.5 12 7.5Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_MANAGEMENT_NAME}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{labels.AI_MANAGEMENT_DESC}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_MANAGEMENT_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_MANAGEMENT_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_MANAGEMENT_FEATURE3}</span>
              </div>
            </div>
          </div>

          {/* 経理AI */}
          <div className="group bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_ACCOUNTING_NAME}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{labels.AI_ACCOUNTING_DESC}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_ACCOUNTING_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_ACCOUNTING_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_ACCOUNTING_FEATURE3}</span>
              </div>
            </div>
          </div>

          {/* 人事AI */}
          <div className="group bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4ZM16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14ZM12.5 11.5C12.8 11.8 13.1 12 13.5 12.1C12.6 12.8 12 13.9 12 15.1V16H4V15C4 13.3 6.7 12 10 12C10.9 12 11.7 12.1 12.5 12.2V11.5ZM10 4C11.1 4 12 4.9 12 6S11.1 8 10 8 8 7.1 8 6 8.9 4 10 4Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_HR_NAME}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{labels.AI_HR_DESC}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_HR_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_HR_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_HR_FEATURE3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 統合・基盤機能 */}
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {labels.AI_INTEGRATION_TITLE}
          </h3>
          <div className="w-16 h-0.5 bg-gray-900 dark:bg-white mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-purple-600 dark:text-purple-400 font-bold text-lg mb-2">{labels.AI_INTEGRATION_FEATURE1_NAME}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{labels.AI_INTEGRATION_FEATURE1_DESC}</div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H19V9Z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-orange-600 dark:text-orange-400 font-bold text-lg mb-2">{labels.AI_INTEGRATION_FEATURE2_NAME}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{labels.AI_INTEGRATION_FEATURE2_DESC}</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12S8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5S19.66 2 18 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12S4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92S20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">{labels.AI_INTEGRATION_FEATURE3_NAME}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{labels.AI_INTEGRATION_FEATURE3_DESC}</div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">{labels.AI_INTEGRATION_FEATURE4_NAME}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{labels.AI_INTEGRATION_FEATURE4_DESC}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 可能な具体的な業務改善効果 */}
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {labels.AI_IMPROVEMENT_TITLE}
          </h3>
          <div className="w-16 h-0.5 bg-gray-900 dark:bg-white mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* 売上向上 */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_IMPROVEMENT_SALES_TITLE}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{labels.AI_IMPROVEMENT_SALES_DESC}</p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_SALES_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_SALES_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_SALES_FEATURE3}</span>
              </div>
            </div>
          </div>

          {/* コスト削減 */}
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_IMPROVEMENT_EFFICIENCY_TITLE}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{labels.AI_IMPROVEMENT_EFFICIENCY_DESC}</p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_EFFICIENCY_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_EFFICIENCY_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_EFFICIENCY_FEATURE3}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_EFFICIENCY_FEATURE4}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_EFFICIENCY_FEATURE5}</span>
              </div>
            </div>
          </div>

          {/* 意思決定支援 */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2ZM4 14L5 17H7L6 14H4ZM18 14L17 17H19L20 14H18Z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{labels.AI_IMPROVEMENT_ACCURACY_TITLE}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{labels.AI_IMPROVEMENT_ACCURACY_DESC}</p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_ACCURACY_FEATURE1}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_ACCURACY_FEATURE2}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_ACCURACY_FEATURE3}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_ACCURACY_FEATURE4}</span>
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span>{labels.AI_IMPROVEMENT_ACCURACY_FEATURE5}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
