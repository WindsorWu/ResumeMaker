import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { IconSelector } from './IconSelector'
import { getIconByName } from '@/config/icons'
import type { TimelineItem } from '@/types/resume'

interface TimelineEditorProps {
  isOpen: boolean
  onClose: () => void
  initialData: TimelineItem[]
  onSave: (data: TimelineItem[], iconName?: string) => void
  title: string
  currentIcon?: string
}

export const TimelineEditor = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  title,
  currentIcon = 'briefcase'
}: TimelineEditorProps) => {
  const [items, setItems] = useState<TimelineItem[]>(initialData)
  const [selectedIcon, setSelectedIcon] = useState(currentIcon)
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false)

  const addItem = () => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      secondarySubtitle: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof TimelineItem, value: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleSave = () => {
    onSave(items, selectedIcon)
    onClose()
  }

  const IconComponent = getIconByName(selectedIcon)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
            </div>
            <span>编辑{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 图标选择区域 - 可折叠 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between hover:bg-blue-100/50 transition-colors rounded-lg"
              onClick={() => setIsIconSelectorOpen(!isIconSelectorOpen)}
            >
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md">
                  {IconComponent && <IconComponent className="h-4 w-4 text-white" />}
                </div>
                <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                  模块图标 (当前: {selectedIcon})
                </Label>
              </div>
              {isIconSelectorOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
            
            {isIconSelectorOpen && (
              <div className="px-4 pb-4 border-t border-blue-200/50 mt-2 pt-4">
                <IconSelector
                  selectedIcon={selectedIcon}
                  onIconSelect={setSelectedIcon}
                />
              </div>
            )}
          </div>

          {/* 时间线项目列表 */}
          {items.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">第 {index + 1} 项</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    标题 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                    placeholder="例：软件工程师"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">副标题</Label>
                  <Input
                    value={item.subtitle || ''}
                    onChange={(e) => updateItem(item.id, 'subtitle', e.target.value)}
                    placeholder="例：职位、专业"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">开始时间</Label>
                  <Input
                    value={item.startDate || ''}
                    onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                    placeholder="例：2020年9月"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">结束时间</Label>
                  <Input
                    value={item.endDate || ''}
                    onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                    placeholder="例：2024年6月"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">次要副标题</Label>
                  <Input
                    value={item.secondarySubtitle || ''}
                    onChange={(e) => updateItem(item.id, 'secondarySubtitle', e.target.value)}
                    placeholder="例：公司名称、学校名称"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">详细描述</Label>
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="详细描述工作内容、学习经历或项目经验..."
                  rows={4}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
          
          <Button onClick={addItem} variant="outline" className="w-full border-dashed border-2 hover:bg-blue-50">
            <Plus className="h-4 w-4 mr-2" />
            添加一项
          </Button>
        </div>
        
        <DialogFooter className="flex space-x-2 pt-6">
          <Button variant="outline" onClick={onClose} className="min-w-[80px]">
            取消
          </Button>
          <Button onClick={handleSave} className="min-w-[80px] bg-blue-600 hover:bg-blue-700">
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 