import type { ResumeSection } from '@/types/resume';

interface PagePreviewBoxProps {
  pageNumber: number;
  sections: ResumeSection[];
  sectionCount: number;
  localPageAssignments: Record<string, number>;
}

/**
 * 预览哪些模块在第几页
 */
export const PagePreviewBox = ({
  pageNumber,
  sections,
  sectionCount,
  localPageAssignments,
}: PagePreviewBoxProps) => {
  const sectionsInPage = sections.filter(
    (section) => localPageAssignments[section.id] === pageNumber
  );

  return (
    <div className="p-3 border rounded-lg">
      <div className="text-sm font-medium text-gray-700 mb-2">
        第 {pageNumber} 页 ({sectionCount} 个模块)
      </div>

      {pageNumber === 1 && <div className="text-xs text-gray-500 mb-2">基本信息（固定）</div>}

      {sectionsInPage.map((section) => (
        <div key={section.id} className="text-xs text-gray-600 py-1">
          • {section.title}
        </div>
      ))}

      {sectionCount === 0 && pageNumber === 2 && (
        <div className="text-xs text-gray-400 italic">暂无模块</div>
      )}
    </div>
  );
};
