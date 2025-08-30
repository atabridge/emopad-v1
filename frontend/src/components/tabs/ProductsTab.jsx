import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Factory, Zap, Battery, Package } from 'lucide-react';

const ProductsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Package className="h-7 w-7 mr-3 text-green-600" />
          Ürün & Teknoloji
        </h2>
        <p className="text-gray-600 mt-1">
          Ürün kategorileri ve gümrük hesaplama tabloları
        </p>
      </div>

      <Tabs defaultValue="equipments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="equipments" className="flex items-center space-x-2">
            <Factory className="h-4 w-4" />
            <span>Üretim Ekipmanları</span>
          </TabsTrigger>
          <TabsTrigger value="emopeds" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>E-Moped</span>
          </TabsTrigger>
          <TabsTrigger value="batteries" className="flex items-center space-x-2">
            <Battery className="h-4 w-4" />
            <span>Batarya</span>
          </TabsTrigger>
          <TabsTrigger value="cabinets" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Kabinet</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="equipments">
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Kategori A - Üretim ekipmanları ve makinalar
            </div>
            {/* Equipment content will be implemented */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center py-8">
                  Üretim ekipmanları detayları yakında eklenecek...
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emopeds">
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Kategori B - E-Moped ürünleri ve gümrük hesaplamaları
            </div>
            {/* E-Moped content will be implemented */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center py-8">
                  E-Moped detayları yakında eklenecek...
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="batteries">
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Kategori C - Batarya ürünleri ve gümrük hesaplamaları
            </div>
            {/* Battery content will be implemented */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center py-8">
                  Batarya detayları yakında eklenecek...
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cabinets">
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Kategori D - Cabinet ürünleri ve gümrük hesaplamaları
            </div>
            {/* Cabinet content will be implemented */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center py-8">
                  Cabinet detayları yakında eklenecek...
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsTab;