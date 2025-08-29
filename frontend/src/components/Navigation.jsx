import React from 'react';
import { Button } from './ui/button';
import { 
  Briefcase, 
  Building2, 
  Cog, 
  Factory, 
  TrendingUp, 
  AlertTriangle, 
  PieChart,
  Menu
} from 'lucide-react';

const Navigation = ({ activeSection, onSectionClick, isMobile }) => {
  const navItems = [
    { id: 'executive', label: 'Yönetici Özeti', icon: Briefcase },
    { id: 'business-model', label: 'İş Modeli', icon: Building2 },
    { id: 'operations', label: 'Operasyon', icon: Cog },
    { id: 'products', label: 'Ürünler', icon: Factory },
    { id: 'financial', label: 'Finansal', icon: TrendingUp },
    { id: 'risks', label: 'Risk Analizi', icon: AlertTriangle },
    { id: 'investment', label: 'Yatırım Özeti', icon: PieChart },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around py-2 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionClick(item.id)}
                className={`flex-col h-auto py-2 px-1 ${
                  activeSection === item.id 
                    ? "bg-orange-500 text-white hover:bg-orange-600" 
                    : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r z-40 overflow-y-auto">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Navigasyon</h2>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              onClick={() => onSectionClick(item.id)}
              className={`w-full justify-start ${
                activeSection === item.id 
                  ? "bg-orange-500 text-white hover:bg-orange-600" 
                  : "text-gray-700 hover:bg-orange-50"
              }`}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;