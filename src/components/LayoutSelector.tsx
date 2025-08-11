import { LayoutGrid, Columns2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LayoutSelectorProps {
  currentLayout: 'side-by-side' | 'top-bottom'
  onLayoutChange: (layout: 'side-by-side' | 'top-bottom') => void
}

export const LayoutSelector = ({ currentLayout, onLayoutChange }: LayoutSelectorProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <Button
        onClick={() => onLayoutChange('side-by-side')}
        size="sm"
        className={`flex items-center space-x-2 px-3 py-1.5 text-xs transition-all ${
          currentLayout === 'side-by-side' 
            ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
            : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`}
      >
        <Columns2 className="h-3 w-3" />
        <span className="hidden sm:inline">左右布局</span>
      </Button>
      <Button
        onClick={() => onLayoutChange('top-bottom')}
        size="sm"
        className={`flex items-center space-x-2 px-3 py-1.5 text-xs transition-all ${
          currentLayout === 'top-bottom' 
            ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
            : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`}
      >
        <LayoutGrid className="h-3 w-3" />
        <span className="hidden sm:inline">上下布局</span>
      </Button>
    </div>
  )
} 