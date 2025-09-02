/**
 * 头像上传业务逻辑 Hook
 */
import { useState } from 'react';

export const useAvatarUpload = (
  currentAvatar?: string,
  onAvatarChange?: (avatar: string) => void
) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentAvatar);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [showCropper, setShowCropper] = useState(false);

  const handleFileSelect = (file: File) => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return false;
    }

    // 检查文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImageUrl(result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    return true;
  };

  const handleCropSave = (croppedImageUrl: string) => {
    setPreviewUrl(croppedImageUrl);
    onAvatarChange?.(croppedImageUrl);
    setShowCropper(false);
  };

  const handleCropExisting = () => {
    if (previewUrl) {
      setOriginalImageUrl(previewUrl);
      setShowCropper(true);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onAvatarChange?.('');
  };

  return {
    previewUrl,
    originalImageUrl,
    showCropper,
    handleFileSelect,
    handleCropSave,
    handleCropExisting,
    handleRemove,
    setShowCropper,
  };
};
