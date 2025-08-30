import React, { useState } from 'react';
import { useBusinessPlan } from '../../context/BusinessPlanContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Users, Save } from 'lucide-react';
import { toast } from 'sonner';

const ActorsTab = () => {
  const { state, dispatch, actionTypes } = useBusinessPlan();
  const [editingActor, setEditingActor] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (actor) => {
    setEditingActor(actor.id);
    setFormData({
      name: actor.name,
      logoUrl: actor.logoUrl,
      description: actor.description
    });
  };

  const handleSave = (actorId) => {
    dispatch({
      type: actionTypes.UPDATE_ACTOR,
      payload: {
        id: actorId,
        ...formData
      }
    });
    
    setEditingActor(null);
    setFormData({});
    toast.success('Aktör bilgileri güncellendi');
  };

  const handleCancel = () => {
    setEditingActor(null);
    setFormData({});
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
            <Users className="h-7 w-7 mr-3 text-orange-600" />
            Aktörler
          </h2>
          <p className="text-gray-600 mt-1">
            Proje aktörlerinin bilgilerini düzenleyin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.actors.map((actor) => (
          <Card key={actor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{actor.name}</span>
                {editingActor !== actor.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(actor)}
                  >
                    Düzenle
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingActor === actor.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`name-${actor.id}`}>Firma Adı</Label>
                    <Input
                      id={`name-${actor.id}`}
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Firma adını girin"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`logo-${actor.id}`}>Logo URL</Label>
                    <Input
                      id={`logo-${actor.id}`}
                      value={formData.logoUrl || ''}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`desc-${actor.id}`}>Kısa Tanım</Label>
                    <Input
                      id={`desc-${actor.id}`}
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Kısa açıklama"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleSave(actor.id)}
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
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Logo */}
                  <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
                    {actor.logoUrl ? (
                      <img
                        src={actor.logoUrl}
                        alt={`${actor.name} Logo`}
                        className="max-h-16 max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`flex items-center justify-center h-full text-gray-400 text-sm ${actor.logoUrl ? 'hidden' : 'flex'}`}
                    >
                      Logo Yok
                    </div>
                  </div>
                  
                  {/* Bilgiler */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{actor.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{actor.description}</p>
                  </div>
                  
                  {/* Rol Badge */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      actor.id === 'atabridge' ? 'bg-orange-100 text-orange-800' :
                      actor.id === 'ertug' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {actor.id === 'atabridge' ? 'Tedarik & Danışmanlık' :
                       actor.id === 'ertug' ? 'Montaj & Üretim' :
                       'Satış & Swap Operasyonu'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bilgi Notu */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-200">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Aktör Rolleri</h4>
              <div className="mt-2 text-sm text-blue-800">
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>AtaBridge:</strong> Çin'de tedarikçi araştırması ve danışmanlık hizmetleri</li>
                  <li><strong>Ertuğ:</strong> E-moped montajı ve üretim operasyonları</li>
                  <li><strong>Fiyuu:</strong> E-moped satışları ve batarya swap istasyon işletmeciliği</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActorsTab;