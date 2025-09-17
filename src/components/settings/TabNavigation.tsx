import { Button } from '@/components/ui/button';
import { FileText, List } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'modules' | 'pages';
  onTabChange: (tab: 'modules' | 'pages') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    {
      id: 'modules' as const,
      label: '模块管理',
      icon: List,
    },
    {
      id: 'pages' as const,
      label: '多页设置',
      icon: FileText,
    },
  ];

  return (
    <div className="flex border-b">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            variant="ghost"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 rounded-none h-auto transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};
