import React, { useState } from 'react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Truck, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const SuppliersTab = () => {
  const { state, dispatch, actionTypes } = useBusinessPlan();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      logoUrl: '',
      description: ''
    });
  };

  const handleAdd = () => {
    if (!formData.name.trim()) {
      toast.error('Tedarikçi adı gereklidir');
      return;
    }

    dispatch({
      type: actionTypes.ADD_SUPPLIER,
      payload: formData
    });

    resetForm();
    setIsAddModalOpen(false);
    toast.success('Tedarikçi eklendi');
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier.id);
    setFormData({
      name: supplier.name,
      logoUrl: supplier.logoUrl,
      description: supplier.description
    });
  };

  const handleSave = (supplierId) => {
    if (!formData.name.trim()) {
      toast.error('Tedarikçi adı gereklidir');
      return;
    }

    dispatch({
      type: actionTypes.UPDATE_SUPPLIER,
      payload: {
        id: supplierId,
        ...formData
      }
    });
    
    setEditingSupplier(null);
    resetForm();
    toast.success('Tedarikçi güncellendi');
  };

  const handleDelete = (supplierId) => {
    if (window.confirm('Bu tedarikçiyi silmek istediğinizden emin misiniz?')) {
      dispatch({
        type: actionTypes.DELETE_SUPPLIER,
        payload: { id: supplierId }
      });
      toast.success('Tedarikçi silindi');
    }
  };

  const handleCancel = () => {
    setEditingSupplier(null);
    resetForm();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Truck className="h-7 w-7 mr-3 text-blue-600" />
            Tedarikçiler
          </h2>
          <p className="text-gray-600 mt-1">
            Proje tedarikçilerini yönetin
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tedarikçi Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Tedarikçi Ekle</DialogTitle>
              <DialogDescription>
                Yeni bir tedarikçinin bilgilerini girin
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-name">Firma Adı*</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Tedarikçi adını girin"
                />
              </div>
              
              <div>
                <Label htmlFor="add-logo">Logo URL</Label>
                <Input
                  id="add-logo"
                  value={formData.logoUrl}
                  onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div>
                <Label htmlFor="add-desc">Kısa Tanım</Label>
                <Input
                  id="add-desc"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tedarikçi hakkında kısa açıklama"
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{supplier.name}</span>
                {editingSupplier !== supplier.id && (
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(supplier)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSupplier === supplier.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`name-${supplier.id}`}>Firma Adı</Label>
                    <Input
                      id={`name-${supplier.id}`}
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tedarikçi adını girin"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`logo-${supplier.id}`}>Logo URL</Label>
                    <Input
                      id={`logo-${supplier.id}`}
                      value={formData.logoUrl || ''}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`desc-${supplier.id}`}>Kısa Tanım</Label>
                    <Input
                      id={`desc-${supplier.id}`}
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Kısa açıklama"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleSave(supplier.id)}
                      size="sm"
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Kaydet
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      size="sm"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Logo */}
                  <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
                    {supplier.logoUrl ? (
                      <img
                        src={supplier.logoUrl}
                        alt={`${supplier.name} Logo`}
                        className="max-h-16 max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`flex items-center justify-center h-full text-gray-400 text-sm ${supplier.logoUrl ? 'hidden' : 'flex'}`}
                    >
                      Logo Yok
                    </div>
                  </div>
                  
                  {/* Bilgiler */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {supplier.description || 'Açıklama eklenmemiş'}
                    </p>
                  </div>
                  
                  {/* ID Badge */}
                  <div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      ID: {supplier.id}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {state.suppliers.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Truck className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz tedarikçi yok</h3>
            <p className="text-gray-600 text-center mb-6">
              Projenize ilk tedarikçiyi ekleyin
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              İlk Tedarikçiyi Ekle
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Bilgi Notu */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-200">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Tedarikçi Yönetimi</h4>
              <div className="mt-2 text-sm text-blue-800">
                <p>
                  Tedarikçiler İş Planı Diyagramında kullanılır. Eklediğiniz tedarikçiler 
                  otomatik olarak diyagram bileşenlerinde görünecektir.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersTab;