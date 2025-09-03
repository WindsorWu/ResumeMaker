/**
 * 可复用的列表项组件
 */
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ListItem as ListItemType } from '@/types/resume';
import { GripVertical, Trash2 } from 'lucide-react';

interface ListEditorItemProps {
  item: ListItemType;
  index: number;
  onUpdate: (id: string, content: string) => void;
  onRemove: (id: string) => void;
}

export const ListEditorItem = ({ item, index, onUpdate, onRemove }: ListEditorItemProps) => {
  return (
    <div className="flex items-start space-x-2 group">
      {/* 拖拽手柄和序号 */}
      <div className="flex flex-col items-center mt-2">
        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
        <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
      </div>

      {/* 内容输入框 */}
      <div className="flex-1">
        <Textarea
          value={item.content}
          onChange={(e) => onUpdate(item.id, e.target.value)}
          placeholder={`请输入第 ${index + 1} 项内容...`}
          className="min-h-[80px] resize-none"
          rows={3}
        />
      </div>

      {/* 删除按钮 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onRemove(item.id)}
        className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
