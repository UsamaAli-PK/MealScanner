import React from 'react';
import type { AnalysisResult } from '../types';
import { NutritionCard } from './NutritionCard';

interface DetailedAnalysisViewProps {
  analysisResult: AnalysisResult;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; animationDelayClass?: string }> = 
  ({ title, children, className, animationDelayClass }) => (
  <div className={`modern-card p-6 rounded-2xl shadow-lg animate-slideUpFadeIn ${animationDelayClass || ''} ${className || ''}`}>
    <h3 className="text-2xl sm:text-3xl font-bold text-super-gradient-modern mb-5 sm:mb-6 inline-block">
      {title}
    </h3>
    {children}
  </div>
);

const AdviceIcons = {
  good: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--modern-accent-secondary)] mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  bad: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--modern-accent-danger)] mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--modern-accent-primary)] mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
};

export const DetailedAnalysisView: React.FC<DetailedAnalysisViewProps> = ({ analysisResult }) => {
  const { foodItems, totalNutritionalSummary, personalizedReanalysis, advice } = analysisResult;
  const sections = [];

  if (totalNutritionalSummary) {
    sections.push(
      <Section key="fullSummary" title="Full Nutritional Breakdown" animationDelayClass="animate-slideUpFadeIn-delay-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-lg">
            <p><span className="font-semibold text-[var(--modern-text-secondary)]">Total Calories:</span> <span className="font-bold text-xl" style={{color: 'var(--modern-calorie-color)'}}>{totalNutritionalSummary.calories} kcal</span></p>
            <p><span className="font-semibold text-[var(--modern-text-secondary)]">Total Protein:</span> <span className="font-bold text-xl" style={{color: 'var(--modern-protein-color)'}}>{totalNutritionalSummary.totalProtein} g</span></p>
            <p><span className="font-semibold text-[var(--modern-text-secondary)]">Total Fat:</span> <span className="font-bold text-xl" style={{color: 'var(--modern-fat-color)'}}>{totalNutritionalSummary.totalFat} g</span></p>
            <p><span className="font-semibold text-[var(--modern-text-secondary)]">Total Carbs:</span> <span className="font-bold text-xl" style={{color: 'var(--modern-carbs-color)'}}>{totalNutritionalSummary.totalCarbohydrates} g</span></p>
            <p><span className="font-semibold text-[var(--modern-text-secondary)]">Total Sodium:</span> <span className="font-bold text-xl" style={{color: 'var(--modern-sodium-color)'}}>{totalNutritionalSummary.totalSodium} mg</span></p>
        </div>
      </Section>
    );
  }

  if (advice) {
    sections.push(
      <Section key="advice" title="Dietary Considerations" animationDelayClass="animate-slideUpFadeIn-delay-2">
        <div className="space-y-5"> 
          <div className="flex items-start p-4 bg-[rgba(16,185,129,0.05)] rounded-lg border border-[var(--modern-accent-secondary)]/30"> {/* Updated green tint */}
            {AdviceIcons.good}
            <div>
              <h4 className="font-semibold text-[var(--modern-accent-secondary)] text-lg sm:text-xl mb-1.5">Potentially Beneficial For:</h4> 
              <p className="text-[var(--modern-text-primary)] text-base leading-relaxed">{advice.healthyFor}</p> 
            </div>
          </div>
          <div className="flex items-start p-4 bg-[rgba(239,68,68,0.05)] rounded-lg border border-[var(--modern-accent-danger)]/30"> {/* Updated red tint */}
            {AdviceIcons.bad}
            <div>
              <h4 className="font-semibold text-[var(--modern-accent-danger)] text-lg sm:text-xl mb-1.5">Consider Moderation If:</h4> 
              <p className="text-[var(--modern-text-primary)] text-base leading-relaxed">{advice.unhealthyFor}</p> 
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (personalizedReanalysis) {
    sections.push(
      <Section key="insights" title="AI-Powered Insights" animationDelayClass="animate-slideUpFadeIn-delay-3">
         <div className="flex items-start p-4 bg-[rgba(59,130,246,0.05)] rounded-lg border border-[var(--modern-accent-primary)]/30"> {/* Updated blue tint */}
            {AdviceIcons.info}
            <div>
                 <h4 className="font-semibold text-[var(--modern-accent-primary)] text-lg sm:text-xl mb-1.5">Key Observations:</h4> 
                <p className="text-base text-[var(--modern-text-primary)] whitespace-pre-wrap leading-relaxed">{personalizedReanalysis}</p>
            </div>
        </div>
      </Section>
    );
  }

  if (foodItems && foodItems.length > 0) {
    sections.push(
      <Section key="foodItems" title="Itemized Breakdown" animationDelayClass="animate-slideUpFadeIn-delay-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6"> 
          {foodItems.map((item, index) => (
            <NutritionCard key={index} item={item} />
          ))}
        </div>
      </Section>
    );
  }
  
  return (
    <div className="space-y-10 sm:space-y-14 mt-10 sm:mt-12" id="detailed-analysis-content"> 
      {sections}
    </div>
  );
};