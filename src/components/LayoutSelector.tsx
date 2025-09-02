import { LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LayoutSelectorProps {
  onLayoutChange: (layout: 'side-by-side' | 'top-bottom') => void
}

export const LayoutSelector = ({ onLayoutChange }: LayoutSelectorProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <Button
        onClick={() => onLayoutChange('top-bottom')}
        size="sm"
        className="flex items-center space-x-2 px-3 py-1.5 text-xs transition-all bg-blue-600 text-white shadow-sm hover:bg-blue-700"
      >
        <LayoutGrid className="h-3 w-3" />
        <span className="hidden sm:inline">简约布局</span>
      </Button>
    </div>
  )
} 