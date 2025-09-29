import { useState, useEffect } from 'react'
import { getClients, createClientRecord, updateClient, type Client } from '@/lib/supabase'

export function useClients(userId: string | undefined) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    loadClients()
  }, [userId])

  const loadClients = async () => {
    if (!userId) return

    try {
      setLoading(true)
      const data = await getClients(userId)
      setClients(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar clientes')
      console.error('Error loading clients:', err)
    } finally {
      setLoading(false)
    }
  }

  const addClient = async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!userId) return

    try {
      const newClient = await createClientRecord({
        ...clientData,
        user_id: userId
      })
      setClients(prev => [newClient, ...prev])
      return newClient
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar cliente')
      throw err
    }
  }

  const editClient = async (id: string, updates: Partial<Client>) => {
    try {
      const updatedClient = await updateClient(id, updates)
      setClients(prev => prev.map(client => 
        client.id === id ? updatedClient : client
      ))
      return updatedClient
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar cliente')
      throw err
    }
  }

  return {
    clients,
    loading,
    error,
    loadClients,
    addClient,
    editClient
  }
}