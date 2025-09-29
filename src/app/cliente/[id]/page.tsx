'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ChevronLeft, User, Mail, Phone, MapPin, Instagram, Facebook, 
  Globe, Lock, Eye, Edit, Save, Calendar, TrendingUp, BarChart3,
  Target, Users, MessageCircle, FileText, Star, Award, Zap
} from 'lucide-react'

// Dados mockados dos clientes (mesmos da página principal)
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
    },
    monthlyResults: {
      "2024-12": {
        followers: "12.5K",
        engagement: "4.2%",
        reach: "45.2K",
        leads: 23,
        sales: 8,
        revenue: "R$ 3.200",
        topPost: "Post sobre café especial da manhã",
        insights: "Melhor performance em posts matinais. Público engaja mais com conteúdo educativo sobre café."
      },
      "2024-11": {
        followers: "11.8K",
        engagement: "3.9%",
        reach: "38.1K",
        leads: 19,
        sales: 6,
        revenue: "R$ 2.800",
        topPost: "Reel sobre preparo do café",
        insights: "Crescimento consistente. Stories com behind the scenes tiveram boa aceitação."
      }
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
    },
    monthlyResults: {
      "2024-12": {
        followers: "8.3K",
        engagement: "6.1%",
        reach: "28.7K",
        leads: 31,
        sales: 12,
        revenue: "R$ 4.500",
        topPost: "Lookbook de inverno",
        insights: "Alto engajamento em posts de lookbook. Público responde bem a conteúdo aspiracional."
      }
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
    },
    monthlyResults: {
      "2024-12": {
        followers: "25.1K",
        engagement: "3.8%",
        reach: "89.4K",
        leads: 45,
        sales: 18,
        revenue: "R$ 12.300",
        topPost: "Tutorial sobre automação",
        insights: "Conteúdo educativo gera mais leads. Público B2B prefere posts informativos e cases de sucesso."
      }
    }
  }
]

export default function ClientePage() {
  const params = useParams()
  const router = useRouter()
  const clientId = parseInt(params.id as string)
  
  const [client, setClient] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('2024-12')
  const [monthlyData, setMonthlyData] = useState({})

  useEffect(() => {
    const foundClient = mockClients.find(c => c.id === clientId)
    if (foundClient) {
      setClient(foundClient)
      setMonthlyData(foundClient.monthlyResults?.[selectedMonth] || {})
    }
  }, [clientId, selectedMonth])

  const handleSaveMonthlyData = () => {
    // Aqui você salvaria os dados no banco de dados
    console.log('Salvando dados mensais:', monthlyData)
    alert('Dados salvos com sucesso!')
  }

  const updateMonthlyData = (field, value) => {
    setMonthlyData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cliente não encontrado</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">
            {client.logo}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-500">Detalhes e Resultados Mensais</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Cliente */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card de Informações Básicas */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações do Cliente
              </h3>
              
              <div className="space-y-4">
                {/* Contato */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Contato
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{client.info.email}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Telefone:</span>
                      <span className="font-medium">{client.info.phone}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Endereço:</span>
                      <span className="font-medium text-right">{client.info.address}</span>
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
                      <span className="font-medium">{client.info.instagram}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <Facebook className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-gray-600">Facebook:</span>
                      </div>
                      <span className="font-medium">{client.info.facebook}</span>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Observações</h4>
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <p className="text-sm text-gray-700">{client.info.notes}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Atual */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Atual</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${client.statusBg} ${client.statusColor}`}>
                    {client.status}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso Mensal</span>
                    <span>{client.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados Mensais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seletor de Mês */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Resultados Mensais
                </h3>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  <option value="2024-12">Dezembro 2024</option>
                  <option value="2024-11">Novembro 2024</option>
                  <option value="2024-10">Outubro 2024</option>
                </select>
              </div>

              {/* Métricas Principais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{monthlyData.followers || client.metrics.followers}</div>
                  <div className="text-xs text-gray-500">Seguidores</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{monthlyData.engagement || client.metrics.engagement}</div>
                  <div className="text-xs text-gray-500">Engajamento</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-2xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{monthlyData.reach || client.metrics.reach}</div>
                  <div className="text-xs text-gray-500">Alcance</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-2xl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{monthlyData.leads || 0}</div>
                  <div className="text-xs text-gray-500">Leads</div>
                </div>
              </div>

              {/* Campos Editáveis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendas Realizadas</label>
                  <input
                    type="number"
                    value={monthlyData.sales || ''}
                    onChange={(e) => updateMonthlyData('sales', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    placeholder="Ex: 15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receita Gerada</label>
                  <input
                    type="text"
                    value={monthlyData.revenue || ''}
                    onChange={(e) => updateMonthlyData('revenue', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    placeholder="Ex: R$ 5.000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post de Melhor Performance</label>
                  <input
                    type="text"
                    value={monthlyData.topPost || ''}
                    onChange={(e) => updateMonthlyData('topPost', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    placeholder="Descreva o post que teve melhor performance"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insights e Observações</label>
                  <textarea
                    value={monthlyData.insights || ''}
                    onChange={(e) => updateMonthlyData('insights', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-none"
                    placeholder="Adicione insights sobre o desempenho do mês, padrões observados, sugestões para o próximo mês..."
                  />
                </div>
              </div>

              <button
                onClick={handleSaveMonthlyData}
                className="w-full mt-6 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Resultados do Mês</span>
              </button>
            </div>

            {/* Histórico de Resultados */}
            {client.monthlyResults && Object.keys(client.monthlyResults).length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Histórico de Resultados
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(client.monthlyResults).reverse().map(([month, data]) => (
                    <div key={month} className="p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          {new Date(month + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">Leads: <strong>{data.leads}</strong></span>
                          <span className="text-gray-600">Vendas: <strong>{data.sales}</strong></span>
                          <span className="text-gray-600">Receita: <strong>{data.revenue}</strong></span>
                        </div>
                      </div>
                      {data.insights && (
                        <p className="text-sm text-gray-600">{data.insights}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}