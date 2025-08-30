import React, { useState } from 'react';
import { BusinessPlanProvider } from '../context/BusinessPlanContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Cog, 
  GitBranch, 
  TrendingUp 
} from 'lucide-react';

// Components for each tab
import DashboardTab from './tabs/DashboardTab';
import ActorsTab from './tabs/ActorsTab';
import SuppliersTab from './tabs/SuppliersTab';
import ProductsTab from './tabs/ProductsTab';
import BusinessFlowTab from './tabs/BusinessFlowTab';
import FinancialsTab from './tabs/FinancialsTab';

const BusinessPlanDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DashboardTab },
    { id: 'actors', label: 'Aktörler', icon: Users, component: ActorsTab },
    { id: 'suppliers', label: 'Tedarikçiler', icon: Truck, component: SuppliersTab },
    { id: 'products', label: 'Ürün & Teknoloji', icon: Cog, component: ProductsTab },
    { id: 'flow', label: 'İş Planı Diyagramı', icon: GitBranch, component: BusinessFlowTab },
    { id: 'financials', label: 'Finans', icon: TrendingUp, component: FinancialsTab }
  ];

  return (
    <BusinessPlanProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <LayoutDashboard className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      E-Moped Üretimi & Batarya Swap
                    </h1>
                    <p className="text-sm text-gray-500">AtaBridge Business Plan Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                30/08/2025
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-white border-b border-orange-100 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TabsList className="grid w-full grid-cols-6 h-auto bg-transparent p-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex flex-col items-center space-y-2 py-4 px-2 text-xs font-medium data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 hover:bg-orange-50 transition-colors rounded-none"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="hidden sm:block">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {tabs.map((tab) => {
              const Component = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <Component />
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </BusinessPlanProvider>
  );
};

export default BusinessPlanDashboard;