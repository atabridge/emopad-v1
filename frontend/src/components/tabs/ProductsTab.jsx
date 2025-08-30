import React, { useState } from 'react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Factory, Zap, Battery, Package, Plus, Edit, Save, X, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const ProductsTab = () => {
  const { state, dispatch, actionTypes } = useBusinessPlan();
  const [activeCategory, setActiveCategory] = useState('equipments');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});

  const categories = {
    equipments: { label: 'Üretim Ekipmanları', icon: Factory, key: 'equipments', category: 'A' },
    emopeds: { label: 'E-Moped', icon: Zap, key: 'emopeds', category: 'B' },
    batteries: { label: 'Batarya', icon: Battery, key: 'batteries', category: 'C' },
    cabinets: { label: 'Kabinet', icon: Package, key: 'cabinets', category: 'D' }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      specifications: '',
      supplier: '',
      price: ''
    });
  };

  const handleAdd = () => {
    if (!formData.name?.trim()) {
      toast.error('Ürün adı gereklidir');
      return;
    }

    const newProduct = {
      ...formData,
      category: categories[activeCategory].category,
      id: Date.now().toString()
    };

    // Context'e ürün ekleme burada implement edilecek
    toast.success('Ürün eklendi');
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Gümrük hesaplama tablosu bileşeni
  const CustomsCalculationTable = ({ product, category }) => {
    if (!product?.customsData) return null;

    const { customsData } = product;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Gümrük Hesaplama Tablosu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Brand</th>
                  <th className="border border-gray-300 p-2 text-left">HS Code</th>
                  <th className="border border-gray-300 p-2 text-left">Model</th>
                  <th className="border border-gray-300 p-2 text-right">FOB USD</th>
                  <th className="border border-gray-300 p-2 text-right">Qty</th>
                  <th className="border border-gray-300 p-2 text-right">Freight</th>
                  <th className="border border-gray-300 p-2 text-right">CIF USD</th>
                  <th className="border border-gray-300 p-2 text-right">CIF TL</th>
                  <th className="border border-gray-300 p-2 text-right">GV</th>
                  <th className="border border-gray-300 p-2 text-right">İlave GV</th>
                  <th className="border border-gray-300 p-2 text-right">KKDF</th>
                  <th className="border border-gray-300 p-2 text-right">DV</th>
                  <th className="border border-gray-300 p-2 text-right">Dep</th>
                  <th className="border border-gray-300 p-2 text-right">Tah</th>
                  <th className="border border-gray-300 p-2 text-right">Tüm Sair</th>
                  <th className="border border-gray-300 p-2 text-right">Logis</th>
                  <th className="border border-gray-300 p-2 text-right">COGS</th>
                  <th className="border border-gray-300 p-2 text-right">Bandrol</th>
                  <th className="border border-gray-300 p-2 text-right">Ara Top</th>
                  <th className="border border-gray-300 p-2 text-right">ÖTV</th>
                  <th className="border border-gray-300 p-2 text-right">Final TL</th>
                  <th className="border border-gray-300 p-2 text-right">Final USD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">{customsData.brand}</td>
                  <td className="border border-gray-300 p-2">{customsData.hsCode}</td>
                  <td className="border border-gray-300 p-2">{customsData.model}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.fobUsd?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.qty?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.freight}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.cifUsd?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.cifTl?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.gv?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.ilaveGv?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.kkdf}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.dv}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.dep}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.tah}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.tumSair}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.logis?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right font-semibold">{customsData.cogs?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.bandrol}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.araTop?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{customsData.otv?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right font-bold bg-green-100">{customsData.finalTl?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right font-bold">{customsData.finalUsd?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Gümrük oranları bilgisi */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-2 bg-blue-50 rounded">
              <div className="font-semibold text-blue-800">Döviz Kuru</div>
              <div className="text-blue-600">45.0 TL/USD</div>
            </div>
            {category === 'B' && (
              <>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="font-semibold text-orange-800">GV</div>
                  <div className="text-orange-600">3.70%</div>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="font-semibold text-orange-800">İlave GV</div>
                  <div className="text-orange-600">5.00%</div>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="font-semibold text-orange-800">ÖTV</div>
                  <div className="text-orange-600">0.0%</div>
                </div>
              </>
            )}
            {category === 'C' && (
              <>
                <div className="p-2 bg-green-50 rounded">
                  <div className="font-semibold text-green-800">GV</div>
                  <div className="text-green-600">2.70%</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="font-semibold text-green-800">İlave GV</div>
                  <div className="text-green-600">30.00%</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="font-semibold text-green-800">ÖTV</div>
                  <div className="text-green-600">3.0%</div>
                </div>
              </>
            )}
            {category === 'D' && (
              <>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="font-semibold text-purple-800">GV</div>
                  <div className="text-purple-600">3.30%</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="font-semibold text-purple-800">İlave GV</div>
                  <div className="text-purple-600">5.00%</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="font-semibold text-purple-800">ÖTV</div>
                  <div className="text-purple-600">0.0%</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Ürün kartı bileşeni
  const ProductCard = ({ product, categoryKey }) => {
    const categoryInfo = categories[categoryKey];
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {categoryInfo.category}
              </Badge>
              <span>{product.name}</span>
            </div>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ürün Görseli */}
          <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-28 max-w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`flex items-center justify-center h-full text-gray-400 text-sm ${product.imageUrl ? 'hidden' : 'flex'}`}
            >
              Görsel Yok
            </div>
          </div>
          
          {/* Ürün Bilgileri */}
          <div className="space-y-2">
            <div>
              <div className="text-xs font-medium text-gray-600">Tedarikçi</div>
              <div className="text-sm">{product.supplier}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600">Fiyat</div>
              <div className="text-sm font-semibold text-green-600">{product.price}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600">Özellikler</div>
              <div className="text-xs text-gray-700">{product.specifications}</div>
            </div>
          </div>
          
          {/* Gümrük Hesaplama Tablosu */}
          {(categoryKey === 'emopeds' || categoryKey === 'batteries' || categoryKey === 'cabinets') && (
            <CustomsCalculationTable product={product} category={categoryInfo.category} />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Package className="h-7 w-7 mr-3 text-green-600" />
            Ürün & Teknoloji
          </h2>
          <p className="text-gray-600 mt-1">
            Ürün kategorileri ve gümrük hesaplama tabloları
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ürün Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Ürün Ekle</DialogTitle>
              <DialogDescription>
                {categories[activeCategory].label} kategorisine yeni ürün ekleyin
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="add-name">Ürün Adı*</Label>
                <Input
                  id="add-name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ürün adını girin"
                />
              </div>
              
              <div>
                <Label htmlFor="add-supplier">Tedarikçi</Label>
                <Input
                  id="add-supplier"
                  value={formData.supplier || ''}
                  onChange={(e) => handleInputChange('supplier', e.target.value)}
                  placeholder="Tedarikçi adı"
                />
              </div>
              
              <div>
                <Label htmlFor="add-price">Fiyat</Label>
                <Input
                  id="add-price"
                  value={formData.price || ''}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="örn: 1000 USD"
                />
              </div>
              
              <div>
                <Label htmlFor="add-image">Görsel URL</Label>
                <Input
                  id="add-image"
                  value={formData.imageUrl || ''}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="add-specs">Özellikler</Label>
                <Textarea
                  id="add-specs"
                  value={formData.specifications || ''}
                  onChange={(e) => handleInputChange('specifications', e.target.value)}
                  placeholder="Ürün özelliklerini girin"
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2 flex space-x-2 pt-4">
                <Button onClick={handleAdd} className="flex-1">
                  Ekle
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setIsAddModalOpen(false);
                  }} 
                  className="flex-1"
                >
                  İptal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {Object.entries(categories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{category.label}</span>
                <span className="sm:hidden">{category.category}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(categories).map(([categoryKey, categoryInfo]) => (
          <TabsContent key={categoryKey} value={categoryKey}>
            <div className="space-y-6">
              <div className="text-sm text-gray-600 mb-4">
                Kategori {categoryInfo.category} - {categoryInfo.label}
                {(categoryKey === 'emopeds' || categoryKey === 'batteries' || categoryKey === 'cabinets') && 
                  ' (Gümrük hesaplamaları dahil)'
                }
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {state.products[categoryKey]?.map((product) => (
                  <ProductCard key={product.id} product={product} categoryKey={categoryKey} />
                ))}
              </div>
              
              {(!state.products[categoryKey] || state.products[categoryKey].length === 0) && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <categoryInfo.icon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Henüz {categoryInfo.label} yok
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      Bu kategoriye ilk ürünü ekleyin
                    </p>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      İlk Ürünü Ekle
                    </Button>
                  </CardContent>
                </Card>
              )}
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
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Ürün Kategorileri</h4>
              <div className="mt-2 text-sm text-blue-800">
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Kategori A:</strong> Üretim Ekipmanları (Montaj hattı, makinalar)</li>
                  <li><strong>Kategori B:</strong> E-Moped (Gümrük hesaplaması ile)</li>
                  <li><strong>Kategori C:</strong> Batarya (Gümrük hesaplaması ile)</li>
                  <li><strong>Kategori D:</strong> Kabinet (Gümrük hesaplaması ile)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsTab;