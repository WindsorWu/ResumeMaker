/**
 * 头像裁剪组件 - 简洁版本
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAvatarCropper } from '@/hooks/components/useAvatarCropper';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface AvatarCropperProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (croppedImageUrl: string) => void;
  imageUrl: string;
}

export const AvatarCropper = ({ isOpen, onClose, onSave, imageUrl }: AvatarCropperProps) => {
  const {
    crop,
    completedCrop,
    imgRef,
    onImageLoad,
    onCropChange,
    onCropComplete,
    handleSave,
    handleCancel,
  } = useAvatarCropper(isOpen, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>裁剪头像</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center p-4">
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
            aspect={3 / 4} // 3:4比例
            className="max-w-full max-h-96"
          >
            <img
              ref={imgRef}
              alt="裁剪预览"
              src={imageUrl}
              style={{ maxWidth: '100%', maxHeight: '400px' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!completedCrop}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
