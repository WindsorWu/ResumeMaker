/**
 * 头像裁剪组件
 */
import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import 'react-image-crop/dist/ReactCrop.css'

interface AvatarCropperProps {
  isOpen: boolean
  onClose: () => void
  onSave: (croppedImageUrl: string) => void
  imageUrl: string
}

// 辅助函数：将canvas转换为blob
function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!)
    }, 'image/jpeg', 0.9)
  })
}

// 辅助函数：获取裁剪后的图片
async function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<string> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  canvas.width = crop.width * scaleX
  canvas.height = crop.height * scaleY

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  )

  const blob = await canvasToBlob(canvas)
  return URL.createObjectURL(blob)
}

export const AvatarCropper = ({ isOpen, onClose, onSave, imageUrl }: AvatarCropperProps) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    
    // 创建一个居中的正方形裁剪区域
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        3 / 4, // 3:4的比例，类似证件照
        width,
        height
      ),
      width,
      height
    )
    
    setCrop(crop)
    setCompletedCrop(crop)
  }, [])

  const handleSave = async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop)
        onSave(croppedImageUrl)
        onClose()
      } catch (error) {
        console.error('Failed to crop image:', error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>裁剪头像</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center p-4">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
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
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!completedCrop}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 