import { useState, useEffect } from 'react'
import { supabase, getCurrentUser, signIn, signUp, signOut } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar usuário atual
    getCurrentUser().then(setUser).finally(() => setLoading(false))

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { user } = await signIn(email, password)
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const { user } = await signUp(email, password, name)
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout
  }
}