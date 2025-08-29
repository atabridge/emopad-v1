import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import { imagesAPI, handleAPIError } from '../services/api';
import { toast } from 'sonner';

const ImageUploader = ({ type, id, label, existingImageId }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageId, setImageId] = useState(existingImageId);

  useEffect(() => {
    if (existingImageId) {
      setImageId(existingImageId);
      setUploadedImage(imagesAPI.getImageUrl(existingImageId));
    }
  }, [existingImageId]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen geçerli bir resim dosyası seçin');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    setIsUploading(true);
    
    try {
      const itemId = type === 'equipment' ? id : null;
      const response = await imagesAPI.uploadImage(file, type, itemId);
      
      if (response.success) {
        setImageId(response.imageId);
        setUploadedImage(response.imageUrl);
        toast.success('Görsel başarıyla yüklendi');
      }
    } catch (error) {
      const errorInfo = handleAPIError(error);
      toast.error(`Yükleme hatası: ${errorInfo.message}`);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async () => {
    if (!imageId) return;

    try {
      await imagesAPI.deleteImage(imageId);
      setUploadedImage(null);
      setImageId(null);
      toast.success('Görsel başarıyla silindi');
    } catch (error) {
      const errorInfo = handleAPIError(error);
      toast.error(`Silme hatası: ${errorInfo.message}`);
      console.error('Delete error:', error);
    }
  };

  const currentImageUrl = uploadedImage || (imageId ? imagesAPI.getImageUrl(imageId) : null);

  return (
    <Card className="w-full h-48 relative overflow-hidden border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors">
      <CardContent className="p-0 h-full">
        {currentImageUrl ? (
          <div className="relative h-full">
            <img 
              src={currentImageUrl} 
              alt={label}
              className="w-full h-full object-cover"
              onError={() => {
                setUploadedImage(null);
                setImageId(null);
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="opacity-0 hover:opacity-100 transition-opacity"
                disabled={isUploading}
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
                <Loader2 className="animate-spin h-8 w-8 text-orange-500 mx-auto mb-2" />
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