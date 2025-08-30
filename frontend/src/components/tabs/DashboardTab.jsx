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
  Zap,
  Calculator
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import EnhancedBusinessFlowDiagram from '../EnhancedBusinessFlowDiagram';

// Gümrük hesaplama tablosu bileşeni
const CustomsCalculationTable = ({ product, category }) => {
  if (!product?.customsData) return null;

  const { customsData } = product;

  return (
    <Card className="mt-3 border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs flex items-center">
          <Calculator className="h-3 w-3 mr-1" />
          Gümrük Hesaplaması
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-1 text-left text-xs">Brand</th>
                <th className="border border-gray-300 p-1 text-left text-xs">HS Code</th>
                <th className="border border-gray-300 p-1 text-right text-xs">FOB USD</th>
                <th className="border border-gray-300 p-1 text-right text-xs">Qty</th>
                <th className="border border-gray-300 p-1 text-right text-xs">CIF USD</th>
                <th className="border border-gray-300 p-1 text-right text-xs">Final TL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 text-xs">{customsData.brand}</td>
                <td className="border border-gray-300 p-1 text-xs">{customsData.hsCode}</td>
                <td className="border border-gray-300 p-1 text-right text-xs">{customsData.fobUsd?.toLocaleString()}</td>
                <td className="border border-gray-300 p-1 text-right text-xs">{customsData.qty?.toLocaleString()}</td>
                <td className="border border-gray-300 p-1 text-right text-xs">{customsData.cifUsd?.toLocaleString()}</td>
                <td className="border border-gray-300 p-1 text-right text-xs font-bold bg-green-50">
                  {customsData.finalTl?.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Önemli veriler */}
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
          <div className="p-1 bg-blue-50 rounded text-center">
            <div className="font-semibold text-blue-800">GV</div>
            <div className="text-blue-600">
              {category === 'A' ? '3.70%' : 
               category === 'B' ? '3.70%' : 
               category === 'C' ? '2.70%' : '3.30%'}
            </div>
          </div>
          <div className="p-1 bg-orange-50 rounded text-center">
            <div className="font-semibold text-orange-800">İlave GV</div>
            <div className="text-orange-600">
              {category === 'A' ? '5.00%' : 
               category === 'B' ? '5.00%' : 
               category === 'C' ? '30.00%' : '5.00%'}
            </div>
          </div>
          <div className="p-1 bg-green-50 rounded text-center">
            <div className="font-semibold text-green-800">ÖTV</div>
            <div className="text-green-600">
              {category === 'C' ? '3.0%' : '0.0%'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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

        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Proje Bilgileri</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">Proje Adı</h3>
              <p className="text-gray-700">E-Moped Üretimi & Batarya Swap İstasyonları</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Aktörler</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {state.actors.map((actor, index) => (
                  <Card key={actor.id} className="p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Logo Area */}
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center shadow-md">
                        {actor.logoUrl ? (
                          <img 
                            src={actor.logoUrl} 
                            alt={`${actor.name} Logo`}
                            className="w-16 h-16 rounded-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                            actor.id === 'atabridge' ? 'from-orange-400 to-orange-600' :
                            actor.id === 'ertug' ? 'from-green-400 to-green-600' :
                            'from-blue-400 to-blue-600'
                          } flex items-center justify-center ${actor.logoUrl ? 'hidden' : 'flex'}`}
                        >
                          <span className="text-white font-bold text-lg">
                            {actor.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Company Info */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{actor.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{actor.description}</p>
                      </div>
                      
                      {/* Role Badge */}
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        actor.id === 'atabridge' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                        actor.id === 'ertug' ? 'bg-green-100 text-green-800 border border-green-200' :
                        'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {actor.id === 'atabridge' ? 'Tedarik & Danışmanlık' :
                         actor.id === 'ertug' ? 'Montaj & Üretim' :
                         'Satış & Swap Operasyonu'}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">Amaç</h3>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'de e-mobilite pazarına entegre e-moped üretimi + batarya swap altyapısı
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* İş Süreci Akışı */}
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
            <EnhancedBusinessFlowDiagram />
          </CardContent>
        </Card>
      </section>

      {/* Ürün Portföyü Özeti */}
      <section>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün Portföyü</h3>
          <p className="text-gray-600">Proje kapsamındaki tüm ürün kategorileri ve detayları</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Üretim Ekipmanları */}
          <Card className="border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Factory className="h-5 w-5 mr-2 text-orange-600" />
                <span>Kategori A: Üretim Ekipmanları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.products.equipments.map((equipment) => (
                <div key={equipment.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  {/* Ürün Görseli */}
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    {equipment.imageUrl ? (
                      <img 
                        src={equipment.imageUrl} 
                        alt={equipment.name}
                        className="h-20 w-20 object-contain rounded"
                      />
                    ) : (
                      <Factory className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Ürün Bilgileri */}
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-gray-800">{equipment.name}</div>
                    <div className="text-xs text-gray-600">Tedarikçi: {equipment.supplier}</div>
                    <div className="text-xs font-semibold text-green-600">
                      Fiyat: {equipment.price || 'Belirtilmemiş'}
                    </div>
                    <div className="text-xs text-gray-700 line-clamp-2">
                      {equipment.specifications || 'Özellik bilgisi eklenmemiş'}
                    </div>
                  </div>
                </div>
              ))}
              {state.products.equipments.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Factory className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Henüz ürün eklenmemiş</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* E-Moped */}
          <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-600" />
                <span>Kategori B: E-Moped</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.products.emopeds.map((emoped) => (
                <div key={emoped.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  {/* Ürün Görseli */}
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    {emoped.imageUrl ? (
                      <img 
                        src={emoped.imageUrl} 
                        alt={emoped.name}
                        className="h-20 w-20 object-contain rounded"
                      />
                    ) : (
                      <Zap className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Ürün Bilgileri */}
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-gray-800">{emoped.name}</div>
                    <div className="text-xs text-gray-600">Tedarikçi: {emoped.supplier}</div>
                    <div className="text-xs font-semibold text-green-600">
                      Gümrük Sonrası: {emoped.customsData?.finalTl ? 
                        `${emoped.customsData.finalTl.toLocaleString()} TL` : 
                        emoped.price || 'Hesaplanmamış'}
                    </div>
                    <div className="text-xs text-gray-700 line-clamp-2">
                      {emoped.specifications || 'Motor: 3000W, Hız: 80km/h, Menzil: 60-80km'}
                    </div>
                  </div>
                </div>
              ))}
              {state.products.emopeds.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Henüz ürün eklenmemiş</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Batarya */}
          <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Battery className="h-5 w-5 mr-2 text-green-600" />
                <span>Kategori C: Batarya</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.products.batteries.map((battery) => (
                <div key={battery.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  {/* Ürün Görseli */}
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    {battery.imageUrl ? (
                      <img 
                        src={battery.imageUrl} 
                        alt={battery.name}
                        className="h-20 w-20 object-contain rounded"
                      />
                    ) : (
                      <Battery className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Ürün Bilgileri */}
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-gray-800">{battery.name}</div>
                    <div className="text-xs text-gray-600">Tedarikçi: {battery.supplier}</div>
                    <div className="text-xs font-semibold text-green-600">
                      Gümrük Sonrası: {battery.customsData?.finalTl ? 
                        `${battery.customsData.finalTl.toLocaleString()} TL` : 
                        battery.price || 'Hesaplanmamış'}
                    </div>
                    <div className="text-xs text-gray-700 line-clamp-2">
                      {battery.specifications || 'IP67 dayanıklılık, Akıllı BMS sistemi'}
                    </div>
                  </div>
                </div>
              ))}
              {state.products.batteries.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Battery className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Henüz ürün eklenmemiş</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Kabinet */}
          <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="h-5 w-5 mr-2 text-purple-600" />
                <span>Kategori D: Kabinet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.products.cabinets.map((cabinet) => (
                <div key={cabinet.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  {/* Ürün Görseli */}
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    {cabinet.imageUrl ? (
                      <img 
                        src={cabinet.imageUrl} 
                        alt={cabinet.name}
                        className="h-20 w-20 object-contain rounded"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Ürün Bilgileri */}
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-gray-800">{cabinet.name}</div>
                    <div className="text-xs text-gray-600">Tedarikçi: {cabinet.supplier}</div>
                    <div className="text-xs font-semibold text-green-600">
                      Gümrük Sonrası: {cabinet.customsData?.finalTl ? 
                        `${cabinet.customsData.finalTl.toLocaleString()} TL` : 
                        cabinet.price || 'Hesaplanmamış'}
                    </div>
                    <div className="text-xs text-gray-700 line-clamp-2">
                      {cabinet.specifications || '8-10 slot swap kabinleri, Akıllı sıcaklık yönetimi'}
                    </div>
                  </div>
                </div>
              ))}
              {state.products.cabinets.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Henüz ürün eklenmemiş</p>
                </div>
              )}
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