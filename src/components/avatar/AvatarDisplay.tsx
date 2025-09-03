/**
 * 头像显示组件 - 简洁版本
 */

interface AvatarDisplayProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-20 print:w-14 print:h-18',
  md: 'w-24 h-32 print:w-20 print:h-28',
  lg: 'w-32 h-40 print:w-28 print:h-36',
};

// const iconSizes = {
//   sm: 'h-6 w-6 print:h-5 print:w-5',
//   md: 'h-8 w-8 print:h-6 print:w-6',
//   lg: 'h-10 w-10 print:h-8 print:w-8',
// };

export const AvatarDisplay = ({
  src,
  alt = '头像',
  size = 'md',
  className = '',
}: AvatarDisplayProps) => {
  return (
    <>
      {src ? (
        <div
          className={`${sizeClasses[size]} rounded-lg overflow-hidden bg-gray-200 border border-gray-300 ${className}`}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
