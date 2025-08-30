import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TrendingUp, Building, ShoppingCart, Battery } from 'lucide-react';

const FinancialsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="h-7 w-7 mr-3 text-emerald-600" />
          Finans
        </h2>
        <p className="text-gray-600 mt-1">
          Finansal planlar ve 3 yıllık projeksiyonlar
        </p>
      </div>

      <Tabs defaultValue="ertug" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ertug" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Ertuğ</span>
          </TabsTrigger>
          <TabsTrigger value="fiyuu-sales" className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Fiyuu Sales</span>
          </TabsTrigger>
          <TabsTrigger value="fiyuu-swap" className="flex items-center space-x-2">
            <Battery className="h-4 w-4" />
            <span>Fiyuu Swap</span>
          </TabsTrigger>
          <TabsTrigger value="atabridge" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>AtaBridge</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ertug">
          <Card>
            <CardHeader>
              <CardTitle>Ertuğ - Üretim Finansmanı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Ertuğ finansal detayları yakında eklenecek...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiyuu-sales">
          <Card>
            <CardHeader>
              <CardTitle>Fiyuu Sales - Satış Finansmanı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Fiyuu Sales finansal detayları yakında eklenecek...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiyuu-swap">
          <Card>
            <CardHeader>
              <CardTitle>Fiyuu Swap - Batarya Kiralama</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Fiyuu Swap finansal detayları yakında eklenecek...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atabridge">
          <Card>
            <CardHeader>
              <CardTitle>AtaBridge - Danışmanlık Gelirleri</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                AtaBridge finansal detayları yakında eklenecek...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialsTab;