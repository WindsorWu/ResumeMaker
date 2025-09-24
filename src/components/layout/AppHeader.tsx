import { FileText, Sparkles } from 'lucide-react';
import { IconRenderer } from '../IconPicker';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface AppHeaderProps {
  children: React.ReactNode;
}

export const AppHeader = ({ children }: AppHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <Sparkles className="absolute -top-0.5 -right-0.5 h-3 w-3 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resumaker
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* GitHub 图标 */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-md">
                    <IconRenderer
                      iconName="github"
                      className="h-4 w-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      onClick={() => {
                        window.open('https://github.com/WindsorWu/ResumeMaker', '_blank');
                      }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub 源码，给个⭐️~~</p>
                </TooltipContent>
              </Tooltip>

              {/* 网站图标 */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 cursor-pointer border border-blue-200 hover:border-blue-300 hover:shadow-md">
                    <IconRenderer
                      iconName="globe"
                      className="h-4 w-4 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      onClick={() => {
                        window.open('https://whitemeta.cn', '_blank');
                      }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>个人网站，欢迎访问</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {children}
          </div>
        </div>
      </div>
    </header>
  );
};
