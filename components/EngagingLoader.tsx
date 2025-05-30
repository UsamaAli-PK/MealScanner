
import React from 'react';

interface EngagingLoaderProps {
  tip: string;
  isUserInitiatedRetry: boolean;
  userRetryAttempt: number; 
  maxUserRetries: number;   
}

export const EngagingLoader: React.FC<EngagingLoaderProps> = ({ 
  tip, 
  isUserInitiatedRetry,
  userRetryAttempt,
  maxUserRetries
}) => {
  let titleText = "Analyzing Your Meal...";
  let subText = "Our AI is processing the image. Here's a food for thought while you wait:";

  if (isUserInitiatedRetry && userRetryAttempt > 0) {
    titleText = `Refining Your Analysis (Attempt ${userRetryAttempt}/${maxUserRetries})...`;
    subText = "Applying enhanced scrutiny for a better result. Thanks for your patience! Another tip:";
  }


  return (
    <div className="flex flex-col items-center justify-center text-center p-6 h-full animate-fadeInScale">
      <div className="pulsing-dots mb-10">
        <span className="inline-block w-6 h-6 rounded-full mr-2.5"></span>
        <span className="inline-block w-6 h-6 rounded-full mr-2.5"></span>
        <span className="inline-block w-6 h-6 rounded-full"></span>
      </div>
      <p className="text-2xl font-semibold text-super-gradient-modern mb-4">
        {titleText}
      </p>
      <p className="text-[var(--modern-text-secondary)] text-lg max-w-lg">
        {subText}
      </p>
      <p className="text-[var(--modern-text-primary)] text-xl italic mt-5 px-4 min-h-[60px]">"{tip}"</p>
    </div>
  );
};
