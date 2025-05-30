import React from 'react';
import type { FoodItem } from '../types';

// Updated Icons for Modern Light theme - colors will be derived from CSS variables
const NutrientIcons: Record<string, React.ReactElement> = {
  Calories: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--modern-calorie-color)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.303A7.003 7.003 0 004.048 9.843a.75.75 0 00-.295 1.163A6.966 6.966 0 003 14.585V15a1 1 0 001 1h12a1 1 0 001-1v-.415a6.966 6.966 0 00-.753-3.579.75.75 0 00-.295-1.163A7.003 7.003 0 0011 4.303V3a1 1 0 00-1-1zm0 3.5c-1.653 0-3.14.856-3.98 2.226A5.45 5.45 0 016 10.843V14h8v-3.157a5.45 5.45 0 01-.02-3.117C13.14 6.356 11.653 5.5 10 5.5z" clipRule="evenodd" /></svg>,
  Protein: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--modern-protein-color)]" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a1.5 1.5 0 011.102.47l4.963 4.512c.374.34.535.85.414 1.332l-1.214 4.857A1.5 1.5 0 0114.046 16H5.954a1.5 1.5 0 01-1.219-1.329L3.52 9.814a1.5 1.5 0 01.414-1.332L8.898 3.97A1.5 1.5 0 0110 3.5zm0 2L6.236 8.5H13.764L10 5.5zM5.106 14h9.788l.81-3.236H4.296L5.106 14z" /></svg>,
  Fat: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--modern-fat-color)]" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.739 0 3.5 3.5 0 01-.369 6.98H5.5z" /></svg>,
  Carbs: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--modern-carbs-color)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2c-2.694 0-5.233.901-7.338 2.553a.75.75 0 00-.335 1.018l1.433 2.866c.21.42.666.588 1.086.379A5.489 5.489 0 0110 5.5c1.31 0 2.54.462 3.475 1.269.42.309.976.241 1.187-.18L16.095 3.74a.75.75 0 00-.224-1.047C14.017 1.287 11.636 2 10 2zm0 14c-2.694 0-5.233-.901-7.338-2.553a.75.75 0 01.335-1.018l1.433-2.866c.21-.42.666-.588 1.086-.379A5.489 5.489 0 0010 10.5c1.31 0 2.54.462 3.475 1.269.42.309.976.241 1.187-.18l1.433-2.867a.75.75 0 01.224-1.047c1.854-1.406 4.235-.736 5.867.717.195.174.308.419.308.672V14a2 2 0 01-2 2H2a2 2 0 01-2-2v-.415c0-.253.113-.498.308-.672 1.632-1.453 4.013-2.123 5.867-.717a.75.75 0 01.224 1.047l-1.433 2.867c-.211.42-.767.489-1.187.18A5.489 5.489 0 0010 14.5c-1.31 0-2.54-.462-3.475-1.269a.75.75 0 00-1.086-.379L4.005 9.985a.75.75 0 01-.335-1.018C5.717 7.313 8.098 6.5 10 6.5c1.902 0 4.283.813 6.338 2.465a.75.75 0 01.335 1.018l-1.433 2.866c.21.42-.666.588-1.086.379A5.489 5.489 0 0110 14.5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
  Sodium: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--modern-sodium-color)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
  Cholesterol: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--modern-cholesterol-color)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm12.707-1.707a1 1 0 00-1.414-1.414L10 11.586l-1.293-1.293a1 1 0 00-1.414 1.414L8.586 13l-1.293 1.293a1 1 0 101.414 1.414L10 14.414l1.293 1.293a1 1 0 101.414-1.414L11.414 13l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" /></svg>,
  Fiber: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--modern-fiber-color)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.145 4.245A1.559 1.559 0 0013.5 3.068a3.494 3.494 0 00-5.448 1.61C5.99 5.295 5.014 7.23 5.014 9.406c0 2.11 1.017 4.23 2.93 5.235A3.5 3.5 0 0011.5 18c2.073 0 3.804-1.81 3.475-3.865a3.49 3.49 0 00-1.316-2.448c.21-.58.273-1.193.138-1.78a3.497 3.497 0 00-1.57-2.377 1.558 1.558 0 002.918-3.285zM9.914 11.61a2.006 2.006 0 001.072-.752 2 2 0 00.322-2.084L9.52 3.85l-.012-.018a1.993 1.993 0 00-2.93-.028C5.22 5.353 6.512 7.35 6.512 9.405c0 1.554-.69 2.99-1.694 3.952a2 2 0 001.694 3.46c1.035 0 2.208-.856 3.402-2.208z" clipRule="evenodd" /></svg>,
  Sugars: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--modern-sugars-color)]" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1a2 2 0 00-1.936 1.489L5.236 9H2a1 1 0 100 2h3.236l2.828 6.511A2 2 0 0010 19a2 2 0 001.936-1.489L14.764 11H18a1 1 0 100-2h-3.236l-2.828-6.511A2 2 0 0010 1zm0 2.84L12.828 10H7.172L10 3.84z" /></svg>,
  Vitamins: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--modern-accent-primary)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v1a1 1 0 002 0V6h1a1 1 0 000-2H7V3a1 1 0 00-1-1H5zM13 2a1 1 0 00-1 1v1h-1a1 1 0 100 2h1v1a1 1 0 102 0V6h1a1 1 0 100-2h-1V3a1 1 0 00-1-1h-1zM3 8a1 1 0 00-1 1v1H1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2H4v-1a1 1 0 00-1-1H3zm13.293 1.293a1 1 0 00-1.414 0L13 11.586l-1.879-1.88a1 1 0 00-1.414 1.415L11.586 13l-1.88 1.879a1 1 0 101.415 1.414L13 14.414l1.879 1.88a1 1 0 001.414-1.415L14.414 13l1.88-1.879a1 1 0 000-1.414zM8 13a1 1 0 00-1 1v1H6a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2H9v-1a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>,
};

interface NutritionCardProps {
  item: FoodItem;
}

const NutrientPanel: React.FC<{ title: string; icon?: React.ReactElement; children: React.ReactNode; className?: string }> = 
  ({ title, icon, children, className }) => (
  <div className={`bg-[var(--modern-bg-primary)] p-4 rounded-xl border border-[var(--modern-border-primary)] shadow-sm ${className || ''}`}>
    <div className="flex items-center mb-3.5">
      {icon && <span className="mr-2.5 opacity-90">{icon}</span>}
      <h4 className="text-lg font-semibold text-gradient-modern">{title}</h4>
    </div>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

interface NutrientDetailProps {
  label: string;
  value: string | number;
  unit?: string;
  valueCssVarColor?: string; // Expecting a CSS variable string like 'var(--modern-calorie-color)'
  icon?: React.ReactElement<React.SVGAttributes<SVGElement>>;
}

const NutrientDetail: React.FC<NutrientDetailProps> = 
  ({ label, value, unit, valueCssVarColor, icon }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-[var(--modern-text-secondary)] flex items-center">
      {icon && <span className="mr-2 opacity-70">{React.cloneElement(icon, {className: `${icon.props.className || ''} h-4 w-4`})}</span>}
      {label}:
    </span>
    <span 
      className="font-semibold" 
      style={{ color: valueCssVarColor || 'var(--modern-text-primary)' }}
    >
      {value}{unit && <span className="text-[var(--modern-text-tertiary)] text-xs ml-1 opacity-80">{unit}</span>}
    </span>
  </div>
);


const NutritionCardComponent: React.FC<NutritionCardProps> = ({ item }) => {
  return (
    <div className="modern-card p-5 sm:p-6 rounded-2xl shadow-lg space-y-5 transition-all duration-300 hover:shadow-[var(--modern-shadow-large)] hover:border-[var(--modern-accent-primary)]/50">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-super-gradient-modern mb-1 truncate" title={item.name}>{item.name}</h3>
        <p className="text-sm text-[var(--modern-text-secondary)]">
          Estimated Quantity: <span className="text-[var(--modern-text-primary)] font-medium">{item.estimatedQuantity}</span>
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 items-center p-4 bg-gradient-to-br from-[var(--modern-bg-primary)] to-white/50 rounded-xl border border-[var(--modern-border-primary)] shadow-inner">
          <div className="text-center">
            {NutrientIcons.Calories}
            <p className="text-3xl font-extrabold text-[var(--modern-calorie-color)] mt-1">{item.calories}</p>
            <p className="text-xs text-[var(--modern-text-tertiary)] uppercase tracking-wider mt-0.5">Calories</p>
          </div>
          <div className="text-center">
            {NutrientIcons.Protein}
            <p className="text-3xl font-extrabold text-[var(--modern-protein-color)] mt-1">{item.protein}</p>
            <p className="text-xs text-[var(--modern-text-tertiary)] uppercase tracking-wider mt-0.5">Protein (g)</p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <NutrientPanel title="Fat Composition" icon={NutrientIcons.Fat}>
          <NutrientDetail label="Total Fat" value={item.fat.total} unit="g" valueCssVarColor="var(--modern-fat-color)"/>
          <NutrientDetail label="Saturated Fat" value={item.fat.saturated} unit="g"/>
        </NutrientPanel>

        <NutrientPanel title="Carbohydrate Profile" icon={NutrientIcons.Carbs}>
          <NutrientDetail label="Total Carbs" value={item.carbohydrates.total} unit="g" valueCssVarColor="var(--modern-carbs-color)"/>
          <NutrientDetail label="Dietary Fiber" value={item.carbohydrates.fiber} unit="g" icon={NutrientIcons.Fiber} valueCssVarColor="var(--modern-fiber-color)"/>
          <NutrientDetail label="Sugars" value={item.carbohydrates.sugars} unit="g" icon={NutrientIcons.Sugars} valueCssVarColor="var(--modern-sugars-color)"/>
        </NutrientPanel>
      </div>

      <NutrientPanel title="Key Minerals" icon={NutrientIcons.Sodium}> {/* Main icon for panel is Sodium, details inside */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <NutrientDetail label="Sodium" value={item.sodium} unit="mg" valueCssVarColor="var(--modern-sodium-color)" icon={NutrientIcons.Sodium}/>
            <NutrientDetail label="Cholesterol" value={item.cholesterol} unit="mg" valueCssVarColor="var(--modern-cholesterol-color)" icon={NutrientIcons.Cholesterol}/>
        </div>
      </NutrientPanel>

      {item.keyNutrients && item.keyNutrients.length > 0 && (
        <NutrientPanel title="Vitamins & Other Nutrients" icon={NutrientIcons.Vitamins}>
          <div className="flex flex-wrap gap-2">
            {item.keyNutrients.map((nutrient, index) => (
              <div key={index} className="bg-[var(--modern-bg-primary)] text-xs px-3 py-1.5 rounded-full shadow-sm border border-[var(--modern-border-primary)] flex items-center group hover:border-[var(--modern-accent-primary)]/70 transition-colors">
                <span className="text-[var(--modern-text-primary)] group-hover:text-[var(--modern-accent-primary)] transition-colors">{nutrient.name}:</span>
                <span className="text-[var(--modern-text-secondary)] group-hover:text-[var(--modern-text-primary)] ml-1.5 font-medium transition-colors">{nutrient.amount}</span>
              </div>
            ))}
          </div>
        </NutrientPanel>
      )}
    </div>
  );
};

export const NutritionCard = React.memo(NutritionCardComponent);