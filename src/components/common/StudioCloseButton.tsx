import React from 'react';
import { X } from 'lucide-react';

interface StudioCloseButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  ariaLabel?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

export const StudioCloseButton: React.FC<StudioCloseButtonProps> = ({
  onClick,
  title = 'Close',
  ariaLabel = 'Close',
  className = '',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      className={`w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl transition-colors active:scale-95 cursor-pointer ${
        isLight
          ? 'text-neutral-600 hover:text-neutral-950 hover:bg-black/5 active:bg-black/10'
          : 'text-neutral-400 hover:text-white hover:bg-white/10 active:bg-white/15'
      } ${className}`}
    >
      <X className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
    </button>
  );
};
