'use client'

import { useRouter } from 'next/navigation'
import StintForm from '../components/StintForm'
import { createStintAction } from '@/app/actions/stints'

export default function NewStintPage() {
  const router = useRouter()

  const handleSubmit = async (data: {
    stint_name: string
    stint_type: string
    year: number
  }) => {
    await createStintAction(data)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Create New Stint
          </h2>
          <StintForm onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  )
} 