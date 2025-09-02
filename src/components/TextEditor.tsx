/**
 * 纯文本编辑器组件 - 用于编辑大段文本内容
 */
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { IconSelector } from './IconSelector'
import type { TextContent } from '@/types/resume'

interface TextEditorProps {
  isOpen: boolean
  onClose: () => void
  initialData: TextContent
  onSave: (data: TextContent, iconName?: string) => void
  title: string
  currentIcon: string
}

export const TextEditor = ({ 
  isOpen, 
  onClose, 
  initialData, 
  onSave, 
  title, 
  currentIcon 
}: TextEditorProps) => {
  const [content, setContent] = useState(initialData.content)
  const [selectedIcon, setSelectedIcon] = useState(currentIcon)

  const handleSave = () => {
    onSave({ content: content.trim() }, selectedIcon)
    onClose()
  }

  const handleCancel = () => {
    setContent(initialData.content)
    setSelectedIcon(currentIcon)
    onClose()
  }

  const wordCount = content.trim().length
  const lineCount = content.split('\n').length

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑 {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 图标选择 */}
          <div>
            <label className="block text-sm font-medium mb-2">模块图标</label>
            <IconSelector 
              selectedIcon={selectedIcon}
              onIconSelect={setSelectedIcon}
            />
          </div>

          {/* 文本编辑区域 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">内容</label>
              <div className="text-xs text-gray-500">
                {wordCount} 字符 · {lineCount} 行
              </div>
            </div>
            
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入内容..."
              className="min-h-[300px] resize-none font-mono text-sm leading-relaxed"
            />
          </div>

          {/* 使用提示 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-900 mb-2">📝 使用提示</h4>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• 适合编辑大段连续的文本内容</li>
              <li>• 支持换行，会在显示时保留格式</li>
              <li>• 可以用于个人简介、项目描述等内容</li>
              <li>• 建议使用简洁明了的语言表达</li>
            </ul>
          </div>

          {/* 预览区域 */}
          {content.trim() && (
            <div>
              <label className="block text-sm font-medium mb-2">预览</label>
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
          <Button onClick={handleSave}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 