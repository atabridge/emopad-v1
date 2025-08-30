import React from 'react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Briefcase, 
  TrendingUp, 
  Package, 
  DollarSign,
  Users,
  Factory,
  Battery,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BusinessFlowDiagram from '../BusinessFlowDiagram';

const DashboardTab = () => {
  const { state } = useBusinessPlan();

  // Prepare chart data
  const financialData = [
    {
      name: 'Ertuğ',
      '2026': state.financials.ertug.pnl[2026].ebitda / 1000000,
      '2027': state.financials.ertug.pnl[2027].ebitda / 1000000,
      '2028': state.financials.ertug.pnl[2028].ebitda / 1000000,
    },
    {
      name: 'Fiyuu Sales',
      '2026': state.financials.fiyuuSales.pnl[2026].ebitda / 1000000,
      '2027': state.financials.fiyuuSales.pnl[2027].ebitda / 1000000,
      '2028': state.financials.fiyuuSales.pnl[2028].ebitda / 1000000,
    },
    {
      name: 'Fiyuu Swap',
      '2026': state.financials.fiyuuSwap.pnl[2026].ebitda / 1000000,
      '2027': state.financials.fiyuuSwap.pnl[2027].ebitda / 1000000,
      '2028': state.financials.fiyuuSwap.pnl[2028].ebitda / 1000000,
    }
  ];

  const investmentData = [
    { 
      name: 'Ertuğ', 
      value: state.financials.ertug.investments.reduce((sum, inv) => sum + inv.amount, 0) / 1000000,
      color: '#ea580c'
    },
    { 
      name: 'Fiyuu Sales', 
      value: state.financials.fiyuuSales.investments.reduce((sum, inv) => sum + inv.amount, 0) / 1000000,
      color: '#fb923c'
    },
    { 
      name: 'Fiyuu Swap', 
      value: state.financials.fiyuuSwap.investments.reduce((sum, inv) => sum + inv.amount, 0) / 1000000,
      color: '#fdba74'
    }
  ];

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}B TL`;
    } else if (Math.abs(value) >= 1) {
      return `${value.toFixed(1)}M TL`;
    }
    return `${(value * 1000).toFixed(0)}K TL`;
  };

  return (
    <div className="space-y-8">
      {/* Yönetici Özeti */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Yönetici Özeti</h2>
          <p className="text-gray-600">E-Moped Üretimi & Batarya Swap İstasyonları Projesi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Aktörler Kartı */}
          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktörler</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">{state.actors.length}</div>
              <div className="space-y-1 mt-2">
                {state.actors.map((actor) => (
                  <Badge key={actor.id} variant="outline" className="text-xs">
                    {actor.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tedarikçiler Kartı */}
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tedarikçiler</CardTitle>
              <Factory className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{state.suppliers.length}</div>
              <p className="text-xs text-gray-600">Aktif tedarikçi sayısı</p>
            </CardContent>
          </Card>

          {/* Ürün Kategorileri */}
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ürün Kategorileri</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">4</div>
              <p className="text-xs text-gray-600">Ekipman, E-Moped, Batarya, Kabinet</p>
            </CardContent>
          </Card>

          {/* Toplam Yatırım */}
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Yatırım</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {((investmentData.reduce((sum, item) => sum + item.value, 0) * 1000000) / 1000000).toFixed(0)}M USD
              </div>
              <p className="text-xs text-gray-600">Tüm aktörlerin toplam yatırımı</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* İş Planı Diyagramı */}
      <section>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl">İş Süreci Akışı</CardTitle>
                <CardDescription>Aktörler arası iş akışı ve ilişkiler</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BusinessFlowDiagram />
          </CardContent>
        </Card>
      </section>

      {/* Ürün Portföyü Özeti */}
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün Portföyü</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Üretim Ekipmanları */}
          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Factory className="h-4 w-4 mr-2 text-orange-600" />
                Üretim Ekipmanları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.products.equipments.map((equipment, index) => (
                <div key={equipment.id} className="text-xs">
                  <div className="font-medium">{equipment.name}</div>
                  <div className="text-gray-600">{equipment.supplier}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* E-Moped */}
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Zap className="h-4 w-4 mr-2 text-blue-600" />
                E-Moped
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.products.emopeds.map((emoped) => (
                <div key={emoped.id} className="text-xs">
                  <div className="font-medium">{emoped.name}</div>
                  <div className="text-gray-600">{emoped.supplier}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Batarya */}
          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Battery className="h-4 w-4 mr-2 text-green-600" />
                Batarya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.products.batteries.map((battery) => (
                <div key={battery.id} className="text-xs">
                  <div className="font-medium">{battery.name}</div>
                  <div className="text-gray-600">{battery.supplier}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Kabinet */}
          <Card className="border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="h-4 w-4 mr-2 text-purple-600" />
                Kabinet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.products.cabinets.map((cabinet) => (
                <div key={cabinet.id} className="text-xs">
                  <div className="font-medium">{cabinet.name}</div>
                  <div className="text-gray-600">{cabinet.supplier}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Finansal Plan Özeti */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EBITDA Trendi */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg">EBITDA Projeksiyonu</CardTitle>
                <CardDescription>3 Yıllık Karlılık Trendi (Milyon TL)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'EBITDA']} />
                <Bar dataKey="2026" fill="#fb923c" name="2026" />
                <Bar dataKey="2027" fill="#ea580c" name="2027" />
                <Bar dataKey="2028" fill="#c2410c" name="2028" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Yatırım Dağılımı */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Yatırım Dağılımı</CardTitle>
                <CardDescription>Aktörlere Göre Yatırım Miktarları (Milyon USD)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={investmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(0)}M`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {investmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toFixed(1)}M USD`, 'Yatırım']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DashboardTab;