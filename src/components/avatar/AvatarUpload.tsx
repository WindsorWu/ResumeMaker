/**
 * 头像上传组件
 */
import { Button } from '@/components/ui/button';
import { useAvatarUpload } from '@/hooks/components/useAvatarUpload';
import { Crop } from 'lucide-react';
import { AvatarDisplay } from './AvatarDisplay';
import { FileUploadButton } from './FileUploadButton';
import { AvatarCropper } from './AvatarCropper';

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
        <AvatarDisplay src={previewUrl} alt="头像预览" size="lg" />
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

      {showCropper && originalImageUrl && (
        <AvatarCropper
          isOpen={showCropper}
          onClose={() => setShowCropper(false)}
          imageSrc={originalImageUrl}
          onCropComplete={handleCropSave}
        />
      )}
    </div>
  );
};
