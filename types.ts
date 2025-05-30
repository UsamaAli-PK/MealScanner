
export interface KeyNutrient {
  name: string;
  amount: string;
}

export interface FatInfo {
  total: number;
  saturated: number;
}

export interface CarbohydrateInfo {
  total: number;
  fiber: number;
  sugars: number;
}

export interface FoodItem {
  name: string;
  estimatedQuantity: string;
  calories: number;
  fat: FatInfo;
  carbohydrates: CarbohydrateInfo;
  protein: number;
  sodium: number;
  cholesterol: number;
  keyNutrients: KeyNutrient[];
}

export interface TotalNutritionalSummary {
  calories: number;
  totalFat: number;
  totalCarbohydrates: number;
  totalProtein: number;
  totalSodium: number;
}

export interface Conclusion {
  assessment: string; // e.g., Healthy, Moderately Healthy, Unhealthy
  reason: string;
}

export interface Advice {
  healthyFor: string;
  unhealthyFor: string;
}

export interface Confidence {
  score: number; // 0-100
  reasoning: string;
}

export interface AnalysisResult {
  foodItems: FoodItem[];
  totalNutritionalSummary: TotalNutritionalSummary;
  conclusion: Conclusion;
  advice: Advice;
  personalizedReanalysis: string;
  confidence: Confidence;
}

// Represents the raw JSON structure expected from Gemini API
// It's good practice to have this if the API might return numbers as strings
// and you need to parse them carefully. For this implementation, we assume
// Gemini adheres to the number types requested in the prompt.
export type RawAnalysisResult = AnalysisResult;
