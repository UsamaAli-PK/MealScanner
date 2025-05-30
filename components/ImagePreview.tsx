
import React from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

const ImagePreviewComponent: React.FC<ImagePreviewProps> = ({ src, alt, className }) => {
  return (
    <div className={`mt-5 mb-3 animate-fadeInScale group ${className || ''}`}>
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full h-auto max-h-[280px] sm:max-h-[320px] mx-auto rounded-xl object-contain 
                   border-2 border-[var(--modern-border-primary)] 
                   shadow-lg group-hover:shadow-[var(--modern-shadow-medium)]
                   ring-1 ring-transparent group-hover:ring-[var(--modern-accent-primary)]/30 
                   transition-all duration-350 ease-in-out group-hover:scale-102"
      />
    </div>
  );
};

export const ImagePreview = React.memo(ImagePreviewComponent);
