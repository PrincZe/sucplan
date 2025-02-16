'use server'

import { revalidatePath } from 'next/cache'
import { createPosition, updatePosition, updateSuccessors, deletePosition } from '@/lib/queries/positions'
import type { Database } from '@/lib/types/supabase'

export async function createPositionAction(data: {
  position_id: string
  position_title: string
  agency: string
  jr_grade: string
  incumbent_id: string | null
  immediate_successors: string[]
  successors_1_2_years: string[]
  successors_3_5_years: string[]
}) {
  try {
    // Create position
    const position = await createPosition({
      position_id: data.position_id,
      position_title: data.position_title,
      agency: data.agency,
      jr_grade: data.jr_grade,
      incumbent_id: data.incumbent_id
    })

    // Add successors
    await Promise.all([
      updateSuccessors(position.position_id, 'immediate', data.immediate_successors),
      updateSuccessors(position.position_id, '1-2_years', data.successors_1_2_years),
      updateSuccessors(position.position_id, '3-5_years', data.successors_3_5_years)
    ])

    revalidatePath('/positions')
    return { success: true, data: position }
  } catch (error) {
    console.error('Error creating position:', error)
    return { success: false, error: 'Failed to create position' }
  }
}

export async function updatePositionAction(
  id: string,
  data: {
    position_title: string
    agency: string
    jr_grade: string
    incumbent_id: string | null
    immediate_successors: string[]
    successors_1_2_years: string[]
    successors_3_5_years: string[]
  }
) {
  try {
    // Update position details
    const position = await updatePosition(id, {
      position_title: data.position_title,
      agency: data.agency,
      jr_grade: data.jr_grade,
      incumbent_id: data.incumbent_id
    })

    // Update successors
    await Promise.all([
      updateSuccessors(id, 'immediate', data.immediate_successors),
      updateSuccessors(id, '1-2_years', data.successors_1_2_years),
      updateSuccessors(id, '3-5_years', data.successors_3_5_years)
    ])

    revalidatePath('/positions')
    revalidatePath(`/positions/${id}`)
    return { success: true, data: position }
  } catch (error) {
    console.error('Error updating position:', error)
    return { success: false, error: 'Failed to update position' }
  }
}

export async function deletePositionAction(id: string) {
  try {
    await deletePosition(id)
    revalidatePath('/positions')
    return { success: true }
  } catch (error) {
    console.error('Error deleting position:', error)
    return { success: false, error: 'Failed to delete position' }
  }
} 