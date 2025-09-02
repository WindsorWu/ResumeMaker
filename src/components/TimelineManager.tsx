import { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  GripVertical, 
  Settings,
  Edit3,
  Check,
  X,
  Clock,
  List,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
// import { Select } from '@/components/ui/select'
import { IconSelector } from './IconSelector'
import { getIconByName } from '@/config/icons'
import type { ResumeSection, TimelineItem, ListItem, TextContent } from '@/types/resume'

interface SectionManagerProps {
  isOpen: boolean
  onClose: () => void
  sections: ResumeSection[]
  onUpdateSections: (sections: ResumeSection[]) => void
}

export const SectionManager = ({
  isOpen,
  onClose,
  sections,
  onUpdateSections
}: SectionManagerProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [showIconSelector, setShowIconSelector] = useState<string | null>(null)

  // 只显示非basic类型的sections，按order排序
  const managedSections = sections
    .filter(section => section.type !== 'basic')
    .sort((a, b) => a.order - b.order)

  // 编辑器类型选项
  const editorTypeOptions = [
    { 
      value: 'timeline', 
      label: '时间线编辑器',
      icon: Clock
    },
    { 
      value: 'list', 
      label: '列表编辑器',
      icon: List
    },
    { 
      value: 'text', 
      label: '纯文本编辑器',
      icon: FileText
    }
  ]

  // 获取模块的编辑器类型
  const getEditorType = (section: ResumeSection): 'timeline' | 'list' | 'text' => {
    return section.editorType || 'timeline'
  }

  // 转换数据结构
  const convertDataForEditorType = (
    currentData: TimelineItem[] | ListItem[] | TextContent, 
    currentType: string, 
    newType: string
  ): TimelineItem[] | ListItem[] | TextContent => {
    if (currentType === newType) {
      return currentData
    }

    if (newType === 'timeline') {
      if (currentType === 'list') {
        // 列表转时间线
        return (currentData as ListItem[]).map((item) => ({
          id: item.id,
          title: item.content,
          subtitle: '',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: ''
        }))
      } else if (currentType === 'text') {
        // 文本转时间线
        return [{
          id: '1',
          title: (currentData as TextContent).content,
          subtitle: '',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: ''
        }]
      }
    } else if (newType === 'list') {
      if (currentType === 'timeline') {
        // 时间线转列表
        return (currentData as TimelineItem[]).map(item => ({
          id: item.id,
          content: item.title || item.description || ''
        }))
      } else if (currentType === 'text') {
        // 文本转列表
        const content = (currentData as TextContent).content
        const lines = content.split('\n').filter(line => line.trim())
        return lines.map((line, index) => ({
          id: (index + 1).toString(),
          content: line.trim()
        }))
      }
    } else if (newType === 'text') {
      if (currentType === 'timeline') {
        // 时间线转文本
        const items = currentData as TimelineItem[]
        const text = items.map(item => 
          [item.title, item.description].filter(Boolean).join('\n')
        ).join('\n\n')
        return { content: text }
      } else if (currentType === 'list') {
        // 列表转文本
        const items = currentData as ListItem[]
        const text = items.map(item => item.content).join('\n')
        return { content: text }
      }
    }

    return currentData
  }

  // 更新模块的编辑器类型
  const updateEditorType = (sectionId: string, newEditorType: 'timeline' | 'list' | 'text') => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return

    const currentEditorType = getEditorType(section)
    const convertedData = convertDataForEditorType(section.data as TimelineItem[] | ListItem[] | TextContent, currentEditorType, newEditorType)

    const updatedSections = sections.map(s =>
      s.id === sectionId
        ? { 
            ...s, 
            editorType: newEditorType,
            type: newEditorType as ResumeSection['type'],
            data: convertedData
          }
        : s
    )
    onUpdateSections(updatedSections)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newSections = [...managedSections]
    const draggedSection = newSections[draggedIndex]
    
    // 移除被拖拽的元素并插入到新位置
    newSections.splice(draggedIndex, 1)
    newSections.splice(dropIndex, 0, draggedSection)
    
    // 重新分配order
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 2 // 基本信息的order是1，所以timeline从2开始
    }))
    
    // 更新完整的sections数组
    const allSections = sections.map(section => {
      if (section.type === 'timeline') {
        const updatedSection = updatedSections.find(s => s.id === section.id)
        return updatedSection || section
      }
      return section
    })
    
    onUpdateSections(allSections)
    setDraggedIndex(null)
  }

  const toggleVisibility = (sectionId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    )
    onUpdateSections(updatedSections)
  }

  const deleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(section => section.id !== sectionId)
    onUpdateSections(updatedSections)
  }

  const addCustomSection = () => {
    const newOrder = Math.max(...managedSections.map(s => s.order), 1) + 1
    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      title: '自定义模块',
      icon: 'star',
      iconName: 'star',
      type: 'timeline',
      visible: true,
      order: newOrder,
      data: []
    }
    
    onUpdateSections([...sections, newSection])
  }

  const startEditing = (section: ResumeSection) => {
    setEditingId(section.id)
    setEditingTitle(section.title)
  }

  const saveEditing = () => {
    if (!editingId || !editingTitle.trim()) return
    
    const updatedSections = sections.map(section =>
      section.id === editingId
        ? { ...section, title: editingTitle.trim() }
        : section
    )
    onUpdateSections(updatedSections)
    setEditingId(null)
    setEditingTitle('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingTitle('')
  }

  const updateSectionIcon = (sectionId: string, iconName: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, iconName, icon: iconName }
        : section
    )
    onUpdateSections(updatedSections)
    setShowIconSelector(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span>Timeline 模块管理</span>
          </DialogTitle>
          <DialogDescription>
            管理您的简历模块：调整显示顺序、自定义标题、添加或删除模块。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 现有模块列表 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              现有模块 ({managedSections.length})
            </Label>
            
            {managedSections.map((section, index) => {
              const IconComponent = getIconByName(section.iconName)
              const isEditing = editingId === section.id
              
              return (
                <div
                  key={section.id}
                  className={`bg-white border rounded-lg p-4 transition-all duration-200 ${
                    draggedIndex === index ? 'opacity-50' : 'hover:shadow-md'
                  }`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="flex items-center space-x-3">
                    {/* 拖拽手柄 */}
                    <div className="cursor-move text-gray-400 hover:text-gray-600">
                      <GripVertical className="h-4 w-4" />
                    </div>

                    {/* 图标 */}
                    <div 
                      className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setShowIconSelector(showIconSelector === section.id ? null : section.id)}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4 text-white" />}
                    </div>

                    {/* 标题编辑 */}
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="text-sm h-8"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEditing()
                              if (e.key === 'Escape') cancelEditing()
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={saveEditing}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEditing}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-800">
                              {section.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({(section.data as TimelineItem[]).length} 项)
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {/* 编辑标题 */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(section)}
                              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>

                                                          {/* 编辑器类型选择 */}
                              <select 
                                onChange={(e) => updateEditorType(section.id, e.target.value as 'timeline' | 'list' | 'text')} 
                                value={getEditorType(section)}
                                className="h-8 w-24 text-xs rounded border border-gray-300 bg-white px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {editorTypeOptions.map(type => (
                                  <option key={type.value} value={type.value}>
                                    {type.label}
                                  </option>
                                ))}
                              </select>

                            {/* 显示/隐藏切换 */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleVisibility(section.id)}
                              className={`h-8 w-8 p-0 ${
                                section.visible 
                                  ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
                                  : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {section.visible ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </Button>

                            {/* 删除按钮 */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteSection(section.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 图标选择器 */}
                  {showIconSelector === section.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <IconSelector
                        selectedIcon={section.iconName}
                        onIconSelect={(iconName) => updateSectionIcon(section.id, iconName)}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 添加新模块按钮 */}
          <Button
            onClick={addCustomSection}
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-blue-50 hover:border-blue-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加自定义模块
          </Button>

          {/* 提示信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              💡 提示：拖拽模块可以调整显示顺序，点击眼睛图标可以控制显示/隐藏，点击图标可以更换模块图标。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 