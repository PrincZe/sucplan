'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PositionWithRelations } from '@/lib/queries/positions'
import type { Officer } from '@/lib/types/supabase'

export interface PositionFormData {
  position_id: string
  position_title: string
  agency: string
  jr_grade: string
  sr_grade: string
  incumbent_id: string | null
  immediate_successors: string[]
  successors_1_2_years: string[]
  successors_3_5_years: string[]
}

interface PositionFormProps {
  position?: PositionWithRelations
  officers: Officer[]
  onSubmit: (data: PositionFormData, id?: string) => Promise<{ success: boolean; error?: string }>
}

export default function PositionForm({ position, officers, onSubmit }: PositionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  const [formData, setFormData] = useState({
    position_id: position?.position_id ?? '',
    position_title: position?.position_title ?? '',
    agency: position?.agency ?? '',
    jr_grade: position?.jr_grade ?? '',
    sr_grade: position?.sr_grade ?? '',
    incumbent_id: position?.incumbent_id ?? null,
    immediate_successors: position?.immediate_successors?.map(s => s.officer_id) ?? [],
    successors_1_2_years: position?.successors_1_2_years?.map(s => s.officer_id) ?? [],
    successors_3_5_years: position?.successors_3_5_years?.map(s => s.officer_id) ?? []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(undefined)

    console.log('Submitting form data:', formData)

    try {
      const result = await onSubmit(formData, position?.position_id)
      if (result.success) {
        // Force a hard refresh to ensure we get the latest data
        window.location.href = '/positions'
      } else {
        setError(result.error ?? 'An error occurred while saving the position')
      }
    } catch (error) {
      console.error('Error submitting position:', error)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="position_id" className="block text-sm font-medium text-gray-700">
            Position ID
          </label>
          <input
            type="text"
            id="position_id"
            value={formData.position_id}
            onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={!!position}
          />
        </div>

        <div>
          <label htmlFor="position_title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="position_title"
            value={formData.position_title}
            onChange={(e) => setFormData({ ...formData, position_title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="agency" className="block text-sm font-medium text-gray-700">
            Agency
          </label>
          <input
            type="text"
            id="agency"
            value={formData.agency}
            onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="jr_grade" className="block text-sm font-medium text-gray-700">
            Junior Grade
          </label>
          <input
            type="text"
            id="jr_grade"
            value={formData.jr_grade}
            onChange={(e) => setFormData({ ...formData, jr_grade: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="sr_grade" className="block text-sm font-medium text-gray-700">
            Senior Grade
          </label>
          <input
            type="text"
            id="sr_grade"
            value={formData.sr_grade}
            onChange={(e) => setFormData({ ...formData, sr_grade: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="incumbent_id" className="block text-sm font-medium text-gray-700">
            Incumbent
          </label>
          <select
            id="incumbent_id"
            value={formData.incumbent_id ?? ''}
            onChange={(e) => setFormData({ ...formData, incumbent_id: e.target.value || null })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Incumbent</option>
            {officers.map((officer) => (
              <option key={officer.officer_id} value={officer.officer_id}>
                {officer.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Immediate Successors</label>
          <select
            multiple
            value={formData.immediate_successors}
            onChange={(e) => setFormData({
              ...formData,
              immediate_successors: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {officers.map((officer) => (
              <option key={officer.officer_id} value={officer.officer_id}>
                {officer.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">Maximum 2 immediate successors</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">1-2 Year Successors</label>
          <select
            multiple
            value={formData.successors_1_2_years}
            onChange={(e) => setFormData({
              ...formData,
              successors_1_2_years: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {officers.map((officer) => (
              <option key={officer.officer_id} value={officer.officer_id}>
                {officer.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">Maximum 5 successors</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">3-5 Year Successors</label>
          <select
            multiple
            value={formData.successors_3_5_years}
            onChange={(e) => setFormData({
              ...formData,
              successors_3_5_years: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {officers.map((officer) => (
              <option key={officer.officer_id} value={officer.officer_id}>
                {officer.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">Maximum 5 successors</p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Position'}
        </button>
      </div>
    </form>
  )
} 