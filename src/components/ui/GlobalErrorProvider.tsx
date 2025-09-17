/**
 * 全局错误提示容器组件
 */
import { cn } from '@/lib/utils';
import { errorMessagesAtom, removeErrorMessageAtom, type ErrorMessage } from '@/store/errorStore';
import { useAtom, useSetAtom } from 'jotai';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

// 错误类型对应的图标和样式
const getErrorConfig = (type: ErrorMessage['type']) => {
  switch (type) {
    case 'error':
      return {
        icon: AlertCircle,
        variant: 'destructive' as const,
        className: 'border-red-200 bg-red-50 text-red-800',
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        variant: 'default' as const,
        className: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      };
    case 'success':
      return {
        icon: CheckCircle,
        variant: 'default' as const,
        className: 'border-green-200 bg-green-50 text-green-800',
      };
    case 'info':
      return {
        icon: Info,
        variant: 'default' as const,
        className: 'border-blue-200 bg-blue-50 text-blue-800',
      };
    default:
      return {
        icon: Info,
        variant: 'default' as const,
        className: 'border-gray-200 bg-gray-50 text-gray-800',
      };
  }
};

/**
 * 单个错误消息组件
 */
const ErrorMessageItem = ({ message }: { message: ErrorMessage }) => {
  const removeMessage = useSetAtom(removeErrorMessageAtom);
  const config = getErrorConfig(message.type);
  const Icon = config.icon;

  const handleRemove = () => {
    removeMessage(message.id);
  };

  return (
    <Alert
      variant={config.variant}
      className={cn('relative transition-all duration-300 ease-in-out', config.className)}
    >
      <Icon className="h-4 w-4" />
      <AlertDescription className="pr-8">{message.message}</AlertDescription>
      <button
        onClick={handleRemove}
        className="absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="关闭"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
};

/**
 * 全局错误提示容器
 */
export const GlobalErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessages] = useAtom(errorMessagesAtom);

  return (
    <>
      {children}

      {/* 错误提示容器 - 固定在页面顶部 */}
      {errorMessages.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md px-4">
          <div className="space-y-2">
            {errorMessages.map((message) => (
              <ErrorMessageItem key={message.id} message={message} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
