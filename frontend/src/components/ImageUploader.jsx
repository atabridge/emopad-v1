import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Upload, Image, X } from 'lucide-react';
import { mockImages } from '../mock';

const ImageUploader = ({ type, id, label }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target.result);
          
          // Store in mock data
          if (type === 'equipment') {
            mockImages.equipment[id] = e.target.result;
          } else {
            mockImages[type] = e.target.result;
          }
          
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (type === 'equipment') {
      delete mockImages.equipment[id];
    } else {
      mockImages[type] = null;
    }
  };

  const currentImage = uploadedImage || 
    (type === 'equipment' ? mockImages.equipment[id] : mockImages[type]);

  return (
    <Card className="w-full h-48 relative overflow-hidden border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors">
      <CardContent className="p-0 h-full">
        {currentImage ? (
          <div className="relative h-full">
            <img 
              src={currentImage} 
              alt={label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="opacity-0 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4 mr-1" />
                Kaldır
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-3 p-4">
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Yükleniyor...</p>
              </div>
            ) : (
              <>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Image className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
                  <p className="text-xs text-gray-500 mb-3">Görsel eklemek için tıklayın</p>
                  <label htmlFor={`upload-${type}-${id}`}>
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Görsel Ekle
                      </span>
                    </Button>
                  </label>
                  <input
                    id={`upload-${type}-${id}`}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;