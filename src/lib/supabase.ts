import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface User {
  id: string
  email: string
  name: string
  company?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  logo: string
  summary: string
  status: string
  progress: number
  metrics: {
    followers: string
    engagement: string
    reach: string
  }
  info: {
    email: string
    phone: string
    address: string
    instagram: string
    facebook: string
    passwords: {
      instagram: string
      facebook: string
      email: string
    }
    notes: string
  }
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  client_id: string
  name: string
  description: string
  company: string
  status: 'active' | 'completed' | 'paused'
  settings: {
    theme: string
    colors: {
      primary: string
      secondary: string
    }
    features: string[]
  }
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  client_id: string
  project_id?: string
  title: string
  type: string
  status: string
  stage: string
  date: string
  deadline: string
  social_network: string
  responsible: string
  has_audio: boolean
  observations: string
  created_at: string
  updated_at: string
}

export interface Idea {
  id: string
  user_id: string
  client_id?: string
  project_id?: string
  title: string
  content: string
  priority: 'alta' | 'média' | 'baixa'
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  user_id: string
  post_id?: string
  client_id?: string
  project_id?: string
  message: string
  audio_url?: string
  created_at: string
  updated_at: string
}

// Funções de autenticação
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  })
  
  if (error) throw error
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Funções para clientes
export const createClientRecord = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('clients')
    .insert([clientData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getClients = async (userId: string) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateClient = async (id: string, updates: Partial<Client>) => {
  const { data, error } = await supabase
    .from('clients')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Funções para projetos
export const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      clients (
        id,
        name,
        logo
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateProject = async (id: string, updates: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Funções para posts
export const createPost = async (postData: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getPosts = async (userId: string, clientId?: string, projectId?: string) => {
  let query = supabase
    .from('posts')
    .select(`
      *,
      clients (
        id,
        name,
        logo
      )
    `)
    .eq('user_id', userId)
  
  if (clientId) {
    query = query.eq('client_id', clientId)
  }
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updatePost = async (id: string, updates: Partial<Post>) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Funções para ideias
export const createIdea = async (ideaData: Omit<Idea, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('ideas')
    .insert([ideaData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getIdeas = async (userId: string, clientId?: string, projectId?: string) => {
  let query = supabase
    .from('ideas')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
  
  if (clientId) {
    query = query.eq('client_id', clientId)
  }
  
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Funções para comentários
export const createComment = async (commentData: Omit<Comment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([commentData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getComments = async (postId?: string, clientId?: string, projectId?: string) => {
  let query = supabase
    .from('comments')
    .select(`
      *,
      users (
        id,
        name,
        avatar_url
      )
    `)
  
  if (postId) {
    query = query.eq('post_id', postId)
  } else if (clientId) {
    query = query.eq('client_id', clientId)
  } else if (projectId) {
    query = query.eq('project_id', projectId)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Função para inicializar o banco de dados
export const initializeDatabase = async () => {
  // Esta função será chamada para criar as tabelas necessárias
  // As tabelas serão criadas via SQL no Supabase Dashboard
  console.log('Database initialization should be done via Supabase Dashboard')
}