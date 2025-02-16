import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          HR Succession Planning System
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Officers Card */}
          <Link 
            href="/officers"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Officers</h2>
            <p className="text-gray-600">
              Manage officer profiles, competencies, and career development.
            </p>
          </Link>

          {/* Positions Card */}
          <Link 
            href="/positions"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Positions</h2>
            <p className="text-gray-600">
              View and update position details and succession plans.
            </p>
          </Link>

          {/* Stints Card */}
          <Link 
            href="/stints"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Stints</h2>
            <p className="text-gray-600">
              Track and manage out-of-agency attachments and training programs.
            </p>
          </Link>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Officers</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Positions</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Stints</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
