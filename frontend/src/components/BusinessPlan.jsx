import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Briefcase, 
  Target, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Cog, 
  Zap, 
  Battery, 
  Truck, 
  AlertTriangle,
  BarChart3,
  Upload,
  ArrowRight,
  Factory,
  Building2,
  ShoppingCart,
  PieChart,
  Loader2
} from 'lucide-react';
import Navigation from './Navigation';
import SystemFlowDiagram from './SystemFlowDiagram';
import FinancialCharts from './FinancialCharts';
import AnimatedCounter from './AnimatedCounter';
import ImageUploader from './ImageUploader';
import { useBusinessPlan } from '../hooks/useBusinessPlan';

const BusinessPlan = () => {
  const [activeSection, setActiveSection] = useState('executive');
  const [isMobile, setIsMobile] = useState(false);
  const { data: businessPlanData, loading, error, refetch } = useBusinessPlan();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">İş planı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <Button onClick={refetch} variant="outline">
            Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  if (!businessPlanData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Navigation 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isMobile={isMobile}
      />
      
      <div className={`${isMobile ? 'pb-20' : 'ml-64'} transition-all duration-300`}>
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
          
          {/* Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
              Business Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              E-Moped Production & Battery Swap Project
            </p>
          </div>

          {/* Executive Summary */}
          <section id="executive" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Yönetici Özeti</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">Proje Adı</h3>
                  <p className="text-gray-700">{businessPlanData.executive_summary?.project_name || businessPlanData.executiveSummary?.projectName}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-3">Aktörler</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {(businessPlanData.executive_summary?.actors || businessPlanData.executiveSummary?.actors || []).map((actor, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-orange-100">
                        <h4 className="font-semibold text-gray-800">{actor.name}</h4>
                        <p className="text-sm text-gray-600">{actor.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">Amaç</h3>
                  <p className="text-gray-700 leading-relaxed">{businessPlanData.executive_summary?.objective || businessPlanData.executiveSummary?.objective}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-3">Gelir Modeli</h3>
                  <div className="space-y-2">
                    {(businessPlanData.executive_summary?.revenue_model || businessPlanData.executiveSummary?.revenueModel || []).map((model, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <ArrowRight className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-700">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Business Model */}
          <section id="business-model" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">İş Modeli</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <SystemFlowDiagram />
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Tedarikçiler</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(businessPlanData.business_model?.suppliers || businessPlanData.businessModel?.suppliers || []).map((supplier, index) => (
                      <Card key={index} className="border border-blue-100 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gray-800">{supplier.name}</h4>
                          <p className="text-sm text-gray-600">{supplier.product}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Operations Plan */}
          <section id="operations" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Cog className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Operasyon Planı</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="atabridge">
                    <AccordionTrigger className="text-lg font-semibold text-green-600">
                      AtaBridge Operasyonları
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {(businessPlanData.operations?.atabridge_ops || businessPlanData.operations?.atabridgeOps || []).map((op, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{op}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="ertug">
                    <AccordionTrigger className="text-lg font-semibold text-green-600">
                      Ertuğ Operasyonları
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {(businessPlanData.operations?.ertug_ops || businessPlanData.operations?.ertugOps || []).map((op, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{op}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="fiyuu">
                    <AccordionTrigger className="text-lg font-semibold text-green-600">
                      Fiyuu Operasyonları
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {(businessPlanData.operations?.fiyuu_ops || businessPlanData.operations?.fiyuuOps || []).map((op, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{op}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* Products */}
          <section id="products" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Factory className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Ürünler & Özellikler</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Equipment */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
                    <Cog className="h-5 w-5 mr-2" />
                    Üretim Ekipmanları
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {(businessPlanData.products?.equipment || []).map((equipment, index) => (
                      <Card key={index} className="border border-purple-100">
                        <CardContent className="p-4 space-y-4">
                          <ImageUploader 
                            type="equipment" 
                            id={equipment.name}
                            label={equipment.name}
                            existingImageId={equipment.image_id || equipment.imageId}
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">{equipment.name}</h4>
                            <p className="text-sm text-gray-600">Tedarikçi: {equipment.supplier}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* E-Moped */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    E-Moped Model "{businessPlanData.products?.emoped?.model || 'BODYGUARD'}"
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-purple-100">
                      <CardContent className="p-4">
                        <ImageUploader 
                          type="emoped" 
                          id="bodyguard"
                          label="E-Moped BODYGUARD"
                          existingImageId={businessPlanData.products?.emoped?.image_id || businessPlanData.products?.emoped?.imageId}
                        />
                      </CardContent>
                    </Card>
                    <Card className="border border-purple-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-4">Teknik Özellikler</h4>
                        <div className="space-y-3">
                          {(businessPlanData.products?.emoped?.specs || []).map((spec, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600">{spec.label}:</span>
                              <span className="font-medium text-gray-800">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Battery & Swap Cabinet */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
                    <Battery className="h-5 w-5 mr-2" />
                    Battery & Swap Cabinet
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-purple-100">
                      <CardContent className="p-4">
                        <ImageUploader 
                          type="battery" 
                          id="swap-cabinet"
                          label="Battery & Swap Cabinet"
                          existingImageId={businessPlanData.products?.battery?.image_id || businessPlanData.products?.battery?.imageId}
                        />
                      </CardContent>
                    </Card>
                    <Card className="border border-purple-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-4">Özellikler</h4>
                        <ul className="space-y-2">
                          {(businessPlanData.products?.battery?.features || []).map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="h-2 w-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Financial Plan */}
          <section id="financial" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Finansal Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <FinancialCharts data={businessPlanData.financialData} />
              </CardContent>
            </Card>
          </section>

          {/* Risk Analysis */}
          <section id="risks" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Risk Analizi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {businessPlanData.risks.map((risk, index) => (
                    <Card key={index} className="border border-red-100">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-red-700">{risk.category}</h4>
                            <p className="text-gray-700 text-sm mt-1">{risk.risk}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Investment Summary */}
          <section id="investment" className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-indigo-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <PieChart className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Yatırım Özet Tablosu</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-indigo-200">
                        <th className="text-left p-4 font-semibold text-indigo-700">Aktör</th>
                        <th className="text-left p-4 font-semibold text-indigo-700">Yatırım Kalemleri</th>
                        <th className="text-left p-4 font-semibold text-indigo-700">Gelir Modeli</th>
                        <th className="text-left p-4 font-semibold text-indigo-700">3 Yıllık Beklenen Sonuç</th>
                      </tr>
                    </thead>
                    <tbody>
                      {businessPlanData.investmentSummary.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-indigo-25">
                          <td className="p-4">
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                              {item.actor}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-gray-700">{item.investment}</td>
                          <td className="p-4 text-sm text-gray-700">{item.model}</td>
                          <td className="p-4 text-sm text-gray-700">{item.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan;