'use client'

import { useRouter } from 'next/navigation'
import DataTable from '@/app/components/ui/DataTable'
import type { PositionWithRelations } from '@/lib/queries/positions'

interface PositionListProps {
  positions: PositionWithRelations[]
}

export default function PositionList({ positions }: PositionListProps) {
  const router = useRouter()

  const columns = [
    {
      header: 'Position ID',
      accessorKey: 'position_id' as const
    },
    {
      header: 'Title',
      accessorKey: 'position_title' as const
    },
    {
      header: 'Agency',
      accessorKey: 'agency' as const
    },
    {
      header: 'Grade',
      accessorKey: 'jr_grade' as const
    },
    {
      header: 'Incumbent',
      accessorKey: 'incumbent_id' as const,
      cell: (row: PositionWithRelations) => row.incumbent?.name ?? 'Vacant'
    },
    {
      header: 'Immediate Successors',
      accessorKey: 'immediate_successors' as const,
      cell: (row: PositionWithRelations) => 
        row.immediate_successors?.map(s => s.name).join(', ') ?? 'None'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Positions</h2>
          <button
            onClick={() => router.push('/positions/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add Position
          </button>
        </div>
        <DataTable
          data={positions}
          columns={columns}
          onRowClick={(row) => router.push(`/positions/${row.position_id}`)}
        />
      </div>
    </div>
  )
} 