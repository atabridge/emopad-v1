import React, { useState } from 'react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { TrendingUp, Building, ShoppingCart, Battery, DollarSign, Plus, Edit, Save, X, Calculator, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { toast } from 'sonner';

const FinancialsTab = () => {
  const { state, dispatch, actionTypes } = useBusinessPlan();
  const [activeCompany, setActiveCompany] = useState('ertug');
  const [editMode, setEditMode] = useState(null); // 'investments', 'revenue', 'pnl'
  const [formData, setFormData] = useState({});

  const companies = {
    ertug: { 
      label: 'Ertuğ', 
      icon: Building, 
      color: 'green',
      description: 'Üretim ve Montaj',
      data: state.financials.ertug
    },
    fiyuuSales: { 
      label: 'Fiyuu Sales', 
      icon: ShoppingCart, 
      color: 'blue',
      description: 'E-moped Satışları',
      data: state.financials.fiyuuSales
    },
    fiyuuSwap: { 
      label: 'Fiyuu Swap', 
      icon: Battery, 
      color: 'purple',
      description: 'Batarya Kiralama',
      data: state.financials.fiyuuSwap
    }
  };

  const formatCurrency = (amount) => {
    if (Math.abs(amount) >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B TL`;
    } else if (Math.abs(amount) >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M TL`;
    } else if (Math.abs(amount) >= 1000) {
      return `${(amount / 1000).toFixed(0)}K TL`;
    }
    return `${amount?.toLocaleString()} TL`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Context güncellemesi burada implement edilecek
    setEditMode(null);
    setFormData({});
    toast.success('Finansal veriler güncellendi');
  };

  // Yatırım tablosu bileşeni
  const InvestmentsTable = ({ companyKey }) => {
    const company = companies[companyKey];
    const investments = company.data.investments || [];

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <span>Yatırım Kalemleri</span>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Yatırım Kalemi</th>
                  <th className="text-right p-2">Tutar (USD)</th>
                  <th className="text-right p-2">Tutar (TL)</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{investment.name}</td>
                    <td className="p-2 text-right">{investment.amount?.toLocaleString()} USD</td>
                    <td className="p-2 text-right">{(investment.amount * 45)?.toLocaleString()} TL</td>
                  </tr>
                ))}
                <tr className="font-semibold bg-gray-50">
                  <td className="p-2">Toplam Yatırım</td>
                  <td className="p-2 text-right">
                    {investments.reduce((sum, inv) => sum + inv.amount, 0)?.toLocaleString()} USD
                  </td>
                  <td className="p-2 text-right">
                    {(investments.reduce((sum, inv) => sum + inv.amount, 0) * 45)?.toLocaleString()} TL
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Gelir modeli bileşeni
  const RevenueModelCard = ({ companyKey }) => {
    const company = companies[companyKey];
    const data = company.data;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Gelir Modeli</span>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Açıklama</div>
              <div className="text-sm bg-gray-50 p-3 rounded">{data.revenueModel}</div>
            </div>

            {/* Ertuğ için üretim verileri */}
            {companyKey === 'ertug' && data.production && (
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Üretim Verileri</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2 text-left">Yıl</th>
                        <th className="border border-gray-200 p-2 text-right">Adet</th>
                        <th className="border border-gray-200 p-2 text-right">Üretim Maliyeti</th>
                        <th className="border border-gray-200 p-2 text-right">Satış Fiyatı</th>
                        <th className="border border-gray-200 p-2 text-right">Birim Karı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.production).map(([year, prod]) => (
                        <tr key={year}>
                          <td className="border border-gray-200 p-2 font-semibold">{year}</td>
                          <td className="border border-gray-200 p-2 text-right">{prod.units?.toLocaleString()}</td>
                          <td className="border border-gray-200 p-2 text-right">{prod.cost?.toLocaleString()} TL</td>
                          <td className="border border-gray-200 p-2 text-right">{prod.price?.toLocaleString()} TL</td>
                          <td className="border border-gray-200 p-2 text-right text-green-600 font-semibold">
                            {(prod.price - prod.cost)?.toLocaleString()} TL
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Fiyuu Sales için satış verileri */}
            {companyKey === 'fiyuuSales' && data.sales && (
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Al-Sat Verileri</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2 text-left">Yıl</th>
                        <th className="border border-gray-200 p-2 text-right">Adet</th>
                        <th className="border border-gray-200 p-2 text-right">Alış Fiyatı</th>
                        <th className="border border-gray-200 p-2 text-right">Satış Fiyatı</th>
                        <th className="border border-gray-200 p-2 text-right">Birim Karı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.sales).map(([year, sale]) => (
                        <tr key={year}>
                          <td className="border border-gray-200 p-2 font-semibold">{year}</td>
                          <td className="border border-gray-200 p-2 text-right">{sale.units?.toLocaleString()}</td>
                          <td className="border border-gray-200 p-2 text-right">{sale.buyPrice?.toLocaleString()} TL</td>
                          <td className="border border-gray-200 p-2 text-right">{sale.sellPrice?.toLocaleString()} TL</td>
                          <td className="border border-gray-200 p-2 text-right text-green-600 font-semibold">
                            {(sale.sellPrice - sale.buyPrice)?.toLocaleString()} TL
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Fiyuu Swap için kiralama verileri */}
            {companyKey === 'fiyuuSwap' && data.rental && (
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Kiralama Verileri</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2 text-left">Yıl</th>
                        <th className="border border-gray-200 p-2 text-right">Batarya Sayısı</th>
                        <th className="border border-gray-200 p-2 text-right">Kabinet Sayısı</th>
                        <th className="border border-gray-200 p-2 text-right">Aylık Kiralama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.rental).map(([year, rental]) => (
                        <tr key={year}>
                          <td className="border border-gray-200 p-2 font-semibold">{year}</td>
                          <td className="border border-gray-200 p-2 text-right">{rental.batteryCount?.toLocaleString()}</td>
                          <td className="border border-gray-200 p-2 text-right">{rental.cabinetCount?.toLocaleString()}</td>
                          <td className="border border-gray-200 p-2 text-right text-green-600 font-semibold">
                            {rental.monthlyRental?.toLocaleString()} TL/ay
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // P&L tablosu bileşeni
  const PnLTable = ({ companyKey }) => {
    const company = companies[companyKey];
    const pnlData = company.data.pnl;

    const years = Object.keys(pnlData);
    const chartData = years.map(year => ({
      year,
      netSales: pnlData[year].netSales / 1000000,
      grossProfit: pnlData[year].grossProfit / 1000000,
      ebitda: pnlData[year].ebitda / 1000000
    }));

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-purple-600" />
              <span>3 Yıllık P&L Tablosu</span>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* P&L Tablosu */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-3 text-left font-semibold">Kalem</th>
                  <th className="border border-gray-200 p-3 text-right font-semibold">2026</th>
                  <th className="border border-gray-200 p-3 text-right font-semibold">2027</th>
                  <th className="border border-gray-200 p-3 text-right font-semibold">2028</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50">
                  <td className="border border-gray-200 p-3 font-semibold">Net Sales</td>
                  <td className="border border-gray-200 p-3 text-right font-semibold">
                    {formatCurrency(pnlData[2026]?.netSales)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right font-semibold">
                    {formatCurrency(pnlData[2027]?.netSales)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right font-semibold">
                    {formatCurrency(pnlData[2028]?.netSales)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">Cost of Sales</td>
                  <td className="border border-gray-200 p-3 text-right">
                    {formatCurrency(pnlData[2026]?.costOfSales)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {formatCurrency(pnlData[2027]?.costOfSales)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {formatCurrency(pnlData[2028]?.costOfSales)}
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-200 p-3 font-semibold">Gross Profit</td>
                  <td className="border border-gray-200 p-3 text-right font-semibold">
                    {formatCurrency(pnlData[2026]?.grossProfit)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right font-semibold">
                    {formatCurrency(pnlData[2027]?.grossProfit)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right font-semibold">
                    {formatCurrency(pnlData[2028]?.grossProfit)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3">Total OPEX</td>
                  <td className="border border-gray-200 p-3 text-right">
                    {formatCurrency(pnlData[2026]?.totalOpex)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {formatCurrency(pnlData[2027]?.totalOpex)}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {formatCurrency(pnlData[2028]?.totalOpex)}
                  </td>
                </tr>
                <tr className={`${pnlData[2026]?.ebitda < 0 ? 'bg-red-50' : 'bg-orange-50'}`}>
                  <td className="border border-gray-200 p-3 font-bold">EBITDA</td>
                  <td className={`border border-gray-200 p-3 text-right font-bold ${pnlData[2026]?.ebitda < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(pnlData[2026]?.ebitda)}
                  </td>
                  <td className={`border border-gray-200 p-3 text-right font-bold ${pnlData[2027]?.ebitda < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(pnlData[2027]?.ebitda)}
                  </td>
                  <td className={`border border-gray-200 p-3 text-right font-bold ${pnlData[2028]?.ebitda < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(pnlData[2028]?.ebitda)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* P&L Grafikleri */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gelir Trendi */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Gelir Trendi (Milyon TL)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => [`${value.toFixed(0)}M TL`, 'Net Sales']} />
                  <Bar dataKey="netSales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Karlılık Trendi */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Karlılık Trendi (Milyon TL)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="grossProfit" stroke="#10b981" strokeWidth={2} name="Gross Profit" />
                  <Line type="monotone" dataKey="ebitda" stroke="#f59e0b" strokeWidth={2} name="EBITDA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="h-7 w-7 mr-3 text-emerald-600" />
            Finans
          </h2>
          <p className="text-gray-600 mt-1">
            Finansal planlar ve 3 yıllık projeksiyonlar
          </p>
        </div>
      </div>

      <Tabs value={activeCompany} onValueChange={setActiveCompany} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {Object.entries(companies).map(([key, company]) => {
            const Icon = company.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{company.label}</span>
                <span className="sm:hidden">{company.label.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(companies).map(([companyKey, company]) => (
          <TabsContent key={companyKey} value={companyKey}>
            <div className="space-y-6">
              {/* Şirket Başlığı */}
              <Card className={`border-${company.color}-200 bg-${company.color}-50`}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-${company.color}-100 rounded-lg`}>
                      <company.icon className={`h-8 w-8 text-${company.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{company.label}</h3>
                      <p className="text-gray-600">{company.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yatırım Tablosu */}
              <InvestmentsTable companyKey={companyKey} />

              {/* Gelir Modeli */}
              <RevenueModelCard companyKey={companyKey} />

              {/* P&L Tablosu */}
              <PnLTable companyKey={companyKey} />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Bilgi Notu */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-200">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Finansal Planlama</h4>
              <div className="mt-2 text-sm text-blue-800">
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Ertuğ:</strong> Üretim odaklı - 2026'da negatif EBITDA, sonrasında pozitif</li>
                  <li><strong>Fiyuu Sales:</strong> Al-sat modeli - istikrarlı büyüme ve karlılık</li>
                  <li><strong>Fiyuu Swap:</strong> Abonelik modeli - yüksek başlangıç yatırımı, güçlü nakit akışı</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialsTab;