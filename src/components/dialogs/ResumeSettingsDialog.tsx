import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePageSettings } from '@/hooks/components/usePageSettings';
import { Settings as SettingsIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModuleManagementTab } from '../settings/ModuleManagementTab';
import { PageSettingsTab } from '../settings/PageSettingsTab';
import { TabNavigation } from '../settings/TabNavigation';

interface ResumeSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeSettingsDialog = ({ isOpen, onClose }: ResumeSettingsDialogProps) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'pages'>('modules');

  // 在顶层管理页面设置状态
  const pageSettings = usePageSettings();

  // 处理对话框关闭
  const handleClose = () => {
    pageSettings.applyPageAssignments(); // 应用页面设置更改
    onClose();
  };

  useEffect(() => {
    pageSettings.applyPageAssignments();
  }, [activeTab]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <span>简历设置</span>
          </DialogTitle>
          <DialogDescription>
            管理简历的模块和页面设置，拖拽调整顺序，关闭时自动保存所有更改。
          </DialogDescription>
        </DialogHeader>

        {/* 标签页导航 */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 标签页内容 */}
        <div className="space-y-6 flex-1 overflow-y-auto">
          {activeTab === 'modules' && <ModuleManagementTab />}
          {activeTab === 'pages' && <PageSettingsTab pageSettings={pageSettings} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
