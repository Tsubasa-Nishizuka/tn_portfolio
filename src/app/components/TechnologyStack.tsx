import labels from "src/labels";

export default function TechnologyStack() {
  return (
    <section className="mb-16">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="md:col-span-2 lg:col-span-4 text-center my-4">
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {labels.TECH_STACK_DESC}
            </p>
          </div>
          {/* Frontend */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{labels.TECH_STACK_FRONTEND_TITLE}</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>{labels.TECH_FRONTEND_ITEM1}</div>
                  <div>{labels.TECH_FRONTEND_ITEM2}</div>
                  <div>{labels.TECH_FRONTEND_ITEM3}</div>
                  <div>{labels.TECH_FRONTEND_ITEM4}</div>
              </div>
            </div>
          </div>

          {/* Application Server */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-lg p-6 border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{labels.TECH_STACK_APP_TITLE}</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>{labels.TECH_APP_ITEM1}</div>
                  <div>{labels.TECH_APP_ITEM2}</div>
                  <div>{labels.TECH_APP_ITEM3}</div>
                  <div>{labels.TECH_APP_ITEM4}</div>
              </div>
            </div>
          </div>

          {/* Database */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg shadow-lg p-6 border border-indigo-200 dark:border-indigo-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{labels.TECH_STACK_DB_TITLE}</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>{labels.TECH_DB_ITEM1}</div>
                  <div>{labels.TECH_DB_ITEM2}</div>
                  <div>{labels.TECH_DB_ITEM3}</div>
                  <div>{labels.TECH_DB_ITEM4}</div>
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg shadow-lg p-6 border border-orange-200 dark:border-orange-700 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{labels.TECH_STACK_INFRA_TITLE}</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>{labels.TECH_INFRA_ITEM1}</div>
                  <div>{labels.TECH_INFRA_ITEM2}</div>
                  <div>{labels.TECH_INFRA_ITEM3}</div>
                  <div>{labels.TECH_INFRA_ITEM4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
