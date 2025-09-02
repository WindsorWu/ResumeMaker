/**
 * 文本编辑器 - 简洁版本
 */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useTextEditor } from '@/hooks/components/useTextEditor';
import type { TextContent } from '@/types/resume';
import { IconSelector } from './IconSelector';

interface TextEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TextContent;
  onSave: (data: TextContent, iconName?: string) => void;
  title: string;
  currentIcon: string;
}

export const TextEditor = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  currentIcon,
}: TextEditorProps) => {
  const {
    content,
    selectedIcon,
    wordCount,
    lineCount,
    setContent,
    setSelectedIcon,
    handleSave,
    handleCancel,
  } = useTextEditor(isOpen, initialData, currentIcon, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑 {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 模块图标选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">模块图标</label>
            <IconSelector selectedIcon={selectedIcon} onIconSelect={setSelectedIcon} />
          </div>

          {/* 内容编辑 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">内容</label>
              <div className="text-xs text-gray-500">
                {wordCount} 字符 · {lineCount} 行
              </div>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入内容..."
              className="min-h-[300px] resize-none font-mono text-sm leading-relaxed"
              rows={15}
            />
          </div>

          {/* 使用提示 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-800 mb-2">💡 使用提示</h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• 适用于个人介绍、自我评价等大段文本内容</li>
              <li>• 支持多行文本，换行会在简历中保留</li>
              <li>• 可以编写详细的个人描述或专业总结</li>
              <li>• 文本将在简历中按原格式显示</li>
            </ul>
          </div>

          {/* 预览区域 */}
          {content.trim() && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">预览</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {content}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
