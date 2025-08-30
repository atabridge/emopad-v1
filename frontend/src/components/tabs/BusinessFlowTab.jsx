import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GitBranch } from 'lucide-react';
import BusinessFlowDiagram from '../BusinessFlowDiagram';

const BusinessFlowTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <GitBranch className="h-7 w-7 mr-3 text-purple-600" />
          İş Planı Diyagramı
        </h2>
        <p className="text-gray-600 mt-1">
          İş süreci akışı ve aktörler arası ilişkiler
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Otomatik İş Akışı Diyagramı</CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessFlowDiagram />
        </CardContent>
      </Card>

      {/* Form alanları gelecekte eklenecek */}
      <Card>
        <CardHeader>
          <CardTitle>Diyagram Ayarları</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            İş akışı ayarlama formu yakında eklenecek...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessFlowTab;