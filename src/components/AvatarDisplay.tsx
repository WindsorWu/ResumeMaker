import { User } from 'lucide-react';

interface AvatarDisplayProps {
  avatar?: string;
  name: string;
  isTopBottomLayout: boolean;
}

export const AvatarDisplay = ({ avatar, name, isTopBottomLayout }: AvatarDisplayProps) => {
  return (
    <div className={`${isTopBottomLayout ? 'flex-shrink-0' : 'mb-6 print:mb-4 text-center'}`}>
      {avatar ? (
        <div
          className={`rounded-full overflow-hidden ${
            isTopBottomLayout
              ? 'w-20 h-20 border-3 border-gray-200 print:w-16 print:h-16 print:border-2'
              : 'w-24 h-24 mx-auto mb-3 border-3 border-gray-200 print:w-16 print:h-16 print:mb-2 print:border-2'
          }`}
        >
          <img src={avatar} alt="头像" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className={`rounded-full bg-gray-100 border-3 border-gray-200 flex items-center justify-center ${
            isTopBottomLayout
              ? 'w-20 h-20 print:w-16 print:h-16 print:border-2'
              : 'w-24 h-24 mx-auto mb-3 print:w-16 print:h-16 print:mb-2 print:border-2'
          }`}
        >
          <User
            className={`text-gray-400 ${
              isTopBottomLayout ? 'h-10 w-10 print:h-8 print:w-8' : 'h-12 w-12 print:h-8 print:w-8'
            }`}
          />
        </div>
      )}

      {/* 姓名显示 - 只在左右布局显示 */}
      {!isTopBottomLayout && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-3 print:text-lg print:mb-2">
            {name || '姓名'}
          </h1>
          <div className="w-16 h-0.5 bg-gray-400 mx-auto rounded-full print:w-12"></div>
        </>
      )}
    </div>
  );
};
