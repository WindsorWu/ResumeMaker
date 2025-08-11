import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { ResumeDisplay } from '@/components/ResumeDisplay'
import { AppHeader } from '@/components/AppHeader'
import { LayoutSelector } from '@/components/LayoutSelector'
import { ActionButtons } from '@/components/ActionButtons'
import { AppFooter } from '@/components/AppFooter'
import { ClearConfirmDialog } from '@/components/ClearConfirmDialog'
import { resumeAtom, resetResumeAtom } from '@/store/resumeStore'

export const MainPageContainer = () => {
  const [resume, setResume] = useAtom(resumeAtom)
  const resetResume = useSetAtom(resetResumeAtom)
  const [showClearDialog, setShowClearDialog] = useState(false)

  const handlePreview = () => {
    window.open('/preview', '_blank')
  }

  const handleClear = () => {
    resetResume()
    setShowClearDialog(false)
  }

  const handleLayoutChange = (layout: 'side-by-side' | 'top-bottom') => {
    setResume({ ...resume, layout })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <AppHeader>
        <LayoutSelector 
          currentLayout={resume.layout}
          onLayoutChange={handleLayoutChange}
        />
        <ActionButtons 
          onPreview={handlePreview}
          onClear={() => setShowClearDialog(true)}
        />
      </AppHeader>
      
      <main className="max-w-6xl mx-auto p-4">
        <ResumeDisplay 
          resume={resume} 
          onUpdateResume={setResume}
          isEditable={true}
          className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
        />
      </main>
      
      <ClearConfirmDialog 
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClear}
      />
      
      <AppFooter />
    </div>
  )
} 