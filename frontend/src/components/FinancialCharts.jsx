import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const FinancialCharts = ({ data }) => {
  const [selectedCompany, setSelectedCompany] = useState('ertug');

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B TL`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M TL`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K TL`;
    }
    return `${amount} TL`;
  };

  const getGrowthIcon = (current, previous) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const companies = [
    { id: 'ertug', name: 'Ertuğ', data: data.ertug.financials, color: 'green' },
    { id: 'fiyuuSales', name: 'Fiyuu - Sales', data: data.fiyuuSales.financials, color: 'orange' },
    { id: 'fiyuuSwap', name: 'Fiyuu - Battery Rental', data: data.fiyuuSwap.financials, color: 'purple' }
  ];

  const selectedData = companies.find(c => c.id === selectedCompany);

  return (
    <div className="space-y-6">
      <Tabs value={selectedCompany} onValueChange={setSelectedCompany}>
        <TabsList className="grid grid-cols-3 w-full">
          {companies.map((company) => (
            <TabsTrigger key={company.id} value={company.id} className="text-xs">
              {company.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCompany} className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedData.data.map((yearData, index) => {
              const prevYear = index > 0 ? selectedData.data[index - 1] : null;
              return (
                <Card key={yearData.year} className={`border-${selectedData.color}-200`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {yearData.year}
                      <Badge variant="outline" className={`bg-${selectedData.color}-50`}>
                        {index === 0 ? 'Başlangıç' : index === 1 ? 'Büyüme' : 'Olgunluk'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Net Satışlar</div>
                      <div className="flex items-center space-x-2">
                        <AnimatedCounter value={yearData.sales} formatter={formatCurrency} />
                        {prevYear && getGrowthIcon(yearData.sales, prevYear.sales)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">EBITDA</div>
                      <div className="flex items-center space-x-2">
                        <AnimatedCounter 
                          value={yearData.ebitda} 
                          formatter={formatCurrency}
                          className={yearData.ebitda < 0 ? 'text-red-600' : 'text-green-600'}
                        />
                        {prevYear && getGrowthIcon(yearData.ebitda, prevYear.ebitda)}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Brüt Kar Marjı</div>
                      <div className="text-lg font-bold text-gray-800">
                        <AnimatedCounter 
                          value={((yearData.gross / yearData.sales) * 100)} 
                          formatter={(val) => `${val.toFixed(1)}%`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Chart Visualization */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>3 Yıllık Finansal Performans</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sales Chart */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Net Satışlar Trendi</h4>
                  <div className="relative">
                    <div className="flex items-end space-x-4 h-32">
                      {selectedData.data.map((yearData, index) => {
                        const maxSales = Math.max(...selectedData.data.map(d => d.sales));
                        const height = (yearData.sales / maxSales) * 100;
                        return (
                          <div key={yearData.year} className="flex-1 flex flex-col items-center">
                            <div 
                              className={`w-full bg-gradient-to-t from-${selectedData.color}-400 to-${selectedData.color}-300 rounded-t transition-all duration-1000 ease-out`}
                              style={{ height: `${height}%` }}
                            />
                            <div className="mt-2 text-sm font-medium">{yearData.year}</div>
                            <div className="text-xs text-gray-600">{formatCurrency(yearData.sales)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* EBITDA Chart */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">EBITDA Trendi</h4>
                  <div className="relative">
                    <div className="flex items-end space-x-4 h-24">
                      {selectedData.data.map((yearData) => {
                        const allEbitda = selectedData.data.map(d => d.ebitda);
                        const maxEbitda = Math.max(...allEbitda);
                        const minEbitda = Math.min(...allEbitda);
                        const range = maxEbitda - minEbitda;
                        const height = range > 0 ? ((yearData.ebitda - minEbitda) / range) * 100 : 50;
                        
                        return (
                          <div key={yearData.year} className="flex-1 flex flex-col items-center">
                            <div 
                              className={`w-full rounded-t transition-all duration-1000 ease-out ${
                                yearData.ebitda >= 0 
                                  ? `bg-gradient-to-t from-green-400 to-green-300` 
                                  : `bg-gradient-to-t from-red-400 to-red-300`
                              }`}
                              style={{ height: `${Math.abs(height)}%` }}
                            />
                            <div className="mt-2 text-sm font-medium">{yearData.year}</div>
                            <div className={`text-xs ${yearData.ebitda >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(yearData.ebitda)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Summary for Selected Company */}
          {selectedCompany === 'ertug' && (
            <Card className="p-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700">Ertuğ Yatırım Detayları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.ertug.investments.map((investment, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-800">{investment.item}</div>
                      <div className="text-lg font-bold text-green-600">{investment.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialCharts;