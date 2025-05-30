
import React from 'react';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
  className?: string;
}

const icons = {
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const AlertComponent: React.FC<AlertProps> = ({ type, message, className }) => {
  const baseClasses = "modern-card p-5 rounded-xl shadow-lg flex items-start"; 
  let typeSpecificClasses = "";
  let iconElement = icons[type];
  let titleColor = "";
  let bgColor = "";

  switch (type) {
    case 'error':
      typeSpecificClasses = "border-[var(--modern-accent-danger)]/70 hover:border-[var(--modern-accent-danger)]"; 
      iconElement = React.cloneElement(icons.error, { className: `${icons.error.props.className || ''} text-[var(--modern-accent-danger)]` });
      titleColor = "text-[var(--modern-accent-danger)]";
      bgColor = "bg-[rgba(220,53,69,0.05)]"; // Light red tint
      break;
    case 'success':
      typeSpecificClasses = "border-[var(--modern-accent-secondary)]/70 hover:border-[var(--modern-accent-secondary)]"; 
      iconElement = React.cloneElement(icons.success, { className: `${icons.success.props.className || ''} text-[var(--modern-accent-secondary)]` });
      titleColor = "text-[var(--modern-accent-secondary)]";
      bgColor = "bg-[rgba(40,167,69,0.05)]"; // Light green tint
      break;
    case 'info':
      typeSpecificClasses = "border-[var(--modern-accent-primary)]/70 hover:border-[var(--modern-accent-primary)]"; 
      iconElement = React.cloneElement(icons.info, { className: `${icons.info.props.className || ''} text-[var(--modern-accent-primary)]` });
      titleColor = "text-[var(--modern-accent-primary)]";
      bgColor = "bg-[rgba(0,123,255,0.05)]"; // Light blue tint
      break;
  }

  return (
    <div className={`${baseClasses} ${typeSpecificClasses} ${bgColor} ${className || ''}`} role="alert">
      {iconElement}
      <div className="flex-grow">
        <p className={`font-semibold text-lg ${titleColor}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
        <p className="text-sm text-[var(--modern-text-secondary)] opacity-95 mt-1 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export const Alert = React.memo(AlertComponent);
