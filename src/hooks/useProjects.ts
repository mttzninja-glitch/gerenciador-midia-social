import { useState, useEffect } from 'react'
import { getProjects, createProject, updateProject, type Project } from '@/lib/supabase'

export function useProjects(userId: string | undefined) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    loadProjects()
  }, [userId])

  const loadProjects = async () => {
    if (!userId) return

    try {
      setLoading(true)
      const data = await getProjects(userId)
      setProjects(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar projetos')
      console.error('Error loading projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const addProject = async (projectData: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!userId) return

    try {
      const newProject = await createProject({
        ...projectData,
        user_id: userId
      })
      setProjects(prev => [newProject, ...prev])
      return newProject
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar projeto')
      throw err
    }
  }

  const editProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updatedProject = await updateProject(id, updates)
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ))
      return updatedProject
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar projeto')
      throw err
    }
  }

  return {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    editProject
  }
}