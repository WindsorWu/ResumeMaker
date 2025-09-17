import { Button } from '@/components/ui/button';
import type { ResumeSection } from '@/types/resume';

interface SectionPageAssignmentProps {
  section: ResumeSection;
  currentPage: number;
  onPageChange: (sectionId: string, pageNumber: number) => void;
}

export const SectionPageAssignment = ({
  section,
  currentPage,
  onPageChange,
}: SectionPageAssignmentProps) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{section.title}</span>
        {!section.visible && (
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">已隐藏</span>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={currentPage === 1 ? 'default' : 'outline'}
          onClick={() => onPageChange(section.id, 1)}
        >
          第 1 页
        </Button>
        <Button
          size="sm"
          variant={currentPage === 2 ? 'default' : 'outline'}
          onClick={() => onPageChange(section.id, 2)}
        >
          第 2 页
        </Button>
      </div>
    </div>
  );
};
