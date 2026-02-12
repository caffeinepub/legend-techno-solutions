import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoLightbox({ isOpen, onClose }: LogoLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="ALGLOBE TECHNO SOLUTIONS logo enlarged view"
    >
      <div className="relative max-w-[90vw] max-h-[90vh] p-4">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 z-10 h-10 w-10 rounded-full bg-background/90 hover:bg-background shadow-lg"
          aria-label="Close enlarged logo view"
        >
          <X className="h-5 w-5" />
        </Button>
        <img
          src="/assets/generated/alglobe-techno-logo-A-gradient.dim_512x512.png"
          alt="ALGLOBE TECHNO SOLUTIONS Logo"
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
