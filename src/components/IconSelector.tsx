import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { availableIcons } from '@/config/icons'

interface IconSelectorProps {
  selectedIcon: string
  onIconSelect: (iconName: string) => void
}

export const IconSelector = ({ selectedIcon, onIconSelect }: IconSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = availableIcons.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="搜索图标..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
        {filteredIcons.map((iconOption) => {
          const IconComponent = iconOption.icon
          return (
            <Button
              key={iconOption.name}
              variant={selectedIcon === iconOption.name ? "default" : "outline"}
              size="icon"
              onClick={() => onIconSelect(iconOption.name)}
              className="h-12 w-12"
            >
              <IconComponent className="h-6 w-6" />
            </Button>
          )
        })}
      </div>
      
      {filteredIcons.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          没有找到匹配的图标
        </p>
      )}
    </div>
  )
} 