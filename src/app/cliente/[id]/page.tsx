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

export default function ClientePage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [editingField, setEditingField] = useState(null)
  const [monthlyResults, setMonthlyResults] = useState({
    posts: 0,
    stories: 0,
    likes: 0,
    shares: 0,
    comments: 0,
    followers: 0,
    saves: 0,
    views: 0
  })

  useEffect(() => {
    // Buscar cliente pelo ID
    const foundClient = mockClients.find(c => c.id === parseInt(params.id))
    if (foundClient) {
      setClient(foundClient)
      setMonthlyResults(foundClient.monthlyData)
    }
  }, [params.id])

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cliente não encontrado</h1>
          <button 
            onClick={() => window.history.back()}
            className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  const saveMonthlyResults = () => {
    // Aqui você salvaria os dados no banco de dados
    console.log('Salvando resultados mensais:', monthlyResults)
    alert('Resultados mensais salvos com sucesso!')
  }

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all ${
        isActive 
          ? 'bg-black text-white shadow-lg' 
          : 'text-gray-600 hover:text-black hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">
              {client.logo}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{client.name}</h1>
              <p className="text-sm text-gray-500">Página do Cliente</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-black text-white px-4 py-2 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex space-x-2 bg-gray-100 rounded-2xl p-1 max-w-md">
          <TabButton
            id="info"
            label="Informações"
            isActive={activeTab === 'info'}
            onClick={() => setActiveTab('info')}
          />
          <TabButton
            id="results"
            label="Resultados Mensais"
            isActive={activeTab === 'results'}
            onClick={() => setActiveTab('results')}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {activeTab === 'info' ? (
          /* Aba de Informações */
          <div className="space-y-8">
            {/* Métricas Atuais */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Métricas Atuais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{client.metrics.followers}</div>
                  <div className="text-sm text-gray-500">Seguidores</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{client.metrics.engagement}</div>
                  <div className="text-sm text-gray-500">Engajamento</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{client.metrics.reach}</div>
                  <div className="text-sm text-gray-500">Alcance</div>
                </div>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Informações de Contato</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900">{client.info.email}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-600">Telefone:</span>
                  <span className="font-medium text-gray-900">{client.info.phone}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-600">Endereço:</span>
                  <span className="font-medium text-gray-900">{client.info.address}</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Redes Sociais</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-600">Instagram:</span>
                  </div>
                  <span className="font-medium text-gray-900">{client.info.instagram}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Facebook className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Facebook:</span>
                  </div>
                  <span className="font-medium text-gray-900">{client.info.facebook}</span>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Observações</h3>
              <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <p className="text-gray-700">{client.info.notes}</p>
              </div>
            </div>
          </div>
        ) : (
          /* Aba de Resultados Mensais */
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Resultados Mensais - Dezembro 2024</h3>
                <button 
                  onClick={saveMonthlyResults}
                  className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Resultados</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Posts */}
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Posts</label>
                  <input
                    type="number"
                    value={monthlyResults.posts}
                    onChange={(e) => setMonthlyResults({...monthlyResults, posts: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-2"
                  />
                </div>

                {/* Stories */}
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Circle className="w-4 h-4 text-purple-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Stories</label>
                  <input
                    type="number"
                    value={monthlyResults.stories}
                    onChange={(e) => setMonthlyResults({...monthlyResults, stories: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl p-2"
                  />
                </div>

                {/* Curtidas */}
                <div className="text-center p-6 bg-red-50 rounded-2xl">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Curtidas</label>
                  <input
                    type="number"
                    value={monthlyResults.likes}
                    onChange={(e) => setMonthlyResults({...monthlyResults, likes: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl p-2"
                  />
                </div>

                {/* Compartilhamentos */}
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share className="w-4 h-4 text-green-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Compartilhamentos</label>
                  <input
                    type="number"
                    value={monthlyResults.shares}
                    onChange={(e) => setMonthlyResults({...monthlyResults, shares: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl p-2"
                  />
                </div>

                {/* Comentários */}
                <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Comentários</label>
                  <input
                    type="number"
                    value={monthlyResults.comments}
                    onChange={(e) => setMonthlyResults({...monthlyResults, comments: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-xl p-2"
                  />
                </div>

                {/* Novos Seguidores */}
                <div className="text-center p-6 bg-indigo-50 rounded-2xl">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Novos Seguidores</label>
                  <input
                    type="number"
                    value={monthlyResults.followers}
                    onChange={(e) => setMonthlyResults({...monthlyResults, followers: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-2"
                  />
                </div>

                {/* Salvamentos */}
                <div className="text-center p-6 bg-pink-50 rounded-2xl">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bookmark className="w-4 h-4 text-pink-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Salvamentos</label>
                  <input
                    type="number"
                    value={monthlyResults.saves}
                    onChange={(e) => setMonthlyResults({...monthlyResults, saves: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-xl p-2"
                  />
                </div>

                {/* Visualizações */}
                <div className="text-center p-6 bg-teal-50 rounded-2xl">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-4 h-4 text-teal-600" />
                  </div>
                  <label className="block text-xs text-gray-500 mb-2">Visualizações</label>
                  <input
                    type="number"
                    value={monthlyResults.views}
                    onChange={(e) => setMonthlyResults({...monthlyResults, views: parseInt(e.target.value) || 0})}
                    className="w-full text-center text-2xl font-bold bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <h4 className="font-medium text-gray-900 mb-3">Instruções para o Social Media</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Preencha os campos acima com os resultados obtidos durante o mês. Estes dados serão utilizados 
                  para gerar o relatório mensal do cliente e acompanhar o progresso das campanhas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <strong>Posts:</strong> Número total de publicações no feed
                  </div>
                  <div>
                    <strong>Stories:</strong> Quantidade de stories publicados
                  </div>
                  <div>
                    <strong>Curtidas:</strong> Total de curtidas recebidas
                  </div>
                  <div>
                    <strong>Compartilhamentos:</strong> Vezes que o conteúdo foi compartilhado
                  </div>
                  <div>
                    <strong>Comentários:</strong> Total de comentários recebidos
                  </div>
                  <div>
                    <strong>Novos Seguidores:</strong> Crescimento de seguidores no período
                  </div>
                  <div>
                    <strong>Salvamentos:</strong> Quantas vezes o conteúdo foi salvo
                  </div>
                  <div>
                    <strong>Visualizações:</strong> Total de visualizações (stories + reels)
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico de Resultados */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Histórico de Resultados</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Novembro 2024</h4>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Concluído</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>Posts: 22</div>
                    <div>Stories: 15</div>
                    <div>Curtidas: 1.1K</div>
                    <div>Seguidores: +280</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Outubro 2024</h4>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Concluído</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>Posts: 20</div>
                    <div>Stories: 18</div>
                    <div>Curtidas: 980</div>
                    <div>Seguidores: +195</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}