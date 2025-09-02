/**
 * 头像上传组件 - 简洁版本
 */
import { Button } from '@/components/ui/button';
import { useAvatarUpload } from '@/hooks/components/useAvatarUpload';
import { Camera, Crop, User } from 'lucide-react';
import { AvatarCropper } from './AvatarCropper';
import { FileUploadButton } from './FileUploadButton';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatar: string) => void;
}

export const AvatarUpload = ({ currentAvatar, onAvatarChange }: AvatarUploadProps) => {
  const {
    previewUrl,
    originalImageUrl,
    showCropper,
    handleFileSelect,
    handleCropSave,
    handleCropExisting,
    handleRemove,
    setShowCropper,
  } = useAvatarUpload(currentAvatar, onAvatarChange);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 头像预览区域 */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all duration-200">
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

      {/* 操作按钮 */}
      <div className="flex space-x-2">
        <FileUploadButton onFileSelect={(file) => handleFileSelect(file)}>
          {previewUrl ? '更换头像' : '选择头像'}
        </FileUploadButton>

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

      {/* 提示信息 */}
      <p className="text-xs text-gray-500 text-center">支持 JPG、PNG 格式 上传后可裁剪调整</p>

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
