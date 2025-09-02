import { useState, useRef } from 'react';
import { Camera, User, Crop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AvatarCropper } from './AvatarCropper';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatar: string) => void;
}

export const AvatarUpload = ({ currentAvatar, onAvatarChange }: AvatarUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentAvatar);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      // 检查文件大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setOriginalImageUrl(result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = (croppedImageUrl: string) => {
    setPreviewUrl(croppedImageUrl);
    onAvatarChange(croppedImageUrl);
    setShowCropper(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropExisting = () => {
    if (previewUrl) {
      setOriginalImageUrl(previewUrl);
      setShowCropper(true);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onAvatarChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-200 group"
          onClick={handleClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="头像预览"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="h-16 w-16 text-gray-400 group-hover:text-gray-600 transition-colors" />
          )}
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleClick} size="sm" variant="outline">
          {previewUrl ? '更换头像' : '上传头像'}
        </Button>
        {previewUrl && (
          <>
            <Button onClick={handleCropExisting} size="sm" variant="outline">
              <Crop className="h-3 w-3 mr-1" />
              裁剪
            </Button>
            <Button onClick={handleRemove} size="sm" variant="outline">
              移除头像
            </Button>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-500 text-center">
        支持 JPG、PNG 格式
        <br />
        文件大小不超过 5MB
        <br />
        上传后可裁剪调整
      </p>

      {/* 裁剪器 */}
      {showCropper && originalImageUrl && (
        <AvatarCropper
          isOpen={showCropper}
          onClose={() => setShowCropper(false)}
          onSave={handleCropSave}
          imageUrl={originalImageUrl}
        />
      )}
    </div>
  );
};
