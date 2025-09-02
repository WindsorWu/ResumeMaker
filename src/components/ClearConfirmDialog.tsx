import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface ClearConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearConfirmDialog = ({ isOpen, onClose, onConfirm }: ClearConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            <span>确认清空简历</span>
          </DialogTitle>
          <DialogDescription>此操作将永久删除所有简历内容，请谨慎操作。</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 mb-4">
            确定要清空所有简历内容吗？此操作将删除所有已保存的数据，包括：
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• 基本信息（包括头像）</li>
            <li>• 教育经历</li>
            <li>• 工作经历</li>
            <li>• 项目经历</li>
            <li>• 其他所有自定义内容</li>
          </ul>
          <p className="text-red-600 text-sm mt-4 font-medium">⚠️ 此操作无法撤销，请谨慎操作！</p>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="min-w-[80px]">
            取消
          </Button>
          <Button onClick={onConfirm} className="min-w-[80px] bg-red-600 hover:bg-red-700">
            确认清空
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
