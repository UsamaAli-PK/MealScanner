import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { ImagePreview } from './ImagePreview';

interface QuickScanDashboardProps {
  analysisResult: AnalysisResult;
  onToggleDetailedView: () => void;
  isDetailedViewVisible: boolean;
  imagePreviewUrl: string | null;
  handleUserReanalysis: (additionalUserDetail: string | null) => void;
  userRetryCount: number;
  maxUserRetries: number;
}

// Modernized Icons with colors for light theme
const HealthIcons = {
  healthy: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 text-[var(--modern-accent-secondary)] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  unhealthy: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 text-[var(--modern-accent-danger)] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  moderate: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 text-[var(--modern-accent-tertiary)] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};
const MacroIcons = {
    Calories: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.303A7.003 7.003 0 004.048 9.843a.75.75 0 00-.295 1.163A6.966 6.966 0 003 14.585V15a1 1 0 001 1h12a1 1 0 001-1v-.415a6.966 6.966 0 00-.753-3.579.75.75 0 00-.295-1.163A7.003 7.003 0 0011 4.303V3a1 1 0 00-1-1zm0 3.5c-1.653 0-3.14.856-3.98 2.226A5.45 5.45 0 016 10.843V14h8v-3.157a5.45 5.45 0 01-.02-3.117C13.14 6.356 11.653 5.5 10 5.5z" clipRule="evenodd" /></svg>,
    Protein: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a1.5 1.5 0 011.102.47l4.963 4.512c.374.34.535.85.414 1.332l-1.214 4.857A1.5 1.5 0 0114.046 16H5.954a1.5 1.5 0 01-1.219-1.329L3.52 9.814a1.5 1.5 0 01.414-1.332L8.898 3.97A1.5 1.5 0 0110 3.5zm0 2L6.236 8.5H13.764L10 5.5zM5.106 14h9.788l.81-3.236H4.296L5.106 14z" /></svg>,
    Fat: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.739 0 3.5 3.5 0 01-.369 6.98H5.5z" /></svg>,
    Carbs: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2c-2.694 0-5.233.901-7.338 2.553a.75.75 0 00-.335 1.018l1.433 2.866c.21.42.666.588 1.086.379A5.489 5.489 0 0110 5.5c1.31 0 2.54.462 3.475 1.269.42.309.976.241 1.187-.18L16.095 3.74a.75.75 0 00-.224-1.047C14.017 1.287 11.636 2 10 2zm0 14c-2.694 0-5.233-.901-7.338-2.553a.75.75 0 01.335-1.018l1.433-2.866c.21-.42.666-.588 1.086.379A5.489 5.489 0 0010 10.5c1.31 0 2.54.462 3.475 1.269.42.309.976.241 1.187-.18l1.433-2.867a.75.75 0 01.224-1.047c1.854-1.406 4.235-.736 5.867.717.195.174.308.419.308.672V14a2 2 0 01-2 2H2a2 2 0 01-2-2v-.415c0-.253.113-.498.308-.672 1.632-1.453 4.013-2.123 5.867-.717a.75.75 0 01.224 1.047l-1.433 2.867c-.211.42-.767.489-1.187.18A5.489 5.489 0 0010 14.5c-1.31 0-2.54-.462-3.475-1.269a.75.75 0 00-1.086-.379L4.005 9.985a.75.75 0 01-.335-1.018C5.717 7.313 8.098 6.5 10 6.5c1.902 0 4.283.813 6.338 2.465a.75.75 0 01.335 1.018l-1.433 2.866c.21.42-.666.588-1.086.379A5.489 5.489 0 0110 14.5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
};


const MacroItemComponent: React.FC<{ label: string; value: string | number; unit: string; cssVarColor: string; cssVarHoverColor?: string; icon?: React.ReactElement }> = 
  ({ label, value, unit, cssVarColor, cssVarHoverColor, icon }) => (
  <div 
    className="text-center p-3 sm:p-4 rounded-xl transition-all duration-300 group bg-[var(--modern-bg-primary)] hover:bg-white border border-[var(--modern-border-primary)] hover:border-[var(--modern-border-secondary)] shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
  >
    {icon && <div 
        className="mx-auto mb-1.5 sm:mb-2 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ color: cssVarColor }}
      >{icon}</div>}
    <p 
      className="text-2xl sm:text-3xl font-bold transition-colors duration-300"
      style={{ 
        color: cssVarColor, 
        // @ts-ignore
        '--hover-color': cssVarHoverColor || cssVarColor 
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = cssVarHoverColor || cssVarColor}
      onMouseLeave={(e) => e.currentTarget.style.color = cssVarColor}
    >
        {value}
        {unit && <span className="text-sm sm:text-base opacity-70">{unit}</span>}
    </p>
    <p className="text-xs text-[var(--modern-text-tertiary)] uppercase tracking-wider group-hover:text-[var(--modern-text-secondary)] transition-colors duration-300 mt-1 sm:mt-1.5">{label}</p>
  </div>
);
const MacroItem = React.memo(MacroItemComponent);

const QuickScanDashboardComponent: React.FC<QuickScanDashboardProps> = ({
  analysisResult,
  onToggleDetailedView,
  isDetailedViewVisible,
  imagePreviewUrl,
  handleUserReanalysis,
  userRetryCount,
  maxUserRetries,
}) => {
  const [reanalysisInputVisible, setReanalysisInputVisible] = useState(false);
  const [additionalDetail, setAdditionalDetail] = useState('');

  const { conclusion, totalNutritionalSummary, confidence } = analysisResult;

  const getAssessmentIconAndColor = () => {
    if (!conclusion) return { icon: null, color: 'var(--modern-text-primary)', hoverColor: 'var(--modern-text-primary)' };
    const assessmentLower = conclusion.assessment.toLowerCase();
    if (assessmentLower.includes('healthy') && !assessmentLower.includes('unhealthy')) return { icon: HealthIcons.healthy, color: 'var(--modern-accent-secondary)', hoverColor: 'var(--modern-accent-secondary-darker)' };
    if (assessmentLower.includes('unhealthy')) return { icon: HealthIcons.unhealthy, color: 'var(--modern-accent-danger)', hoverColor: 'var(--modern-accent-danger)' }; // Assuming danger doesn't have a std darker variant defined yet for hover
    if (assessmentLower.includes('moderate')) return { icon: HealthIcons.moderate, color: 'var(--modern-accent-tertiary)', hoverColor: 'var(--modern-fat-color-darker)'}; // Using fat-darker for amber hover
    return { icon: HealthIcons.moderate, color: 'var(--modern-accent-tertiary)', hoverColor: 'var(--modern-fat-color-darker)' }; 
  };

  const assessmentStyle = getAssessmentIconAndColor();
  const remainingRetries = maxUserRetries - userRetryCount;

  const handleReanalysisClick = () => {
    if (!reanalysisInputVisible) {
      setReanalysisInputVisible(true);
    } else {
      handleUserReanalysis(additionalDetail.trim() || null);
      setReanalysisInputVisible(false);
      setAdditionalDetail('');
    }
  };

  return (
    <div className="modern-card p-6 rounded-2xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-5 items-center">
        {imagePreviewUrl && (
          <div className="md:col-span-5 animate-fadeInScale">
            <ImagePreview src={imagePreviewUrl} alt="Analyzed food" className="max-h-[260px] sm:max-h-[320px] shadow-lg rounded-xl" />
          </div>
        )}
        
        <div className={` ${imagePreviewUrl ? 'md:col-span-7' : 'md:col-span-12'} space-y-3 text-center md:text-left`}>
          {conclusion && (
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 group cursor-default">
              {assessmentStyle.icon}
              <h3 
                className="text-3xl sm:text-4xl font-extrabold transition-colors duration-300"
                style={{ color: assessmentStyle.color }}
                onMouseEnter={(e) => e.currentTarget.style.color = assessmentStyle.hoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = assessmentStyle.color}
              >
                {conclusion.assessment}
              </h3>
            </div>
          )}
           {conclusion?.reason && <p className="text-md sm:text-lg text-[var(--modern-text-secondary)] leading-relaxed">{conclusion.reason}</p>}
        </div>
      </div>


      {totalNutritionalSummary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[var(--modern-border-primary)]">
          <MacroItem label="Calories" value={totalNutritionalSummary.calories} unit="kcal" cssVarColor="var(--modern-calorie-color)" cssVarHoverColor="var(--modern-calorie-color-darker)" icon={MacroIcons.Calories} />
          <MacroItem label="Protein" value={totalNutritionalSummary.totalProtein} unit="g" cssVarColor="var(--modern-protein-color)" cssVarHoverColor="var(--modern-protein-color-darker)" icon={MacroIcons.Protein} />
          <MacroItem label="Fat" value={totalNutritionalSummary.totalFat} unit="g" cssVarColor="var(--modern-fat-color)" cssVarHoverColor="var(--modern-fat-color-darker)" icon={MacroIcons.Fat} />
          <MacroItem label="Carbs" value={totalNutritionalSummary.totalCarbohydrates} unit="g" cssVarColor="var(--modern-carbs-color)" cssVarHoverColor="var(--modern-carbs-color-darker)" icon={MacroIcons.Carbs} />
        </div>
      )}

      {confidence && (
         <div className="pt-6 border-t border-[var(--modern-border-primary)] space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
                <p className="text-base font-medium text-[var(--modern-text-primary)]">Analysis Confidence:</p>
                <span className="text-3xl sm:text-4xl font-bold text-super-gradient-modern flex-shrink-0">{confidence.score}<span className="text-lg sm:text-xl text-[var(--modern-text-secondary)]">/100</span></span>
            </div>
            <div className="w-full bg-[rgba(0,0,0,0.05)] rounded-full h-3 sm:h-3.5 shadow-inner overflow-hidden border border-[var(--modern-border-primary)]"> 
              <div 
                  className="bg-gradient-to-r from-[var(--modern-accent-primary)] via-[var(--modern-accent-secondary)] to-[var(--modern-accent-primary)] h-full rounded-full transition-all duration-1500 ease-out animate-slideRightModern"
                  style={{ width: `${confidence.score}%`, backgroundSize: '200% 100%' }}
                  key={confidence.score} 
                  role="progressbar"
                  aria-valuenow={confidence.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Analysis confidence score: ${confidence.score} out of 100`}
              ></div>
            </div>
            {confidence?.reasoning && (
                <p className="text-sm text-center text-[var(--modern-text-tertiary)] opacity-90 pt-1 sm:pt-2">
                    <em>{confidence.reasoning}</em>
                </p>
            )}
        </div>
      )}
      
      {reanalysisInputVisible && userRetryCount < maxUserRetries && (
        <div className="pt-5 border-t border-[var(--modern-border-primary)] animate-fadeInScale space-y-2">
          <label htmlFor="reanalysis-detail" className="block text-base font-medium text-[var(--modern-text-primary)]">
            Help refine the analysis <span className="text-xs text-[var(--modern-text-secondary)]">(optional)</span>:
          </label>
          <input
            id="reanalysis-detail"
            type="text"
            value={additionalDetail}
            onChange={(e) => setAdditionalDetail(e.target.value)}
            placeholder="e.g., 'the chicken was grilled', 'approx 200g salmon'"
            className="modern-input"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-6 border-t border-[var(--modern-border-primary)]">
        <button
          onClick={onToggleDetailedView}
          aria-expanded={isDetailedViewVisible}
          aria-controls="detailed-analysis-content"
          className="w-full button-modern-secondary text-base py-3"
        >
          {isDetailedViewVisible ? 'Hide Full Analysis' : 'View Full Analysis'}
          <span aria-hidden="true" className={`ml-2 inline-block transition-transform duration-300 ${isDetailedViewVisible ? 'rotate-180' : ''}`}>▼</span>
        </button>

        <button
          onClick={handleReanalysisClick}
          disabled={userRetryCount >= maxUserRetries}
          className="w-full button-modern-primary text-base py-3 font-semibold"
        >
          {reanalysisInputVisible ? 'Submit Refinement' : 'Refine Analysis'}
          {remainingRetries > 0 && !reanalysisInputVisible && ` (${remainingRetries} left)`}
          {remainingRetries === 0 && !reanalysisInputVisible && ` (Max Refinements Reached)`}
        </button>
      </div>
      
    </div>
  );
};
export const QuickScanDashboard = React.memo(QuickScanDashboardComponent);

const slideRightAnimationModern = `
  @keyframes slideRightModern {
    from { background-position: 200% center; }
    to { background-position: 0% center; }
  }
  .animate-slideRightModern { animation: slideRightModern 2s linear infinite; }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
    try {
      // Check if rule already exists to avoid duplicates if component re-renders
      let ruleExists = false;
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        // Check if it's a CSSKeyframesRule and then check its name
        if (rule instanceof CSSKeyframesRule && rule.name === 'slideRightModern') {
          ruleExists = true;
          break;
        }
      }
      if (!ruleExists) {
        styleSheet.insertRule(slideRightAnimationModern, styleSheet.cssRules.length);
      }
    } catch (e) {
      console.warn("Could not insert animation keyframes for QuickScanDashboard:", e);
    }
  }
}