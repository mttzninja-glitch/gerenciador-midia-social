'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Calendar, Image, Circle, Plus, Settings, Clock, AlertCircle, 
  CheckCircle, FileText, Edit, Filter, Search, Bell, Home, User, 
  Folder, Tag, Download, Upload, Eye, Heart, MessageCircle, Share, 
  MoreHorizontal, ChevronRight, ChevronLeft, X, Check, Star, Bookmark,
  Send, Lightbulb, Bot, TrendingUp, BarChart3, PieChart, Target,
  Mic, MicOff, Play, Pause, Volume2, Phone, ChevronDown, ChevronUp,
  MapPin, Mail, Lock, Globe, Instagram, Facebook, Twitter, Crown,
  Gift, Zap, Shield, Rocket, DollarSign, UserPlus, Award, Sparkles,
  Archive, LogIn, UserCheck, HelpCircle, Info, Trash2, Save, Camera,
  CreditCard, Receipt, TrendingDown, Wallet, Building, Calculator
} from 'lucide-react'

// Dados mockados para demonstração
const mockClients = [
  {
    id: 1,
    name: "Café Aroma",
    logo: "☕",
    summary: "Cafeteria artesanal especializada em grãos especiais e experiências únicas",
    status: "Em dia",
    progress: 85,
    statusColor: "text-green-600",
    statusBg: "bg-green-50",
    metrics: { followers: "12.5K", engagement: "4.2%", reach: "45.2K" },
    monthlyData: {
      posts: 24,
      stories: 18,
      likes: 1250,
      shares: 89,
      comments: 156,
      followers: 320,
      saves: 78,
      views: 4500
    },
    info: {
      email: "contato@cafearoma.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo",
      instagram: "@cafearoma",
      facebook: "Café Aroma Oficial",
      passwords: {
        instagram: "cafe123@",
        facebook: "aroma456#",
        email: "cafearoma2024!"
      },
      notes: "Cliente desde 2023. Prefere posts no período da manhã. Evitar cores muito vibrantes."
    }
  },
  {
    id: 2,
    name: "Boutique Elegance", 
    logo: "👗",
    summary: "Moda feminina sofisticada para mulheres modernas e elegantes",
    status: "Atenção",
    progress: 70,
    statusColor: "text-amber-600",
    statusBg: "bg-amber-50",
    metrics: { followers: "8.3K", engagement: "6.1%", reach: "28.7K" },
    monthlyData: {
      posts: 20,
      stories: 25,
      likes: 980,
      shares: 45,
      comments: 89,
      followers: 180,
      saves: 92,
      views: 3200
    },
    info: {
      email: "contato@boutiqueelegance.com",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456 - São Paulo",
      instagram: "@boutiqueelegance",
      facebook: "Boutique Elegance",
      passwords: {
        instagram: "elegance789$",
        facebook: "boutique321@",
        email: "elegance2024#"
      },
      notes: "Foco no público feminino 25-45 anos. Cores neutras e elegantes. Posts sobre tendências."
    }
  },
  {
    id: 3,
    name: "Tech Solutions",
    logo: "💻", 
    summary: "Soluções tecnológicas inovadoras para empresas do futuro",
    status: "Excelente",
    progress: 95,
    statusColor: "text-green-600",
    statusBg: "bg-green-50",
    metrics: { followers: "25.1K", engagement: "3.8%", reach: "89.4K" },
    monthlyData: {
      posts: 18,
      stories: 12,
      likes: 2100,
      shares: 156,
      comments: 234,
      followers: 450,
      saves: 123,
      views: 8900
    },
    info: {
      email: "contato@techsolutions.com",
      phone: "(11) 77777-7777",
      address: "Rua da Tecnologia, 789 - São Paulo",
      instagram: "@techsolutions",
      facebook: "Tech Solutions Brasil",
      passwords: {
        instagram: "tech2024!",
        facebook: "solutions123@",
        email: "techsol456#"
      },
      notes: "Conteúdo técnico e educativo. Público B2B. Horários comerciais para posts."
    }
  }
]

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 97,
    description: 'Perfeito para começar',
    features: [
      'Até 3 clientes',
      '30 posts por mês',
      'Calendário básico',
      'Suporte por email',
      'Relatórios mensais'
    ],
    color: 'from-blue-500 to-cyan-500',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 197,
    description: 'Para agências em crescimento',
    features: [
      'Até 10 clientes',
      '100 posts por mês',
      'Calendário avançado',
      'Suporte prioritário',
      'Relatórios detalhados',
      'Área do cliente',
      'Automações básicas'
    ],
    color: 'from-purple-500 to-pink-500',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 397,
    description: 'Para grandes agências',
    features: [
      'Clientes ilimitados',
      'Posts ilimitados',
      'Calendário completo',
      'Suporte 24/7',
      'Relatórios personalizados',
      'White label',
      'Automações avançadas',
      'API personalizada',
      'Gerente dedicado'
    ],
    color: 'from-orange-500 to-red-500',
    popular: false
  }
]

const mockComments = [
  { id: 1, user: "Ana Silva", message: "Aprovado o post do café da manhã", time: "2min", avatar: "👩‍💼" },
  { id: 2, user: "Carlos", message: "Precisa ajustar a cor do logo", time: "5min", avatar: "👨‍💻" },
  { id: 3, user: "Maria", message: "Cliente aprovou a campanha!", time: "10min", avatar: "👩‍🎨" }
]

const mockIdeas = [
  { id: 1, title: "Campanha Black Friday", content: "Criar série de posts com countdown", priority: "alta" },
  { id: 2, title: "Stories interativos", content: "Enquetes sobre preferências", priority: "média" },
  { id: 3, title: "Reels tendência", content: "Aproveitar audio viral do TikTok", priority: "baixa" }
]

// Dados da equipe
const teamMembers = [
  { 
    id: 1, 
    name: "Ana Silva", 
    role: "Designer", 
    avatar: "👩‍🎨",
    email: "ana@socialninja.com",
    skills: ["Design", "Ilustração", "Branding"],
    status: "online"
  },
  { 
    id: 2, 
    name: "Carlos Santos", 
    role: "Copywriter", 
    avatar: "👨‍💻",
    email: "carlos@socialninja.com",
    skills: ["Copywriting", "SEO", "Estratégia"],
    status: "online"
  },
  { 
    id: 3, 
    name: "Maria Costa", 
    role: "Social Media", 
    avatar: "👩‍💼",
    email: "maria@socialninja.com",
    skills: ["Redes Sociais", "Análise", "Engajamento"],
    status: "offline"
  }
]

// Dicas de onboarding para novos usuários
const onboardingTips = [
  {
    id: 1,
    title: "Complete as informações dos seus clientes",
    description: "Adicione dados de contato, senhas e observações importantes",
    icon: Users,
    action: "Editar Cliente",
    completed: false
  },
  {
    id: 2,
    title: "Configure o planejamento de conteúdo",
    description: "Use o Kanban para organizar seus posts e campanhas",
    icon: Calendar,
    action: "Ir para Planejamento",
    completed: false
  },
  {
    id: 3,
    title: "Ative as métricas reais",
    description: "Conecte as contas dos clientes para dados precisos",
    icon: BarChart3,
    action: "Conectar Contas",
    completed: false
  }
]

// Dados financeiros mockados
const financialData = {
  monthlyRevenue: 15420,
  monthlyExpenses: 8750,
  profit: 6670,
  clients: [
    { name: "Café Aroma", value: 1200, status: "Pago", dueDate: "05/01/2025" },
    { name: "Boutique Elegance", value: 800, status: "Pendente", dueDate: "10/01/2025" },
    { name: "Tech Solutions", value: 1500, status: "Pago", dueDate: "15/01/2025" }
  ],
  expenses: [
    { category: "Ferramentas", value: 450, description: "Assinaturas de software" },
    { category: "Marketing", value: 1200, description: "Anúncios e promoções" },
    { category: "Operacional", value: 800, description: "Infraestrutura e suporte" }
  ]
}

export default function SocialNinja() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedClient, setSelectedClient] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [newIdea, setNewIdea] = useState('')
  const [showAITools, setShowAITools] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarView, setCalendarView] = useState('month')
  const [showClientArea, setShowClientArea] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showClientPlanning, setShowClientPlanning] = useState(false)
  const [editingField, setEditingField] = useState(null)
  const [currentPlan, setCurrentPlan] = useState('professional')
  const [showPricing, setShowPricing] = useState(false)
  const [referralCode, setReferralCode] = useState('NINJA2024')
  const [showReferrals, setShowReferrals] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' ou 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Para demonstração, começamos logado
  const [showOnboarding, setShowOnboarding] = useState(true) // Mostrar dicas para novos usuários
  const [onboardingCompleted, setOnboardingCompleted] = useState([])
  const [showAdminArea, setShowAdminArea] = useState(false)
  const [editableData, setEditableData] = useState(mockClients)
  const [isNewUser, setIsNewUser] = useState(true) // Simular novo usuário
  const [showProfile, setShowProfile] = useState(false)
  const [showFinancial, setShowFinancial] = useState(false)
  const [showTeamManagement, setShowTeamManagement] = useState(false)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [selectedReportTab, setSelectedReportTab] = useState('overview')
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao@socialninja.com",
    phone: "(11) 99999-9999",
    company: "Social Ninja Agency",
    bio: "Especialista em marketing digital com 5 anos de experiência",
    avatar: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ccb27f63-1fd3-47fd-8fdd-c5976f1d5262.png",
    socialMedia: {
      instagram: "@joaosilva",
      linkedin: "linkedin.com/in/joaosilva",
      website: "www.socialninja.com"
    }
  })

  // Estados para o Kanban com drag and drop
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "Post Café da Manhã", 
      client: "Café Aroma", 
      type: "Feed", 
      status: "Ideias", 
      date: "15/12/2024",
      audioNote: "audio_note_1.mp3",
      hasAudio: true,
      observations: "",
      responsible: "Ana Silva",
      deadline: "16/12/2024",
      socialNetwork: "Instagram",
      stage: "ideias"
    },
    { 
      id: 2, 
      title: "Story Promoção", 
      client: "Boutique Elegance", 
      type: "Story", 
      status: "Produção", 
      date: "16/12/2024",
      hasAudio: false,
      observations: "",
      responsible: "Carlos Santos",
      deadline: "17/12/2024",
      socialNetwork: "Instagram",
      stage: "producao"
    },
    { 
      id: 3, 
      title: "Reel Tendência", 
      client: "Tech Solutions", 
      type: "Reel", 
      status: "Revisão", 
      date: "17/12/2024",
      audioNote: "audio_note_2.mp3",
      hasAudio: true,
      observations: "Cliente pediu para ajustar a cor do logo",
      responsible: "Maria Costa",
      deadline: "18/12/2024",
      socialNetwork: "TikTok",
      stage: "revisao"
    },
    { 
      id: 4, 
      title: "Post Lançamento", 
      client: "Café Aroma", 
      type: "Feed", 
      status: "Aprovado", 
      date: "10/12/2024",
      hasAudio: false,
      observations: "",
      responsible: "Ana Silva",
      deadline: "11/12/2024",
      socialNetwork: "Facebook",
      stage: "aprovado"
    },
    { 
      id: 5, 
      title: "Story Natal", 
      client: "Boutique Elegance", 
      type: "Story", 
      status: "Publicado", 
      date: "12/12/2024",
      hasAudio: true,
      observations: "",
      responsible: "Carlos Santos",
      deadline: "13/12/2024",
      socialNetwork: "Instagram",
      stage: "publicado"
    }
  ])

  // Estados para tarefas
  const [tasks, setTasks] = useState([
    { id: 1, task: "Postar story Café Aroma", time: "09:00", done: true, deadline: "2024-12-15" },
    { id: 2, task: "Responder comentários Boutique", time: "10:30", done: false, deadline: "2024-12-16" },
    { id: 3, task: "Criar post Tech Solutions", time: "14:00", done: false, deadline: "2024-12-14" },
    { id: 4, task: "Reunião cliente novo", time: "16:00", done: false, deadline: "2024-12-17" }
  ])

  // Estados para edição de cards
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [draggedPost, setDraggedPost] = useState(null)

  // Função para formatar data atual - corrigida para hidratação
  useEffect(() => {
    const now = new Date()
    const options = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    }
    setCurrentDate(now.toLocaleDateString('pt-BR', options))
  }, [])

  // Função para verificar tarefas atrasadas
  const getOverdueTasks = () => {
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(task => !task.done && task.deadline < today)
  }

  // Funções para drag and drop
  const handleDragStart = (e, post) => {
    setDraggedPost(post)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetStage) => {
    e.preventDefault()
    if (draggedPost) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === draggedPost.id 
            ? { ...post, stage: targetStage, status: getStatusFromStage(targetStage) }
            : post
        )
      )
      setDraggedPost(null)
    }
  }

  const getStatusFromStage = (stage) => {
    const statusMap = {
      'ideias': 'Ideias',
      'producao': 'Produção',
      'revisao': 'Revisão',
      'aprovado': 'Aprovado',
      'publicado': 'Publicado',
      'arquivo': 'Finalizado'
    }
    return statusMap[stage] || 'Ideias'
  }

  // Função para adicionar novo card
  const addNewCard = (stage) => {
    const newPost = {
      id: Date.now(),
      title: "Novo Post",
      client: mockClients[0].name,
      type: "Feed",
      status: getStatusFromStage(stage),
      date: new Date().toLocaleDateString('pt-BR'),
      hasAudio: false,
      observations: "",
      responsible: teamMembers[0].name,
      deadline: new Date(Date.now() + 86400000).toLocaleDateString('pt-BR'),
      socialNetwork: "Instagram",
      stage: stage
    }
    setPosts(prevPosts => [...prevPosts, newPost])
    setEditingPost(newPost)
    setShowEditModal(true)
  }

  // Função para editar card
  const editCard = (post) => {
    setEditingPost(post)
    setShowEditModal(true)
  }

  // Função para salvar edições do card
  const saveCardEdit = (updatedPost) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    )
    setShowEditModal(false)
    setEditingPost(null)
  }

  // Função para adicionar novo cliente
  const addNewClient = (clientData) => {
    const newClient = {
      id: Date.now(),
      name: clientData.name,
      logo: clientData.logo || "🏢",
      summary: clientData.summary,
      status: "Novo",
      progress: 0,
      statusColor: "text-blue-600",
      statusBg: "bg-blue-50",
      metrics: { followers: "0", engagement: "0%", reach: "0" },
      monthlyData: {
        posts: 0,
        stories: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        followers: 0,
        saves: 0,
        views: 0
      },
      info: {
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        instagram: clientData.instagram,
        facebook: clientData.facebook,
        passwords: {
          instagram: "",
          facebook: "",
          email: ""
        },
        notes: clientData.notes || ""
      }
    }
    setEditableData(prev => [...prev, newClient])
    setShowNewClientModal(false)
  }

  // Função para adicionar nova tarefa
  const addNewTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      task: taskData.task,
      time: taskData.time,
      done: false,
      deadline: taskData.deadline
    }
    setTasks(prev => [...prev, newTask])
    setShowNewTaskModal(false)
  }

  // Função para arquivar cliente
  const archiveClient = (clientId) => {
    setEditableData(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: "Arquivado", statusColor: "text-gray-600", statusBg: "bg-gray-50" }
        : client
    ))
  }

  // Função para deletar cliente
  const deleteClient = (clientId) => {
    if (confirm("Tem certeza que deseja deletar este cliente? Esta ação não pode ser desfeita.")) {
      setEditableData(prev => prev.filter(client => client.id !== clientId))
    }
  }

  // Modal de cadastro de nova tarefa
  const NewTaskModal = () => {
    const [formData, setFormData] = useState({
      task: '',
      time: '',
      deadline: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      if (formData.task && formData.time && formData.deadline) {
        addNewTask(formData)
      }
    }

    if (!showNewTaskModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Nova Tarefa</h3>
            <button 
              onClick={() => setShowNewTaskModal(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição da Tarefa *</label>
              <input
                type="text"
                value={formData.task}
                onChange={(e) => setFormData({...formData, task: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                placeholder="Ex: Criar post para Instagram"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horário *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prazo *</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Adicionar Tarefa
              </button>
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-semibold hover:border-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Modal de cadastro de novo cliente
  const NewClientModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      logo: '',
      summary: '',
      email: '',
      phone: '',
      address: '',
      instagram: '',
      facebook: '',
      notes: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      if (formData.name && formData.email) {
        addNewClient(formData)
      }
    }

    if (!showNewClientModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Cadastrar Novo Cliente</h3>
            <button 
              onClick={() => setShowNewClientModal(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="Ex: Café Aroma"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emoji/Logo</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="☕ 👗 💻"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Negócio</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-none"
                  placeholder="Descreva brevemente o negócio do cliente..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="contato@empresa.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="Rua, número - Cidade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="@usuario"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                  placeholder="Nome da Página"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-none"
                  placeholder="Informações importantes sobre o cliente, preferências, horários, etc..."
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Cadastrar Cliente
              </button>
              <button
                type="button"
                onClick={() => setShowNewClientModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-semibold hover:border-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Modal de edição de card
  const EditCardModal = () => {
    if (!showEditModal || !editingPost) return null

    const [formData, setFormData] = useState(editingPost)

    const handleSubmit = (e) => {
      e.preventDefault()
      saveCardEdit(formData)
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Editar Card</h3>
            <button 
              onClick={() => setShowEditModal(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                <select
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  {editableData.map(client => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  <option value="Feed">Feed</option>
                  <option value="Story">Story</option>
                  <option value="Reel">Reel</option>
                  <option value="Carrossel">Carrossel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsável</label>
                <select
                  value={formData.responsible}
                  onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prazo</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rede Social</label>
                <select
                  value={formData.socialNetwork}
                  onChange={(e) => setFormData({...formData, socialNetwork: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Twitter">Twitter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Etapa</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({...formData, stage: e.target.value, status: getStatusFromStage(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  <option value="ideias">Ideias</option>
                  <option value="producao">Produção</option>
                  <option value="revisao">Revisão</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="publicado">Publicado</option>
                  <option value="arquivo">Arquivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Publicação</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
              <textarea
                value={formData.observations}
                onChange={(e) => setFormData({...formData, observations: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-none"
                placeholder="Adicione observações sobre este post..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasAudio"
                checked={formData.hasAudio}
                onChange={(e) => setFormData({...formData, hasAudio: e.target.checked})}
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
              />
              <label htmlFor="hasAudio" className="text-sm font-medium text-gray-700">
                Possui áudio/observação em áudio
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-semibold hover:border-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-black text-white shadow-lg scale-105' 
          : 'text-gray-500 hover:text-black hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )

  const AuthView = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ccb27f63-1fd3-47fd-8fdd-c5976f1d5262.png" 
              alt="Social Ninja Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Social Ninja</h1>
          <p className="text-gray-400">
            {authMode === 'login' ? 'Entre na sua conta' : 'Crie sua conta gratuita'}
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="space-y-6">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              onClick={() => {
                setIsLoggedIn(true)
                if (authMode === 'register') {
                  setIsNewUser(true)
                  setShowOnboarding(true)
                }
              }}
              className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {authMode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>

            {authMode === 'login' && (
              <div className="text-center">
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  Esqueceu sua senha?
                </button>
              </div>
            )}
          </div>

          {/* Divisor */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">ou</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Login Social */}
          <div className="space-y-3">
            <button 
              onClick={() => {
                // Simular login com Google - redirecionar para dashboard
                setIsLoggedIn(true)
                setIsNewUser(false)
                setShowOnboarding(false)
                setActiveTab('dashboard')
              }}
              className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar com Google</span>
            </button>
          </div>

          {/* Toggle entre Login/Cadastro */}
          <div className="text-center mt-6">
            <span className="text-gray-400 text-sm">
              {authMode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </span>
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-white font-semibold ml-2 hover:underline"
            >
              {authMode === 'login' ? 'Cadastre-se' : 'Faça login'}
            </button>
          </div>
        </div>

        {/* Features */}
        {authMode === 'register' && (
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-white/80">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-xs">Gerencie clientes</p>
            </div>
            <div className="text-white/80">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-xs">Planeje posts</p>
            </div>
            <div className="text-white/80">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-6 h-6" />
              </div>
              <p className="text-xs">Relatórios</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Componente de Onboarding
  const OnboardingTips = () => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Bem-vindo ao Social Ninja!</h3>
            <p className="text-blue-100 text-sm">Complete estes passos para começar</p>
          </div>
        </div>
        <button 
          onClick={() => setShowOnboarding(false)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {onboardingTips.map((tip) => (
          <div key={tip.id} className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <tip.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{tip.title}</h4>
                <p className="text-xs text-blue-100">{tip.description}</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-3 py-1 rounded-xl text-xs font-medium hover:bg-blue-50 transition-colors">
              {tip.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  // Gerenciamento de Equipe
  const TeamManagementView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Equipe</h1>
          <p className="text-gray-500">Organize sua equipe e distribua responsabilidades</p>
        </div>
        <button 
          onClick={() => setShowTeamManagement(false)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Membros da Equipe */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Membros da Equipe</h3>
          <button className="bg-black text-white px-4 py-2 rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Adicionar Membro</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Habilidades</p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map(skill => (
                    <span key={skill} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-black text-white py-2 px-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  Editar
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-gray-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribuição de Tarefas */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Distribuição de Tarefas</h3>
        
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm">
                  {teamMembers.find(m => m.name === post.responsible)?.avatar || '👤'}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-500">{post.client} • {post.socialNetwork}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">{post.responsible}</span>
                <span className="text-xs text-gray-500">{post.deadline}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  post.stage === 'ideias' ? 'bg-yellow-100 text-yellow-600' :
                  post.stage === 'producao' ? 'bg-blue-100 text-blue-600' :
                  post.stage === 'revisao' ? 'bg-orange-100 text-orange-600' :
                  post.stage === 'aprovado' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {post.stage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Perfil do Social Media
  const ProfileView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-gray-500">Gerencie suas informações pessoais e profissionais</p>
        </div>
        <button 
          onClick={() => setShowProfile(false)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Foto e Informações Básicas */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-4xl text-white font-bold overflow-hidden">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  profileData.name.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
            <p className="text-gray-500 mb-4">{profileData.company}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{profileData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Pessoais */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Informações Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio Profissional</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-none"
                placeholder="Conte um pouco sobre sua experiência profissional..."
              />
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Redes Sociais</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input
                    type="text"
                    value={profileData.socialMedia.instagram}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      socialMedia: {...profileData.socialMedia, instagram: e.target.value}
                    })}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    placeholder="@seuusuario"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={profileData.socialMedia.linkedin}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      socialMedia: {...profileData.socialMedia, linkedin: e.target.value}
                    })}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    placeholder="linkedin.com/in/seuusuario"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={profileData.socialMedia.website}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      socialMedia: {...profileData.socialMedia, website: e.target.value}
                    })}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    placeholder="www.seusite.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors">
              Salvar Alterações
            </button>
            <button 
              onClick={() => setShowProfile(false)}
              className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-semibold hover:border-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Área Financeira Completa
  const FinancialView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financeiro</h1>
          <p className="text-gray-500">Controle completo das suas finanças</p>
        </div>
        <button 
          onClick={() => setShowFinancial(false)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dashboard Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">R$ {financialData.monthlyRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Receita Mensal</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">-3%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">R$ {financialData.monthlyExpenses.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Despesas Mensais</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">+18%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">R$ {financialData.profit.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Lucro Líquido</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">43%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">43%</div>
          <div className="text-sm text-gray-500">Margem de Lucro</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Faturamento por Cliente */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Faturamento por Cliente</h3>
          
          <div className="space-y-4">
            {financialData.clients.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {editableData.find(c => c.name === client.name)?.logo || '🏢'}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-500">Vencimento: {client.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">R$ {client.value.toLocaleString()}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    client.status === 'Pago' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors">
            Gerar Fatura
          </button>
        </div>

        {/* Despesas por Categoria */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Despesas por Categoria</h3>
          
          <div className="space-y-4">
            {financialData.expenses.map((expense, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{expense.category}</h4>
                  <span className="text-lg font-bold text-gray-900">R$ {expense.value.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500">{expense.description}</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${(expense.value / financialData.monthlyExpenses) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 border border-gray-200 text-gray-600 py-3 rounded-2xl font-medium hover:border-gray-400 transition-colors">
            Adicionar Despesa
          </button>
        </div>
      </div>

      {/* Relatórios Financeiros */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Relatórios e Análises</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-center">
            <Receipt className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">Relatório Mensal</h4>
            <p className="text-sm text-gray-500">Resumo completo do mês</p>
          </button>
          
          <button className="p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-center">
            <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">Análise de Tendências</h4>
            <p className="text-sm text-gray-500">Gráficos e projeções</p>
          </button>
          
          <button className="p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-center">
            <Building className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">Fluxo de Caixa</h4>
            <p className="text-sm text-gray-500">Entradas e saídas</p>
          </button>
        </div>
      </div>
    </div>
  )

  // Área de Administração
  const AdminArea = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Área de Administração</h1>
          <p className="text-gray-500">Gerencie usuários, planos e configurações do sistema</p>
        </div>
        <button 
          onClick={() => setShowAdminArea(false)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dashboard Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">+12 hoje</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-500">Usuários Ativos</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">+8% MRR</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">R$ 89.4K</div>
          <div className="text-sm text-gray-500">Receita Mensal</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">73% Pro</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">892</div>
          <div className="text-sm text-gray-500">Assinantes Pagos</div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">99.9%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">Estável</div>
          <div className="text-sm text-gray-500">Uptime Sistema</div>
        </div>
      </div>

      {/* Gerenciamento de Usuários */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Usuários Recentes</h3>
        
        <div className="space-y-4">
          {[
            { name: "Ana Silva", email: "ana@email.com", plan: "Professional", status: "Ativo", joined: "Hoje" },
            { name: "Carlos Santos", email: "carlos@email.com", plan: "Starter", status: "Ativo", joined: "Ontem" },
            { name: "Maria Costa", email: "maria@email.com", plan: "Enterprise", status: "Pendente", joined: "2 dias" },
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">{user.plan}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.status === 'Ativo' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {user.status}
                </span>
                <span className="text-xs text-gray-500">{user.joined}</span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurações do Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Configurações de Segurança</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <h4 className="font-medium text-gray-900">Autenticação 2FA</h4>
                <p className="text-sm text-gray-500">Obrigatória para todos os usuários</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <h4 className="font-medium text-gray-900">Backup Automático</h4>
                <p className="text-sm text-gray-500">Dados salvos a cada 6 horas</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Limites do Sistema</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Usuários Simultâneos</span>
                <span className="text-sm text-gray-500">847/1000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84.7%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Armazenamento</span>
                <span className="text-sm text-gray-500">2.3TB/5TB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '46%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Função para salvar dados editáveis
  const saveEditableData = (clientId, field, value) => {
    setEditableData(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, [field]: value }
        : client
    ))
  }

  const PricingCard = ({ plan }) => (
    <div className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 transition-all duration-500 hover:scale-105 ${
      plan.popular ? 'border-black' : 'border-gray-200'
    }`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black text-white px-4 md:px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
            <Crown className="w-4 h-4" />
            <span>Mais Popular</span>
          </div>
        </div>
      )}
      
      <div className="text-center mb-6 md:mb-8">
        <div className={`w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          {plan.id === 'starter' && <Zap className="w-6 md:w-8 h-6 md:h-8 text-white" />}
          {plan.id === 'professional' && <Rocket className="w-6 md:w-8 h-6 md:h-8 text-white" />}
          {plan.id === 'enterprise' && <Crown className="w-6 md:w-8 h-6 md:h-8 text-white" />}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-500 mb-4 text-sm md:text-base">{plan.description}</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-3xl md:text-4xl font-bold text-gray-900">R${plan.price}</span>
          <span className="text-gray-500">/mês</span>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-gray-700 text-sm md:text-base">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        className={`w-full py-3 md:py-4 rounded-2xl font-semibold transition-all duration-300 ${
          plan.popular 
            ? 'bg-black text-white hover:bg-gray-800' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {currentPlan === plan.id ? 'Plano Atual' : 'Escolher Plano'}
      </button>
    </div>
  )

  const ReferralCard = () => (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Programa de Indicações</h3>
          <p className="text-purple-100">Ganhe 30% de comissão recorrente</p>
        </div>
        <div className="w-12 md:w-16 h-12 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
          <Gift className="w-6 md:w-8 h-6 md:h-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">R$ 2.847</div>
          <div className="text-sm text-purple-100">Ganhos este mês</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">12</div>
          <div className="text-sm text-purple-100">Indicações ativas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">30%</div>
          <div className="text-sm text-purple-100">Comissão recorrente</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
        <h4 className="font-semibold mb-3">Seu código de indicação</h4>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex-1 bg-white/20 rounded-xl px-4 py-3 font-mono text-base md:text-lg">
            {referralCode}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(`https://socialninja.com.br/ref/${referralCode}`)}
            className="bg-white text-purple-600 px-4 md:px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Copiar Link
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-white/20 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-colors">
          Ver Indicações
        </button>
        <button className="bg-white text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
          Materiais de Divulgação
        </button>
      </div>
    </div>
  )

  const ClientCard = ({ client }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
            {client.logo}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <button 
                onClick={() => {
                  window.location.href = `/cliente/${client.id}`
                }}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {client.name}
              </button>
              <span className={`text-sm px-3 py-1 rounded-full ${client.statusBg} ${client.statusColor} font-medium`}>
                {client.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">{client.summary}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button 
              onClick={(e) => {
                const options = [
                  { label: 'Arquivar Cliente', action: () => archiveClient(client.id) },
                  { label: 'Exportar Dados', action: () => console.log('Exportar dados do cliente') },
                  { label: 'Deletar Cliente', action: () => deleteClient(client.id), danger: true }
                ]
                
                const menu = document.createElement('div')
                menu.className = 'absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 min-w-48'
                
                options.forEach(option => {
                  const item = document.createElement('button')
                  item.className = `w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${option.danger ? 'text-red-600' : 'text-gray-700'}`
                  item.textContent = option.label
                  item.onclick = () => {
                    option.action()
                    menu.remove()
                  }
                  menu.appendChild(item)
                })
                
                // Remover menu ao clicar fora
                const removeMenu = (event) => {
                  if (!menu.contains(event.target)) {
                    menu.remove()
                    document.removeEventListener('click', removeMenu)
                  }
                }
                
                setTimeout(() => document.addEventListener('click', removeMenu), 0)
                
                // Adicionar menu ao DOM
                const button = e.currentTarget
                button.parentNode.appendChild(menu)
              }}
              className="text-gray-300 hover:text-gray-600 transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img 
              src={profileData.avatar} 
              alt="Social Media Owner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Métricas Editáveis */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Seguidores</p>
          {editingField === `${client.id}-followers` ? (
            <input
              type="text"
              defaultValue={client.metrics.followers}
              onBlur={(e) => {
                saveEditableData(client.id, 'metrics', { ...client.metrics, followers: e.target.value })
                setEditingField(null)
              }}
              className="w-full text-center font-semibold text-gray-900 bg-blue-50 rounded px-1"
              autoFocus
            />
          ) : (
            <p 
              onClick={() => setEditingField(`${client.id}-followers`)}
              className="font-semibold text-gray-900 cursor-pointer hover:bg-blue-50 rounded px-1"
            >
              {client.metrics.followers}
            </p>
          )}
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Engajamento</p>
          {editingField === `${client.id}-engagement` ? (
            <input
              type="text"
              defaultValue={client.metrics.engagement}
              onBlur={(e) => {
                saveEditableData(client.id, 'metrics', { ...client.metrics, engagement: e.target.value })
                setEditingField(null)
              }}
              className="w-full text-center font-semibold text-gray-900 bg-blue-50 rounded px-1"
              autoFocus
            />
          ) : (
            <p 
              onClick={() => setEditingField(`${client.id}-engagement`)}
              className="font-semibold text-gray-900 cursor-pointer hover:bg-blue-50 rounded px-1"
            >
              {client.metrics.engagement}
            </p>
          )}
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Alcance</p>
          {editingField === `${client.id}-reach` ? (
            <input
              type="text"
              defaultValue={client.metrics.reach}
              onBlur={(e) => {
                saveEditableData(client.id, 'metrics', { ...client.metrics, reach: e.target.value })
                setEditingField(null)
              }}
              className="w-full text-center font-semibold text-gray-900 bg-blue-50 rounded px-1"
              autoFocus
            />
          ) : (
            <p 
              onClick={() => setEditingField(`${client.id}-reach`)}
              className="font-semibold text-gray-900 cursor-pointer hover:bg-blue-50 rounded px-1"
            >
              {client.metrics.reach}
            </p>
          )}
        </div>
      </div>
      
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Meta Mensal</span>
          <span>{client.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-1000"
            style={{ width: `${client.progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="flex-1 bg-black text-white py-3 px-4 rounded-2xl font-medium hover:bg-gray-800 transition-all duration-300">
          Criar Post
        </button>
        <button 
          onClick={() => {
            const message = `Olá! Temos um novo conteúdo pronto para aprovação da ${client.name}. Poderia dar uma olhada e nos dar o feedback? Obrigado!`
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, '_blank')
          }}
          className="px-4 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    </div>
  )

  const ClientPlanningView = ({ client }) => (
    <div className="space-y-8">
      {/* Header do Cliente */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowClientPlanning(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
            {client.logo}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-500">Planejamento e Informações</p>
          </div>
        </div>
      </div>

      {/* Abas do Cliente */}
      <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
        {['Informações', 'Comentários', 'Planejamento'].map((tab) => (
          <button
            key={tab}
            className="flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all bg-white text-gray-900 shadow-sm"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informações do Cliente - EDITÁVEIS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Informações do Cliente
            <Edit className="w-4 h-4 ml-2 text-gray-400" />
          </h3>
          
          <div className="space-y-6">
            {/* Contato */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Contato
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Email:</span>
                  {editingField === `${client.id}-email` ? (
                    <input
                      type="email"
                      defaultValue={client.info.email}
                      onBlur={(e) => {
                        saveEditableData(client.id, 'info', { ...client.info, email: e.target.value })
                        setEditingField(null)
                      }}
                      className="font-medium bg-blue-50 rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingField(`${client.id}-email`)}
                      className="font-medium cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                    >
                      {client.info.email}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Telefone:</span>
                  {editingField === `${client.id}-phone` ? (
                    <input
                      type="tel"
                      defaultValue={client.info.phone}
                      onBlur={(e) => {
                        saveEditableData(client.id, 'info', { ...client.info, phone: e.target.value })
                        setEditingField(null)
                      }}
                      className="font-medium bg-blue-50 rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingField(`${client.id}-phone`)}
                      className="font-medium cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                    >
                      {client.info.phone}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Endereço:</span>
                  {editingField === `${client.id}-address` ? (
                    <input
                      type="text"
                      defaultValue={client.info.address}
                      onBlur={(e) => {
                        saveEditableData(client.id, 'info', { ...client.info, address: e.target.value })
                        setEditingField(null)
                      }}
                      className="font-medium bg-blue-50 rounded px-2 py-1 text-right"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingField(`${client.id}-address`)}
                      className="font-medium text-right cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                    >
                      {client.info.address}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Redes Sociais
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2 text-pink-500" />
                    <span className="text-gray-600">Instagram:</span>
                  </div>
                  {editingField === `${client.id}-instagram` ? (
                    <input
                      type="text"
                      defaultValue={client.info.instagram}
                      onBlur={(e) => {
                        saveEditableData(client.id, 'info', { ...client.info, instagram: e.target.value })
                        setEditingField(null)
                      }}
                      className="font-medium bg-blue-50 rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingField(`${client.id}-instagram`)}
                      className="font-medium cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                    >
                      {client.info.instagram}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Facebook className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-gray-600">Facebook:</span>
                  </div>
                  {editingField === `${client.id}-facebook` ? (
                    <input
                      type="text"
                      defaultValue={client.info.facebook}
                      onBlur={(e) => {
                        saveEditableData(client.id, 'info', { ...client.info, facebook: e.target.value })
                        setEditingField(null)
                      }}
                      className="font-medium bg-blue-50 rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingField(`${client.id}-facebook`)}
                      className="font-medium cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
                    >
                      {client.info.facebook}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Senhas e Acessos */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Senhas e Acessos
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(client.info.passwords).map(([platform, password]) => (
                  <div key={platform} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-gray-600 capitalize">{platform}:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-red-600">••••••••</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(password)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Observações</h4>
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                {editingField === `${client.id}-notes` ? (
                  <textarea
                    defaultValue={client.info.notes}
                    onBlur={(e) => {
                      saveEditableData(client.id, 'info', { ...client.info, notes: e.target.value })
                      setEditingField(null)
                    }}
                    className="w-full text-sm text-gray-700 bg-yellow-50 resize-none"
                    rows={3}
                    autoFocus
                  />
                ) : (
                  <p 
                    onClick={() => setEditingField(`${client.id}-notes`)}
                    className="text-sm text-gray-700 cursor-pointer hover:bg-yellow-100 rounded p-2"
                  >
                    {client.info.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comentários da Equipe */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Comentários da Equipe
            </h3>
          </div>
          
          <div className="space-y-4 mb-6">
            {mockComments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Adicionar comentário sobre este cliente..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all duration-300"
            />
            <button className="bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const CommentItem = ({ comment }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm">
        {comment.avatar}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-gray-900 text-sm">{comment.user}</span>
          <span className="text-xs text-gray-500">{comment.time}</span>
        </div>
        <p className="text-sm text-gray-700">{comment.message}</p>
        
        {/* Área para áudio */}
        <div className="mt-3 flex items-center space-x-3">
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-full transition-colors ${
              isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          {isRecording && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-500">Gravando...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const IdeaCard = ({ idea }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900">{idea.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          idea.priority === 'alta' ? 'bg-red-100 text-red-600' :
          idea.priority === 'média' ? 'bg-yellow-100 text-yellow-600' :
          'bg-gray-100 text-gray-600'
        }`}>
          {idea.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{idea.content}</p>
      <div className="flex space-x-2">
        <button className="text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors">
          Desenvolver
        </button>
        <button className="text-xs border border-gray-200 text-gray-600 px-3 py-1 rounded-full hover:border-gray-400 transition-colors">
          Arquivar
        </button>
      </div>
    </div>
  )

  // Componente de Card com drag and drop MELHORADO
  const PostCard = ({ post }) => (
    <div 
      draggable
      onDragStart={(e) => handleDragStart(e, post)}
      className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all duration-300 cursor-move"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
          <p className="text-xs text-gray-500">{post.client}</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Badge do tipo de publicação */}
          <span className={`text-xs px-2 py-1 rounded-full ${
            post.type === 'Feed' ? 'bg-blue-100 text-blue-600' :
            post.type === 'Story' ? 'bg-purple-100 text-purple-600' :
            'bg-pink-100 text-pink-600'
          }`}>
            {post.type}
          </span>
          
          {/* Ícone de áudio se tiver */}
          {post.hasAudio && (
            <button className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Volume2 className="w-3 h-3 text-gray-600" />
            </button>
          )}

          {/* Foto do perfil do social media responsável */}
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img 
              src={profileData.avatar} 
              alt="Responsável" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Informações do post */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Responsável:</span>
          <span className="font-medium text-gray-700">{post.responsible}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Prazo:</span>
          <span className="font-medium text-gray-700">{post.deadline}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Rede Social:</span>
          <span className="font-medium text-gray-700">{post.socialNetwork}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          post.status === 'Aprovado' ? 'bg-green-100 text-green-600' :
          post.status === 'Pendente Aprovação' ? 'bg-yellow-100 text-yellow-600' :
          post.status === 'Finalizado' ? 'bg-gray-100 text-gray-600' :
          post.status === 'Publicado' ? 'bg-blue-100 text-blue-600' :
          'bg-orange-100 text-orange-600'
        }`}>
          {post.status}
        </span>
        <span className="text-xs text-gray-500 whitespace-nowrap">{post.date}</span>
      </div>

      {/* Observação em áudio */}
      {post.hasAudio && (
        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Play className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-black h-1 rounded-full w-1/3"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Observação em áudio • 0:45</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-2 mt-3">
        <button 
          onClick={() => editCard(post)}
          className="flex-1 bg-black text-white py-2 px-3 rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-1"
        >
          <Edit className="w-3 h-3" />
          <span>Editar</span>
        </button>
        <button 
          onClick={() => {
            const message = `Olá! O conteúdo "${post.title}" está pronto para sua aprovação. Poderia dar uma olhada? Obrigado!`
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, '_blank')
          }}
          className="px-3 py-2 bg-green-500 text-white rounded-xl text-xs hover:bg-green-600 transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    </div>
  )

  const CalendarView = () => {
    const getDaysInMonth = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDayOfWeek = firstDay.getDay()
      
      const days = []
      
      // Dias vazios do início
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null)
      }
      
      // Dias do mês
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day)
      }
      
      return days
    }

    const days = getDaysInMonth(currentMonth)
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    // Agendamentos mockados
    const scheduledPosts = {
      15: { title: "Post Café da Manhã", client: "Café Aroma" },
      20: { title: "Story Promoção", client: "Boutique Elegance" },
      25: { title: "Reel Tendência", client: "Tech Solutions" }
    }

    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        {/* Header do Calendário */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dias da Semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Grade do Calendário */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`aspect-square flex flex-col p-2 rounded-xl transition-all duration-200 ${
                day ? 'hover:bg-gray-50 cursor-pointer' : ''
              }`}
            >
              {day && (
                <>
                  <span className="text-sm font-medium text-gray-900 mb-1">{day}</span>
                  {/* Posts agendados para este dia */}
                  {scheduledPosts[day] && (
                    <div className="space-y-1">
                      <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full truncate">
                        {scheduledPosts[day].title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {scheduledPosts[day].client}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Botão Novo Agendamento */}
        <button className="fixed bottom-28 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-10">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    )
  }

  // Área do Cliente MELHORADA com aceite e observações
  const ClientAreaView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Área do Cliente</h1>
        <p className="text-gray-500">Visualização exclusiva para aprovações e feedback</p>
      </div>

      {/* Seletor de Cliente */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {editableData.map(client => (
            <button
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedClient?.id === client.id 
                  ? 'border-black bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                  {client.logo}
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-500">Ver conteúdos</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdos para Aprovação MELHORADOS */}
      {selectedClient && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Conteúdos Pendentes - {selectedClient.name}
            </h3>
            <span className="text-sm bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
              {posts.filter(post => post.client === selectedClient.name && post.status === 'Pendente Aprovação').length} aguardando aprovação
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.filter(post => post.client === selectedClient.name).map(post => (
              <div key={post.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                {/* Preview do Conteúdo */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <span className="text-4xl">{selectedClient.logo}</span>
                  {post.status === 'Pendente Aprovação' && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.type === 'Feed' ? 'bg-blue-100 text-blue-600' :
                      post.type === 'Story' ? 'bg-purple-100 text-purple-600' :
                      'bg-pink-100 text-pink-600'
                    }`}>
                      {post.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 break-words">
                    Agendado para {post.date}
                  </p>

                  {/* Status atual */}
                  <div className="mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.status === 'Aprovado' ? 'bg-green-100 text-green-600' :
                      post.status === 'Pendente Aprovação' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                  </div>

                  {/* Área de Observações */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      placeholder="Adicione suas observações ou sugestões..."
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-none"
                      rows={3}
                      defaultValue={post.observations}
                    />
                  </div>

                  {/* Botões de Aprovação MELHORADOS */}
                  {post.status === 'Pendente Aprovação' ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          // Simular aprovação
                          setPosts(prevPosts => 
                            prevPosts.map(p => 
                              p.id === post.id ? { ...p, status: 'Aprovado' } : p
                            )
                          )
                        }}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Aprovar</span>
                      </button>
                      <button 
                        onClick={() => {
                          // Simular rejeição
                          setPosts(prevPosts => 
                            prevPosts.map(p => 
                              p.id === post.id ? { ...p, status: 'Revisão' } : p
                            )
                          )
                        }}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Revisar</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-sm text-gray-500">
                        {post.status === 'Aprovado' ? '✓ Aprovado' : '📝 Em revisão'}
                      </span>
                    </div>
                  )}

                  {/* Observações existentes */}
                  {post.observations && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs font-medium text-blue-800 mb-1">Observação anterior:</p>
                      <p className="text-xs text-blue-700">{post.observations}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const ReportSlide = ({ client }) => (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white min-h-[500px] flex flex-col justify-between">
      {/* Header estilo Apple Keynote */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          {client.logo}
        </div>
        <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
        <p className="text-gray-300">Relatório Mensal • Dezembro 2024</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{client.metrics.followers}</div>
          <div className="text-sm text-gray-300">Seguidores</div>
          <div className="text-xs text-green-400 mt-1">+12% vs mês anterior</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{client.metrics.engagement}</div>
          <div className="text-sm text-gray-300">Taxa de Engajamento</div>
          <div className="text-xs text-green-400 mt-1">+0.8% vs mês anterior</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{client.metrics.reach}</div>
          <div className="text-sm text-gray-300">Alcance Total</div>
          <div className="text-xs text-green-400 mt-1">+25% vs mês anterior</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">156</div>
          <div className="text-sm text-gray-300">Leads Gerados</div>
          <div className="text-xs text-green-400 mt-1">+34% vs mês anterior</div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-3 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Principais Conquistas
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Campanha Black Friday gerou 89 leads qualificados</li>
          <li>• Reels sobre tendências aumentaram alcance em 45%</li>
          <li>• Stories interativos tiveram 78% de participação</li>
        </ul>
      </div>
    </div>
  )

  // Componente de Dados Mensais do Cliente
  const MonthlyDataCard = ({ client }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        Dados Mensais - {client.name}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Posts */}
        <div className="text-center p-4 bg-blue-50 rounded-2xl">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.posts}</div>
          <div className="text-xs text-gray-500">Posts</div>
        </div>

        {/* Stories */}
        <div className="text-center p-4 bg-purple-50 rounded-2xl">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Circle className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.stories}</div>
          <div className="text-xs text-gray-500">Stories</div>
        </div>

        {/* Curtidas */}
        <div className="text-center p-4 bg-red-50 rounded-2xl">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.likes}</div>
          <div className="text-xs text-gray-500">Curtidas</div>
        </div>

        {/* Compartilhamentos */}
        <div className="text-center p-4 bg-green-50 rounded-2xl">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Share className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.shares}</div>
          <div className="text-xs text-gray-500">Compartilhamentos</div>
        </div>

        {/* Comentários */}
        <div className="text-center p-4 bg-yellow-50 rounded-2xl">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <MessageCircle className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.comments}</div>
          <div className="text-xs text-gray-500">Comentários</div>
        </div>

        {/* Seguidores */}
        <div className="text-center p-4 bg-indigo-50 rounded-2xl">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">+{client.monthlyData.followers}</div>
          <div className="text-xs text-gray-500">Novos Seguidores</div>
        </div>

        {/* Salvamentos */}
        <div className="text-center p-4 bg-pink-50 rounded-2xl">
          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Bookmark className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.saves}</div>
          <div className="text-xs text-gray-500">Salvamentos</div>
        </div>

        {/* Visualizações */}
        <div className="text-center p-4 bg-teal-50 rounded-2xl">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Eye className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{client.monthlyData.views}</div>
          <div className="text-xs text-gray-500">Visualizações</div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors">
          Exportar Dados
        </button>
        <button className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-medium hover:border-gray-400 transition-colors">
          Editar Dados
        </button>
      </div>
    </div>
  )

  const renderContent = () => {
    if (showProfile) {
      return <ProfileView />
    }

    if (showFinancial) {
      return <FinancialView />
    }

    if (showAdminArea) {
      return <AdminArea />
    }

    if (showTeamManagement) {
      return <TeamManagementView />
    }

    if (showPricing) {
      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Plano</h1>
              <p className="text-gray-500">Escale sua agência com o Social Ninja</p>
            </div>
            <button 
              onClick={() => setShowPricing(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          <ReferralCard />
        </div>
      )
    }

    if (showClientPlanning && selectedClient) {
      return <ClientPlanningView client={selectedClient} />
    }

    if (showClientArea) {
      return <ClientAreaView />
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Onboarding para novos usuários */}
            {isNewUser && showOnboarding && <OnboardingTips />}

            {/* Header Principal */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Ninja</h1>
              <p className="text-gray-500">Sua plataforma completa para gerenciamento de redes sociais</p>
            </div>

            {/* Dashboard de Informações Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Total de Clientes */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">+2 este mês</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{editableData.length}</div>
                <div className="text-sm text-gray-500">Clientes Ativos</div>
              </div>

              {/* Tarefas Concluídas */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">94% meta</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">47/50</div>
                <div className="text-sm text-gray-500">Tarefas Concluídas</div>
              </div>

              {/* Posts Mensais */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">73/100</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">73</div>
                <div className="text-sm text-gray-500">Posts Este Mês</div>
              </div>

              {/* Engajamento Médio */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">+1.2%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">4.7%</div>
                <div className="text-sm text-gray-500">Engajamento Médio</div>
              </div>
            </div>

            {/* Separador Visual */}
            <div className="border-t border-gray-200 my-12"></div>

            {/* Seção de Clientes */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Seus Clientes</h2>
                  <p className="text-gray-500">Gerencie todos os seus clientes em um só lugar</p>
                </div>
                <button 
                  onClick={() => setShowNewClientModal(true)}
                  className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Novo Cliente</span>
                </button>
              </div>

              {/* Client Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editableData.map(client => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </div>

            {/* Seção de Colaboração */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              {/* Campo de Ideias Pessoal */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Minhas Ideias</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowAITools(!showAITools)}
                      className={`p-2 rounded-xl transition-colors ${showAITools ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Bot className="w-4 h-4" />
                    </button>
                    <Lightbulb className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Ferramentas de IA */}
                {showAITools && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Ferramentas de IA</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="text-xs bg-white text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
                        Gerar Ideias
                      </button>
                      <button className="text-xs bg-white text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
                        Melhorar Texto
                      </button>
                      <button className="text-xs bg-white text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
                        Hashtags
                      </button>
                      <button className="text-xs bg-white text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
                        Tendências
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  {mockIdeas.map(idea => (
                    <IdeaCard key={idea.id} idea={idea} />
                  ))}
                </div>

                <textarea
                  placeholder="Nova ideia ou anotação..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all duration-300 resize-none"
                />
                <button className="w-full mt-3 bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors">
                  Salvar Ideia
                </button>
              </div>

              {/* Comentários da Equipe */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Comentários da Equipe</h3>
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4 mb-6">
                  {mockComments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>

                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Adicionar comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all duration-300"
                  />
                  <button className="bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'tasks':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tarefas</h1>
                <p className="text-gray-500">Sua agenda diária</p>
              </div>
              <button 
                onClick={() => setShowNewTaskModal(true)}
                className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Nova Tarefa</span>
              </button>
            </div>

            {/* Notificação de tarefas atrasadas */}
            {getOverdueTasks().length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="font-medium text-red-800">Tarefas Atrasadas</h3>
                    <p className="text-sm text-red-600">
                      Você tem {getOverdueTasks().length} tarefa(s) atrasada(s)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de tarefas minimalista */}
            <div className="space-y-4">
              {tasks.map((item, index) => {
                const isOverdue = !item.done && item.deadline < new Date().toISOString().split('T')[0]
                
                return (
                  <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 ${item.done ? 'opacity-60' : ''} ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
                    <button
                      onClick={() => {
                        setTasks(prev => prev.map(task => 
                          task.id === item.id ? { ...task, done: !task.done } : task
                        ))
                      }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${item.done ? 'bg-black border-black' : 'border-gray-300'}`}
                    >
                      {item.done && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <h4 className={`font-medium ${item.done ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {item.task}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{item.time}</span>
                        <span>Prazo: {new Date(item.deadline).toLocaleDateString('pt-BR')}</span>
                        {isOverdue && (
                          <span className="text-red-600 font-medium">ATRASADA</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'subscription':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
              <p className="text-gray-500">Gerencie seu perfil, equipe e configurações</p>
            </div>

            {/* Header de Assinatura - MELHORADO PARA MOBILE */}
            <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-6 md:p-8 text-white mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">Plano Atual</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Professional</h2>
                  <p className="text-gray-300 text-sm md:text-base">Renovação em 15 dias • R$ 197/mês</p>
                </div>
                
                <div className="text-left md:text-right">
                  <div className="text-xl md:text-2xl font-bold mb-1">7/10</div>
                  <div className="text-sm text-gray-300 mb-3">Clientes utilizados</div>
                  <button 
                    onClick={() => setShowPricing(true)}
                    className="bg-white text-black px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-lg md:text-xl font-bold">73/100</div>
                  <div className="text-xs text-gray-300">Posts este mês</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-lg md:text-xl font-bold">∞</div>
                  <div className="text-xs text-gray-300">Relatórios</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-lg md:text-xl font-bold">✓</div>
                  <div className="text-xs text-gray-300">Área do cliente</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-lg md:text-xl font-bold">24/7</div>
                  <div className="text-xs text-gray-300">Suporte</div>
                </div>
              </div>
            </div>

            {/* Botões de Ação Rápida */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setShowProfile(true)}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Meu Perfil</h4>
                    <p className="text-sm text-gray-500">Editar informações</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setShowFinancial(true)}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Financeiro</h4>
                    <p className="text-sm text-gray-500">Controle de receitas</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setShowTeamManagement(true)}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Equipe</h4>
                    <p className="text-sm text-gray-500">Gerenciar membros</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Detalhes da Assinatura */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Detalhes do Plano</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Plano Professional</h4>
                      <p className="text-sm text-gray-500">Renovação automática</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg md:text-xl font-bold text-gray-900">R$ 197</div>
                      <div className="text-sm text-gray-500">/mês</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Próxima cobrança</span>
                      <span className="font-medium">30/12/2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Método de pagamento</span>
                      <span className="font-medium">•••• 4532</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="text-green-600 font-medium">Ativo</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                    <button 
                      onClick={() => setShowPricing(true)}
                      className="flex-1 bg-black text-white py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Alterar Plano
                    </button>
                    <button className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-medium hover:border-gray-400 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>

              {/* Programa de Indicações Compacto */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 md:p-8 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Indicações</h3>
                    <p className="text-purple-100">30% de comissão recorrente</p>
                  </div>
                  <Gift className="w-10 md:w-12 h-10 md:h-12 text-white/80" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold mb-1">R$ 2.847</div>
                    <div className="text-xs text-purple-100">Este mês</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold mb-1">12</div>
                    <div className="text-xs text-purple-100">Indicações ativas</div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 mb-4">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-3">
                    <div className="flex-1 bg-white/20 rounded-xl px-3 py-2 font-mono text-sm">
                      {referralCode}
                    </div>
                    <button 
                      onClick={() => navigator.clipboard.writeText(`https://socialninja.com.br/ref/${referralCode}`)}
                      className="bg-white text-purple-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setShowReferrals(true)}
                  className="w-full bg-white/20 text-white py-3 rounded-2xl font-semibold hover:bg-white/30 transition-colors"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        )

      case 'reports':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
              <p className="text-gray-500">Apresentações estilo Apple Keynote</p>
            </div>

            {/* Abas de Relatório */}
            <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1 max-w-md mx-auto">
              <button
                onClick={() => setSelectedReportTab('overview')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                  selectedReportTab === 'overview' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setSelectedReportTab('monthly')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                  selectedReportTab === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dados Mensais
              </button>
            </div>

            {selectedReportTab === 'overview' ? (
              <>
                {/* KPIs Gerais - MOVIDO PARA CIMA */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Visão Geral - Todos os Clientes</h3>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">+28%</div>
                      <div className="text-sm text-gray-500">Crescimento Médio</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">5.2%</div>
                      <div className="text-sm text-gray-500">Engajamento Médio</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <PieChart className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">892</div>
                      <div className="text-sm text-gray-500">Total de Leads</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Target className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">94%</div>
                      <div className="text-sm text-gray-500">Metas Atingidas</div>
                    </div>
                  </div>
                </div>

                {/* Slides de Relatório */}
                <div className="space-y-8">
                  {editableData.map(client => (
                    <ReportSlide key={client.id} client={client} />
                  ))}
                </div>
              </>
            ) : (
              /* Aba de Dados Mensais */
              <div className="space-y-8">
                {editableData.map(client => (
                  <MonthlyDataCard key={client.id} client={client} />
                ))}
              </div>
            )}
          </div>
        )

      case 'planning':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Planejamento</h1>
                <p className="text-gray-500">Organize seu conteúdo de forma visual com sua equipe</p>
              </div>
              
              {/* Toggle de Visualização */}
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button 
                  onClick={() => setCalendarView('kanban')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    calendarView === 'kanban' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Kanban
                </button>
                <button 
                  onClick={() => setCalendarView('month')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    calendarView === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Calendário
                </button>
              </div>
            </div>

            {calendarView === 'month' ? (
              <CalendarView />
            ) : (
              /* Kanban Board MELHORADO com drag and drop */
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                {['ideias', 'producao', 'revisao', 'aprovado', 'publicado', 'arquivo'].map((stage, index) => {
                  const stageNames = {
                    'ideias': 'Ideias',
                    'producao': 'Produção', 
                    'revisao': 'Revisão',
                    'aprovado': 'Aprovado',
                    'publicado': 'Publicado',
                    'arquivo': 'Arquivo'
                  }
                  
                  return (
                    <div 
                      key={stage} 
                      className={`rounded-3xl p-6 ${stage === 'arquivo' ? 'bg-gray-100' : 'bg-gray-50'}`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage)}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-900 text-center">
                          {stageNames[stage]}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {stage === 'arquivo' && (
                            <Archive className="w-4 h-4 text-gray-500" />
                          )}
                          <button 
                            onClick={() => addNewCard(stage)}
                            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {posts.filter(post => post.stage === stage).map(post => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Modal de Edição */}
            <EditCardModal />
          </div>
        )

      case 'creatives':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Biblioteca</h1>
              <p className="text-gray-500">Seus criativos organizados</p>
            </div>

            {/* Grid de criativos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                <div key={item} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">
                    🎨
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Creative {item}</h4>
                    <button className="w-full bg-black text-white py-2 rounded-2xl font-medium hover:bg-gray-800 transition-colors">
                      Usar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Página não encontrada</div>
    }
  }

  // Se não estiver logado, mostrar tela de autenticação
  if (!isLoggedIn) {
    return <AuthView />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar iOS Style - CORRIGIDO PARA MOBILE */}
      <div className="bg-white px-4 sm:px-6 py-3 flex items-center justify-between text-sm font-medium border-b border-gray-100">
        <div className="flex items-center space-x-1 min-w-0 flex-1">
          <span className="font-semibold">9:41</span>
          <span className="text-gray-500 ml-2 truncate text-xs sm:text-sm">{currentDate || 'Carregando...'}</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors whitespace-nowrap"
          >
            Sair
          </button>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <div className="w-6 h-3 border border-gray-900 rounded-sm">
              <div className="w-4 h-1 bg-gray-900 rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Tab Bar - iOS Style */}
      {!showClientArea && !showClientPlanning && !showPricing && !showAdminArea && !showProfile && !showFinancial && !showTeamManagement && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <TabButton
              id="dashboard"
              icon={Home}
              label="Início"
              isActive={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <TabButton
              id="tasks"
              icon={CheckCircle}
              label="Tarefas"
              isActive={activeTab === 'tasks'}
              onClick={() => setActiveTab('tasks')}
            />
            <TabButton
              id="subscription"
              icon={Settings}
              label="Configurações"
              isActive={activeTab === 'subscription'}
              onClick={() => setActiveTab('subscription')}
            />
            <TabButton
              id="planning"
              icon={Calendar}
              label="Planejar"
              isActive={activeTab === 'planning'}
              onClick={() => setActiveTab('planning')}
            />
            <TabButton
              id="reports"
              icon={BarChart3}
              label="Relatórios"
              isActive={activeTab === 'reports'}
              onClick={() => setActiveTab('reports')}
            />
          </div>
        </div>
      )}

      {/* Modais */}
      <NewClientModal />
      <NewTaskModal />
    </div>
  )
}