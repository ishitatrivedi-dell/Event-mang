import React, { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  className,
  showCloseButton = true,
  closeOnBackdropClick = true,
  ...props 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === modalRef.current) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        ref={modalRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div
        className={cn(
          'relative w-full rounded-2xl shadow-glass-xl glass-strong p-6 animate-scale-in z-10',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ className, children, ...props }) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 pb-4 border-b border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const ModalTitle = ({ className, children, ...props }) => (
  <h2
    className={cn(
      'text-xl font-semibold text-gray-900 dark:text-gray-100',
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

const ModalDescription = ({ className, children, ...props }) => (
  <p
    className={cn(
      'text-sm text-gray-600 dark:text-gray-400',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

const ModalContent = ({ className, children, ...props }) => (
  <div
    className={cn('py-4', className)}
    {...props}
  >
    {children}
  </div>
);

const ModalFooter = ({ className, children, ...props }) => (
  <div
    className={cn(
      'flex items-center justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
};