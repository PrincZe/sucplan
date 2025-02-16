'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { PositionWithRelations } from '@/lib/queries/positions'

interface PositionDetailProps {
  position: PositionWithRelations
}

export default function PositionDetail({ position }: PositionDetailProps) {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {position.position_title}
          </h2>
          <div className="flex space-x-4">
            <Link
              href="/positions"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to List
            </Link>
            <button
              onClick={() => router.push(`/positions/${position.position_id}/edit`)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Edit Position
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Position Details</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Position ID</dt>
                <dd className="text-sm text-gray-900">{position.position_id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Agency</dt>
                <dd className="text-sm text-gray-900">{position.agency}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Grade</dt>
                <dd className="text-sm text-gray-900">{position.jr_grade}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Incumbent</dt>
                <dd className="text-sm text-gray-900">
                  {position.incumbent ? (
                    <Link
                      href={`/officers/${position.incumbent.officer_id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {position.incumbent.name}
                    </Link>
                  ) : (
                    'Vacant'
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Succession Plan</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Immediate Successors</h4>
                <ul className="space-y-1">
                  {position.immediate_successors?.map((successor) => (
                    <li key={successor.officer_id}>
                      <Link
                        href={`/officers/${successor.officer_id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {successor.name}
                      </Link>
                    </li>
                  )) ?? <li className="text-sm text-gray-500">No immediate successors</li>}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">1-2 Year Successors</h4>
                <ul className="space-y-1">
                  {position.successors_1_2_years?.map((successor) => (
                    <li key={successor.officer_id}>
                      <Link
                        href={`/officers/${successor.officer_id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {successor.name}
                      </Link>
                    </li>
                  )) ?? <li className="text-sm text-gray-500">No 1-2 year successors</li>}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">3-5 Year Successors</h4>
                <ul className="space-y-1">
                  {position.successors_3_5_years?.map((successor) => (
                    <li key={successor.officer_id}>
                      <Link
                        href={`/officers/${successor.officer_id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {successor.name}
                      </Link>
                    </li>
                  )) ?? <li className="text-sm text-gray-500">No 3-5 year successors</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 