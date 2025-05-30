import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult, RawAnalysisResult } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

// Sanitizes numeric fields in the JSON response from Gemini API
const sanitizeNumericFields = (jsonStr: string): string => {
  const numericKeys = [
    // Top level in foodItems
    "calories", "protein", "sodium", "cholesterol",
    // Nested in foodItems.fat
    "total", "saturated",
    // Nested in foodItems.carbohydrates
    "fiber", "sugars",
    // Top level in totalNutritionalSummary
    "totalFat", "totalCarbohydrates",
    // Top level in confidence
    "score"
  ];

  let sanitizedJsonStr = jsonStr;

  numericKeys.forEach(key => {
    const regex = new RegExp(`("${key}"\\s*:\\s*)("?)((?:-?\\d*\\.\\d+|-?\\d+)(?:[^"\\\\,]*?)?)("?)`, "g");

    sanitizedJsonStr = sanitizedJsonStr.replace(regex, (match, keyPart, quoteStart, valuePart, quoteEnd) => {
      let numericValue = valuePart;
      const numberMatch = numericValue.match(/^-?\d+(\.\d+)?/);

      if (numberMatch) {
        numericValue = numberMatch[0];
        if (!isNaN(parseFloat(numericValue)) && isFinite(Number(numericValue))) {
          return `${keyPart}${numericValue}`;
        }
      }
      return `${keyPart}${quoteStart}${valuePart}${quoteEnd}`;
    });
  });
  return sanitizedJsonStr;
};


function constructPrompt(
  optionalUserDetail: string,
  previousAnalysisContext: AnalysisResult | null,
  userRetryNumber: number | null,
  additionalUserDetailForReanalysis: string | null
): string {
  let contextInstruction = "";
  if (previousAnalysisContext && userRetryNumber) {
    let additionalDetailText = "";
    if (additionalUserDetailForReanalysis && additionalUserDetailForReanalysis.trim() !== "") {
      additionalDetailText = `\nUser has provided these additional details for this refinement: "${additionalUserDetailForReanalysis.trim()}"
Please use this new information carefully to improve your analysis.`;
    }

    contextInstruction = `
**Important User-Requested Re-analysis (Refinement ${userRetryNumber}):**
The user has requested a refinement of a previous analysis for this image.
Previous Analysis Confidence: ${previousAnalysisContext.confidence.score}/100.
Previous Confidence Reasoning: "${previousAnalysisContext.confidence.reasoning}"
Previous Overall Assessment: "${previousAnalysisContext.conclusion.assessment} - ${previousAnalysisContext.conclusion.reason}"
${additionalDetailText}

Please meticulously re-evaluate all aspects of the image. Focus on improving accuracy in food item identification, quantity estimation, and all nutritional calculations, especially considering areas that might have led to the previous confidence score or assessment.
Your goal is to provide a more precise and confident analysis based on this refinement request. Ensure your new confidence score accurately reflects this heightened level of scrutiny and any improvements made.
Address any ambiguities from the previous attempt.
`;
  } else {
    contextInstruction = `
**Your analysis MUST be of the highest possible accuracy and precision on this first attempt. Strive for factual correctness in all nutritional data and ensure your confidence score genuinely reflects this high standard. Be meticulous.**
`;
  }

  return `
Analyze the provided image of food. Your goal is to provide a detailed nutritional breakdown, health assessment, tailored advice, and a confidence score.
${contextInstruction}

Input:
- Image containing food items.
- Optional user-provided detail for initial analysis: "${optionalUserDetail || 'None provided'}"

Tasks:
1.  **Identify & Quantify**: Identify all distinct food items in the image and estimate their quantity (e.g., in grams, pieces, cups) with the highest possible accuracy.
2.  **Nutritional Breakdown**: For each identified food item and its estimated quantity, provide the following nutritional information. Ensure all values are as accurate as possible.
    *   Calories: Provide the caloric value in kcal. Output this as a JSON number (e.g., 250, not "250 kcal" or 250kcal).
    *   Total Fat: Provide the total fat in grams. Output this as a JSON number (e.g., 10.5).
    *   Saturated Fat: Provide the saturated fat in grams. Output this as a JSON number (e.g., 3.2).
    *   Total Carbohydrates: Provide the total carbohydrates in grams. Output this as a JSON number (e.g., 30).
    *   Dietary Fiber: Provide the dietary fiber in grams. Output this as a JSON number (e.g., 5).
    *   Sugars: Provide the sugars in grams. Output this as a JSON number (e.g., 15).
    *   Protein: Provide the protein in grams. Output this as a JSON number (e.g., 20).
    *   Sodium: Provide the sodium in milligrams. Output this as a JSON number (e.g., 500).
    *   Cholesterol: Provide the cholesterol in milligrams. Output this as a JSON number (e.g., 75).
    *   Key Vitamins/Minerals: (e.g., Vitamin C, Calcium, Iron, Potassium - include if significantly present). For these, list their name as a string and their amount (including units) as a string within the "keyNutrients" array (e.g., { "name": "Vitamin C", "amount": "90 mg" }).
3.  **Total Nutritional Summary**: Sum all the nutritional values from the individual food items to provide a total summary for the entire meal. Ensure all summed values are JSON numbers and reflect the highest accuracy.
4.  **Health Assessment (Conclusion)**: Based on the total nutritional summary, provide a concise health assessment (e.g., Healthy, Unhealthy, Moderately Healthy) and a brief, accurate reason.
5.  **Tailored Advice**: Based on the analysis, provide accurate and well-founded advice on:
    *   Who this meal might be healthy for (e.g., "Individuals aiming for muscle gain due to high protein content").
    *   Who this meal might be potentially unhealthy for (e.g., "Individuals managing blood pressure due to high sodium").
6.  **Re-analysis & Personalization**: Re-evaluate all the above nutritional data and health assessment *specifically based on the visual cues and context of the input image*. Consider any visible preparation methods (e.g., fried, baked, raw), obvious ingredients, and overall portion size to refine the analysis and advice. Ensure the output is as personalized and accurate to this specific image as possible.
7.  **Confidence Score**: Provide a confidence score (0-100) as a JSON number for your analysis and a brief reasoning for this score. This score should reflect your true confidence in the accuracy of the entire analysis.

Output Format:
Return your response as a single, valid JSON object. The JSON object MUST strictly follow this structure.

**ABSOLUTELY CRITICAL: All fields specified as "number" in the JSON schema example below (e.g., "calories": "number", "total": "number") MUST be actual, pure JSON numbers. This means ONLY digits and an optional decimal point (e.g., 150, 25.5, 0). They MUST NOT be enclosed in quotes. They MUST NOT include ANY units (like 'kcal', 'g', 'mg'), text, or symbols. Units are ONLY permissible in string fields like "estimatedQuantity" or "keyNutrients.amount". Failure to adhere to this for number fields will result in an invalid JSON. Double-check every numeric field before outputting.**
**Verify all information for maximum accuracy before outputting.**

\`\`\`json
{
  "foodItems": [
    {
      "name": "string",
      "estimatedQuantity": "string",
      "calories": "number",
      "fat": { "total": "number", "saturated": "number" },
      "carbohydrates": { "total": "number", "fiber": "number", "sugars": "number" },
      "protein": "number",
      "sodium": "number",
      "cholesterol": "number",
      "keyNutrients": [ { "name": "string", "amount": "string" } ]
    }
  ],
  "totalNutritionalSummary": {
    "calories": "number",
    "totalFat": "number",
    "totalCarbohydrates": "number",
    "totalProtein": "number",
    "totalSodium": "number"
  },
  "conclusion": {
    "assessment": "string",
    "reason": "string"
  },
  "advice": {
    "healthyFor": "string",
    "unhealthyFor": "string"
  },
  "personalizedReanalysis": "string",
  "confidence": {
    "score": "number",
    "reasoning": "string"
  }
}
\`\`\`

Ensure all specified numerical fields are actual JSON numbers. For example, "calories": 250, not "calories": "250 kcal".
If you cannot identify a food item or its quantity with reasonable confidence, state that clearly in the reasoning for the confidence score, and you may omit the item or provide default/estimated values with a note, but strive for identification.
The accuracy of your entire response is paramount.
`;
}


export const analyzeFoodImage = async (
  apiKeyParam: string, // Renamed parameter for clarity
  base64Image: string,
  mimeType: string,
  optionalDetail: string,
  previousAnalysisContext: AnalysisResult | null = null,
  userRetryNumber: number | null = null,
  additionalUserDetailForReanalysis: string | null = null
): Promise<AnalysisResult> => {
  const effectiveApiKey = apiKeyParam ? apiKeyParam.trim() : "";

  if (!effectiveApiKey) {
    console.error("API key is not provided or is empty after trimming.");
    throw new Error("API key is not provided or is empty after trimming. Please ensure your API key is set correctly.");
  }

  const ai = new GoogleGenAI({ apiKey: effectiveApiKey }); // Initialize client with the trimmed user's key

  const imagePart = {
    inlineData: {
      mimeType: mimeType,
      data: base64Image,
    },
  };

  const textPart = {
    text: constructPrompt(optionalDetail, previousAnalysisContext, userRetryNumber, additionalUserDetailForReanalysis),
  };

  const attemptInfo = userRetryNumber
    ? `(User Refinement Attempt ${userRetryNumber})`
    : `(Initial Analysis Attempt)`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
      }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    jsonStr = sanitizeNumericFields(jsonStr);

    const parsedData = JSON.parse(jsonStr) as RawAnalysisResult;

    if (!parsedData.foodItems || !parsedData.totalNutritionalSummary || !parsedData.conclusion || !parsedData.confidence) {
        throw new Error(`Incomplete analysis data received from API ${attemptInfo}. Missing one or more core fields.`);
    }
    if (typeof parsedData.confidence.score !== 'number') {
        throw new Error(`Invalid confidence score format received from API ${attemptInfo} (expected number). Actual type: ${typeof parsedData.confidence.score}, Value: ${parsedData.confidence.score}`);
    }

    return parsedData as AnalysisResult;

  } catch (error: any) {
    console.error(`Error calling Gemini API or parsing response ${attemptInfo}:`, error);
    let errorMessage = `An unknown error occurred while communicating with the AI model ${attemptInfo}.`;
    if (error instanceof Error) {
        errorMessage = `Failed to analyze image ${attemptInfo}: ${error.message}`;
    }
    // Check for common API key related errors
    if (error.message && (error.message.toLowerCase().includes('api key not valid') ||
                          error.message.toLowerCase().includes('authentication failed') ||
                          error.message.toLowerCase().includes('permission denied') ||
                          error.message.toLowerCase().includes('api_key_invalid') || 
                          (error.status && (error.status === 401 || error.status === 403 || error.status === 400)))) {
      errorMessage = `AI analysis failed ${attemptInfo}. This might be due to an invalid or misconfigured API Key. Please verify your key. Original error: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
};
