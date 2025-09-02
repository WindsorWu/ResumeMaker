/**
 * 可复用的信息项显示组件
 */
import type { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const InfoItem = ({ icon: Icon, children, className = '' }: InfoItemProps) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Icon className="h-4 w-4 print:h-3 print:w-3" />
      <span>{children}</span>
    </div>
  );
};
