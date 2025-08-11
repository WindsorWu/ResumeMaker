import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBrowserDetection } from '@/hooks/useBrowserDetection'

interface PrintTipBarProps {
  onPrint: () => void
}

export const PrintTipBar = ({ onPrint }: PrintTipBarProps) => {
  const { getPrintTip } = useBrowserDetection()
  const { tip, shortcut } = getPrintTip()

  return (
    <div className="bg-blue-600 text-white p-3 text-center print:hidden">
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm">
          {tip}
          {shortcut && <span className="ml-2 text-blue-200">({shortcut})</span>}
        </span>
        <Button 
          onClick={onPrint}
          variant="outline"
          size="sm"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          <Printer className="h-4 w-4 mr-2" />
          打印简历
        </Button>
      </div>
    </div>
  )
} 