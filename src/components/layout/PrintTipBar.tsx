import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { usePrintScale } from '@/hooks/components/usePrintScale';
import { useBrowserDetection } from '@/hooks/useBrowserDetection';
import { CircleQuestionMark, FileJson, Printer } from 'lucide-react';

interface PrintTipBarProps {
  onPrint: () => void;
  onExportPdf: () => void;
}

export const PrintTipBar = ({ onPrint, onExportPdf }: PrintTipBarProps) => {
  const { getPrintTip } = useBrowserDetection();
  const { tip: printTip } = getPrintTip();
  const { scale, onScaleChange } = usePrintScale();

  return (
    <div className="bg-blue-600 text-white p-3 text-center print:hidden">
      <div className="flex items-center justify-between space-x-4 max-w-4xl px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-sm">缩放比例</span>
          <Tooltip>
            <TooltipTrigger>
              <CircleQuestionMark className="w-4 h-4 text-blue-200"></CircleQuestionMark>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                推荐把简历内容精简到一页纸，
                <br />
                通过修改缩放比例，可以控制简历内容的显示大小。
              </p>
            </TooltipContent>
          </Tooltip>
          <Slider
            defaultValue={[scale]}
            max={100}
            step={1}
            className="w-20"
            onValueChange={(value) => onScaleChange(value[0])}
          ></Slider>
          {scale}%
        </div>
        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={onPrint}
                variant="outline"
                size="sm"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Printer className="h-4 w-4 mr-2" />
                打印简历
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{printTip}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={onExportPdf}
                variant="outline"
                size="sm"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <FileJson className="h-4 w-4 mr-2" />
                导出JSON
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>导出JSON文件，可用于导入(头像会丢失)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
