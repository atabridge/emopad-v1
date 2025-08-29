import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';

const SystemFlowDiagram = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const flowData = [
    {
      from: "AtaBridge",
      to: ["Jinggong", "Sanco", "Lingping", "Sleeu", "Zhizhu"],
      relationship: "Tedarikçi Bulma",
      color: "blue"
    },
    {
      from: "Jinggong",
      to: ["Ertuğ"],
      relationship: "Montaj Hattı",
      color: "green"
    },
    {
      from: "Sanco",
      to: ["Ertuğ"],
      relationship: "Boru Bükme Makinası",
      color: "green"
    },
    {
      from: "Lingping",
      to: ["Ertuğ"],
      relationship: "Lazer Kaynak Makinası",
      color: "green"
    },
    {
      from: "Sleeu",
      to: ["Ertuğ"],
      relationship: "CKD E-moped Parçaları",
      color: "green"
    },
    {
      from: "Zhizhu",
      to: ["Fiyuu"],
      relationship: "Batarya & Cabinet",
      color: "purple"
    },
    {
      from: "Ertuğ",
      to: ["Fiyuu"],
      relationship: "Tamamlanmış E-moped",
      color: "orange"
    },
    {
      from: "Fiyuu",
      to: ["Kurye"],
      relationship: "E-moped Satışı & Batarya Kiralama",
      color: "red"
    }
  ];

  const actors = {
    "AtaBridge": { color: "bg-blue-100 border-blue-300 text-blue-800", role: "Tedarik & Danışmanlık" },
    "Jinggong": { color: "bg-gray-100 border-gray-300 text-gray-800", role: "Montaj Hattı" },
    "Sanco": { color: "bg-gray-100 border-gray-300 text-gray-800", role: "Boru Bükme" },
    "Lingping": { color: "bg-gray-100 border-gray-300 text-gray-800", role: "Lazer Kaynak" },
    "Sleeu": { color: "bg-gray-100 border-gray-300 text-gray-800", role: "CKD Parçalar" },
    "Zhizhu": { color: "bg-gray-100 border-gray-300 text-gray-800", role: "Batarya & Cabinet" },
    "Ertuğ": { color: "bg-green-100 border-green-300 text-green-800", role: "Montaj & Üretim" },
    "Fiyuu": { color: "bg-orange-100 border-orange-300 text-orange-800", role: "Satış & Swap" },
    "Kurye": { color: "bg-red-100 border-red-300 text-red-800", role: "Son Kullanıcı" }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-600">Sistem Akış Diyagramı</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          <span>{isExpanded ? 'Daralt' : 'Genişlet'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isExpanded && (
        <Card className="p-6 border border-blue-100">
          <CardContent className="p-0">
            <div className="space-y-8">
              {/* Actor Legend */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(actors).map(([actor, info]) => (
                  <div 
                    key={actor}
                    className={`p-3 rounded-lg border-2 ${info.color} text-center`}
                  >
                    <div className="font-semibold text-sm">{actor}</div>
                    <div className="text-xs mt-1 opacity-80">{info.role}</div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-800 mb-4">İlişki Akışı</h4>
                <div className="space-y-4">
                  {flowData.map((flow, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${actors[flow.from].color}`}>
                        {flow.from}
                      </div>
                      <ArrowRight className={`h-4 w-4 text-${flow.color}-500`} />
                      <div className="flex flex-wrap gap-2">
                        {flow.to.map((target, idx) => (
                          <div key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${actors[target].color}`}>
                            {target}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 ml-4 italic">
                        {flow.relationship}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SystemFlowDiagram;