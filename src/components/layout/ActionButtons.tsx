import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useJson } from '@/hooks/useJson';
import { Eye, FileJson, Settings, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onPreview: () => void;
  onClear: () => void;
  onManageTimeline: () => void;
}

export const ActionButtons = ({ onPreview, onClear, onManageTimeline }: ActionButtonsProps) => {
  const { handleImportJson } = useJson();
  return (
    <>
      <Button
        onClick={onManageTimeline}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">管理模块</span>
      </Button>

      <Button
        onClick={onPreview}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Eye className="h-4 w-4" />
        <span className="hidden sm:inline">预览导出</span>
      </Button>

      {/* input type=file */}
      <input
        type="file"
        id="import-json-input"
        accept="application/json"
        onChange={(e) => {
          handleImportJson(e.target?.files?.[0] as File);
        }}
        className="hidden"
      />
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="outline"
            onClick={() => {
              const input = document.getElementById('import-json-input');
              if (input) {
                (input as HTMLInputElement).click();
              }
            }}
          >
            <FileJson className="h-4 w-4" />
            <span className="hidden sm:inline">导入JSON</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>仅支持本工具导出的JSON文件，导入后会覆盖当前简历</p>
        </TooltipContent>
      </Tooltip>

      <Button
        onClick={onClear}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        <span className="hidden sm:inline">清空</span>
      </Button>

      <div className="hidden lg:block text-xs text-gray-500">💡 点击模块右上角编辑按钮修改内容</div>
    </>
  );
};
