import { resumeAtom } from '@/store/resumeStore';
import type { ResumeSection } from '@/types/resume';
import { useAtom } from 'jotai';

export const useJson = () => {
  const [resume, setResume] = useAtom(resumeAtom);

  const handleExportJson = () => {
    const _resume = JSON.parse(JSON.stringify(resume));
    const basicInfo = _resume.sections.find(
      (section: ResumeSection) => section.id === 'basic-info'
    );
    if (basicInfo) {
      // 避免头像base64过长
      basicInfo.data.avatar = '';
    }
    const resumeJson = JSON.stringify(_resume);
    const blob = new Blob([resumeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);
      setResume(json);
    };
    reader.readAsText(file);
  };

  return {
    handleExportJson,
    handleImportJson,
  };
};
