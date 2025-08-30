import React, { useState } from 'react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { GitBranch, Save, Edit, Users, Building2, Truck } from 'lucide-react';
import { toast } from 'sonner';
import EnhancedBusinessFlowDiagram from '../EnhancedBusinessFlowDiagram';

const BusinessFlowTab = () => {
  const { state, dispatch, actionTypes } = useBusinessPlan();
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Context güncellemesi
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_FLOW,
      payload: formData
    });
    
    setEditMode(null);
    setFormData({});
    toast.success('İş akışı güncellendi');
  };

  const handleEdit = (section) => {
    setEditMode(section);
    if (section === 'atabridge') {
      setFormData({
        name: state.actors.find(a => a.id === 'atabridge')?.name || 'AtaBridge',
        description: state.actors.find(a => a.id === 'atabridge')?.description || '',
        connections: state.businessFlow.atabridgeConnections || []
      });
    }
  };

  const handleSupplierConnectionChange = (supplierId, target, checked) => {
    const currentFlow = { ...state.businessFlow };
    
    if (target === 'ertug') {
      let supplierToErtug = [...(currentFlow.supplierToErtug || [])];
      if (checked) {
        if (!supplierToErtug.includes(supplierId)) {
          supplierToErtug.push(supplierId);
        }
      } else {
        supplierToErtug = supplierToErtug.filter(id => id !== supplierId);
      }
      currentFlow.supplierToErtug = supplierToErtug;
    } else if (target === 'fiyuu') {
      let supplierToFiyuu = [...(currentFlow.supplierToFiyuu || [])];
      if (checked) {
        if (!supplierToFiyuu.includes(supplierId)) {
          supplierToFiyuu.push(supplierId);
        }
      } else {
        supplierToFiyuu = supplierToFiyuu.filter(id => id !== supplierId);
      }
      currentFlow.supplierToFiyuu = supplierToFiyuu;
    }
    
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_FLOW,
      payload: currentFlow
    });
    
    toast.success('Bağlantı güncellendi');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <GitBranch className="h-7 w-7 mr-3 text-purple-600" />
          İş Planı Diyagramı
        </h2>
        <p className="text-gray-600 mt-1">
          İş süreci akışı ve aktörler arası ilişkileri yapılandırın
        </p>
      </div>

      {/* Diyagram Önizlemesi */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>İş Akışı Diyagramı Önizlemesi</CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedBusinessFlowDiagram />
        </CardContent>
      </Card>

      {/* AtaBridge Ayarları */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Building2 className="h-5 w-5 text-orange-600" />
              </div>
              <span>AtaBridge Ayarları</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit('atabridge')}
            >
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editMode === 'atabridge' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="atabridge-name">Firma Adı</Label>
                  <Input
                    id="atabridge-name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="AtaBridge"
                  />
                </div>
                <div>
                  <Label htmlFor="atabridge-desc">Kısa Tanım</Label>
                  <Input
                    id="atabridge-desc"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tedarik araştırma & danışmanlık"
                  />
                </div>
              </div>
              
              <div>
                <Label>AtaBridge → Tedarikçiler Bağlantıları</Label>
                <div className="mt-2 space-y-2">
                  {state.suppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`atabridge-${supplier.id}`}
                        checked={(formData.connections || []).includes(supplier.id)}
                        onCheckedChange={(checked) => {
                          const connections = formData.connections || [];
                          if (checked) {
                            handleInputChange('connections', [...connections, supplier.id]);
                          } else {
                            handleInputChange('connections', connections.filter(id => id !== supplier.id));
                          }
                        }}
                      />
                      <label htmlFor={`atabridge-${supplier.id}`} className="text-sm">
                        {supplier.name} ({supplier.description})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Kaydet
                </Button>
                <Button variant="outline" onClick={() => setEditMode(null)}>
                  İptal
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-800">
                  {state.actors.find(a => a.id === 'atabridge')?.name || 'AtaBridge'}
                </div>
                <div className="text-sm text-gray-600">
                  {state.actors.find(a => a.id === 'atabridge')?.description || 'Tedarik araştırma & danışmanlık'}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Bağlantılı Tedarikçiler:</div>
                <div className="flex flex-wrap gap-2">
                  {(state.businessFlow.atabridgeConnections || []).map(supplierId => {
                    const supplier = state.suppliers.find(s => s.id === supplierId);
                    return supplier ? (
                      <span key={supplierId} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {supplier.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tedarikçiler Ayarları */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <span>Tedarikçi İlişkileri</span>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {state.suppliers.map((supplier) => (
              <div key={supplier.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800">{supplier.name}</div>
                    <div className="text-sm text-gray-600">{supplier.description}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${supplier.id}-ertug`}
                      checked={state.businessFlow.supplierToErtug?.includes(supplier.id)}
                    />
                    <label htmlFor={`${supplier.id}-ertug`} className="text-sm">
                      Ertuğ satın alır
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${supplier.id}-fiyuu`}
                      checked={state.businessFlow.supplierToFiyuu?.includes(supplier.id)}
                    />
                    <label htmlFor={`${supplier.id}-fiyuu`} className="text-sm">
                      Fiyuu satın alır
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ertuğ ve Fiyuu Ayarları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ertuğ Ayarları */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <span>Ertuğ Ayarları</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-semibold text-gray-800">
                {state.actors.find(a => a.id === 'ertug')?.name || 'Ertuğ'}
              </div>
              <div className="text-sm text-gray-600">
                {state.actors.find(a => a.id === 'ertug')?.description || 'Montaj & Üretim'}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fiyuu, Ertuğ'dan E-moped satın alır</label>
              <Switch
                checked={state.businessFlow.ertugToFiyuu}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fiyuu Ayarları */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <span>Fiyuu Ayarları</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-semibold text-gray-800">
                {state.actors.find(a => a.id === 'fiyuu')?.name || 'Fiyuu'}
              </div>
              <div className="text-sm text-gray-600">
                {state.actors.find(a => a.id === 'fiyuu')?.description || 'Satış & Swap Operasyonu'}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Fiyuu'dan satın alma seçimleri:</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fiyuu-emoped"
                    checked={state.businessFlow.fiyuuToEndUser?.emoped}
                  />
                  <label htmlFor="fiyuu-emoped" className="text-sm">E-moped</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fiyuu-battery"
                    checked={state.businessFlow.fiyuuToEndUser?.battery}
                  />
                  <label htmlFor="fiyuu-battery" className="text-sm">Batarya</label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Son Kullanıcı Ayarları */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <span>Son Kullanıcı Ayarları</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Ad</Label>
              <Input value="Kurye" readOnly className="bg-gray-50" />
            </div>
            <div>
              <Label>Kısa Tanım</Label>
              <Input value="Son Kullanıcı" readOnly className="bg-gray-50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Fiyuu'dan satın alma seçimleri:</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enduser-emoped"
                  checked={state.businessFlow.fiyuuToEndUser?.emoped}
                />
                <label htmlFor="enduser-emoped" className="text-sm">E-moped</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enduser-battery"
                  checked={state.businessFlow.fiyuuToEndUser?.battery}
                />
                <label htmlFor="enduser-battery" className="text-sm">Batarya</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Notu */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-200">
                <GitBranch className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Diyagram Kuralları</h4>
              <div className="mt-2 text-sm text-blue-800 space-y-1">
                <p>• <strong>Kesik oklar:</strong> Danışmanlık ve bağlantı hizmetleri</p>
                <p>• <strong>Düz oklar:</strong> Satın alma ve ürün akışı</p>
                <p>• Yatay kaydırma ile sınırsız tedarikçi yerleşimi desteklenir</p>
                <p>• Tüm değişiklikler Dashboard'daki diyagramda anlık olarak yansır</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessFlowTab;