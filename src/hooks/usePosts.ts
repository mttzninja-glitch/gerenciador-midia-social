import { useState, useEffect } from 'react'
import { getPosts, createPost, updatePost, type Post } from '@/lib/supabase'

export function usePosts(userId: string | undefined, clientId?: string, projectId?: string) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    loadPosts()
  }, [userId, clientId, projectId])

  const loadPosts = async () => {
    if (!userId) return

    try {
      setLoading(true)
      const data = await getPosts(userId, clientId, projectId)
      setPosts(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar posts')
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPost = async (postData: Omit<Post, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!userId) return

    try {
      const newPost = await createPost({
        ...postData,
        user_id: userId
      })
      setPosts(prev => [newPost, ...prev])
      return newPost
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar post')
      throw err
    }
  }

  const editPost = async (id: string, updates: Partial<Post>) => {
    try {
      const updatedPost = await updatePost(id, updates)
      setPosts(prev => prev.map(post => 
        post.id === id ? updatedPost : post
      ))
      return updatedPost
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar post')
      throw err
    }
  }

  return {
    posts,
    loading,
    error,
    loadPosts,
    addPost,
    editPost
  }
}