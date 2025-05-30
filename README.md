# MealScanner - Nutritional Analysis

MealScanner is an innovative web application designed to provide instant nutritional analysis of your meals. Simply upload an image of your food, and our AI-powered engine will deliver a detailed breakdown of food items, estimated quantities, calories, macronutrients, key vitamins/minerals, a health assessment, tailored dietary advice, and a confidence score for the analysis.

The application features a modern, responsive interface with smooth animations, ensuring a delightful user experience.

**Live Demo:** (Replace with your actual demo link if available)

## Table of Contents

1.  [Key Features](#key-features)
2.  [Technologies Used](#technologies-used)
3.  [Prerequisites](#prerequisites)
4.  [Getting Started (Local Setup)](#getting-started-local-setup)
5.  [How to Use MealScanner](#how-to-use-mealscanner)
6.  [Project Structure](#project-structure)
7.  [API Integration (`@google/genai`)](#api-integration-googlegenai)
8.  [Styling](#styling)
9.  [Core Components](#core-components)
10. [Future Enhancements](#future-enhancements)

## Key Features

*   **Instant Image Analysis:** Upload a photo of your meal (PNG, JPG, GIF, WEBP) and get a quick analysis.
*   **Detailed Nutritional Breakdown:** Identifies individual food items, estimates quantities, and provides information on calories, fats (total, saturated), carbohydrates (total, fiber, sugars), protein, sodium, and cholesterol.
*   **Key Nutrient Information:** Lists significant vitamins and minerals present in the meal.
*   **Total Nutritional Summary:** Aggregates nutritional data for the entire meal.
*   **Health Assessment & Conclusion:** Provides a concise health assessment (e.g., Healthy, Moderately Unhealthy) with reasoning.
*   **Tailored Advice:** Offers suggestions on who the meal might be healthy or unhealthy for.
*   **Personalized Re-analysis Insights:** AI provides specific observations based on visual cues.
*   **Confidence Score:** The AI provides a confidence score (0-100) for its analysis along with reasoning.
*   **Refine Analysis:** Users can request the AI to refine its analysis up to 2 times, optionally providing additional textual details to improve accuracy.
*   **User-Managed API Key:** Securely store your Google Gemini API key in your browser's local storage via an intuitive modal.
*   **Responsive Design:** Optimized for various screen sizes (desktop, tablet, mobile).
*   **Modern UI/UX:** Clean, intuitive interface with engaging animations and a modern light theme.
*   **Image Preview & Drag-and-Drop:** Easy image selection with preview and drag-and-drop functionality.
*   **Engaging Loading Experience:** Displays fun food facts and tips while processing.

## Technologies Used

*   **Frontend:**
    *   React 19 (using ESM via esm.sh)
    *   TypeScript
    *   TailwindCSS (via CDN for styling)
    *   Custom CSS Variables for theming
*   **AI & API:**
    *   Google Gemini API (`@google/genai` library via esm.sh) for multimodal (image and text) analysis. Model: `gemini-2.5-flash-preview-04-17`.
*   **Fonts:**
    *   Inter
    *   Poppins (via Google Fonts)

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (LTS version recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **yarn:** These package managers come with Node.js.
*   **Google Gemini API Key:** You'll need an API key from Google AI Studio to use the AI analysis features.
    *   Obtain your key here: [Google AI Studio - API Key](https://aistudio.google.com/app/apikey)

## Getting Started (Local Setup)

To run MealScanner locally, you'll need a development server that can handle JSX and TypeScript (`.tsx` files) and serve `index.html` as the entry point. **Vite** is highly recommended for this.

1.  **Clone the Repository (Optional):**
    If you have the project files, you can skip this step. Otherwise, clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Set up Vite (if not already configured):**
    *   If you don't have a `package.json` file in your project root, create one:
        ```bash
        npm init -y
        ```
    *   Install Vite and the React plugin as development dependencies:
        ```bash
        npm install vite @vitejs/plugin-react --save-dev
        ```
    *   Create a `vite.config.ts` (or `vite.config.js`) file in your project root with the following content:
        ```typescript
        // vite.config.ts
        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'

        export default defineConfig({
          plugins: [react()],
        })
        ```
    *   Ensure your `index.html` file is in the project root (or adjust the `root` option in `vite.config.ts` if it's elsewhere).

3.  **Install Dependencies (if a `package.json` with dependencies exists):**
    If your project came with a `package.json` that already lists dependencies (other than Vite itself, like linters or other tools), run:
    ```bash
    npm install
    # or
    yarn install
    ```
    *Note: React, ReactDOM, and @google/genai are currently loaded via ESM shims in `index.html` and do not strictly require local installation for the app to run with Vite, but it's good practice to have them in `package.json` for version management and type checking if you extend the project.*

4.  **Obtain Your Gemini API Key:**
    *   Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Create a new API key if you don't have one.
    *   **Important:** Copy this key. You will enter it into the application's UI when prompted, not directly into the code.

5.  **Run the Development Server:**
    Once Vite is set up, start the development server:
    ```bash
    npx vite
    ```
    This will typically open the application in your default web browser (e.g., at `http://localhost:5173`).

## How to Use MealScanner

1.  **Launch the App:** Open the application in your web browser (after local setup or via a deployed link).

2.  **Set Your API Key:**
    *   Upon first use, or if an API key isn't set, you'll be prompted, or you can click "Manage API Key" in the navigation bar.
    *   An "Configure Gemini API Key" modal will appear.
    *   Paste your Gemini API key into the input field.
    *   Click "Save API Key." The key will be stored securely in your browser's `localStorage`.
    *   You can also clear the saved key from this modal.

3.  **Upload a Meal Image:**
    *   Navigate to the "Analyze Your Meal" section (you can click the "Analyze Your Meal Now" button in the hero section or "Analyze Meal" in the nav bar).
    *   **Click** the upload area to open a file dialog and select an image of your food (PNG, JPG, GIF, WEBP, up to 10MB).
    *   Alternatively, **drag and drop** an image file onto the designated area.
    *   A preview of the selected image will appear.

4.  **Provide Optional Details (Optional):**
    *   You can enter any specific details about your meal in the "Optional Details" input field (e.g., "lunch with extra cheese," "grilled chicken salad"). This can help the AI provide a more accurate analysis.

5.  **Analyze Your Meal:**
    *   Once an image is selected and your API key is set, click the "Analyze My Meal" button.
    *   If the API key is not set, this button will change to "Set API Key to Analyze," guiding you to the API key modal.

6.  **View Results:**
    *   An engaging loader will appear while the AI processes your image, showing fun food facts.
    *   Once the analysis is complete, the results will be displayed:
        *   **Quick Scan Dashboard:** Shows the overall health assessment (e.g., Healthy, Moderate, Unhealthy) with an icon, the AI's reasoning, total calories, protein, fat, and carbs, and the AI's confidence score with a progress bar and reasoning.
        *   **Detailed Analysis View:** Initially hidden. Click "View Full Analysis" to expand this section. It includes:
            *   Full Nutritional Breakdown (total macros and sodium).
            *   Dietary Considerations (advice on who the meal is good/bad for).
            *   AI-Powered Insights (personalized re-analysis based on visual cues).
            *   Itemized Breakdown (detailed `NutritionCard` for each food item identified).

7.  **Refine Analysis (Optional):**
    *   If you want the AI to take another look, click the "Refine Analysis" button on the Quick Scan Dashboard.
    *   You can provide additional text details in the input field that appears to guide the refinement (e.g., "the sauce is light," "portion is smaller than it looks").
    *   Click "Submit Refinement."
    *   You can refine the analysis up to **2 times**. The loader will indicate if it's a refinement attempt.

8.  **Navigation:**
    *   Use the navigation bar to jump to "Features," "How It Works," or "About" sections.
    *   A "Back to Top" button appears when you scroll down.

## Project Structure

The project follows a standard React component-based architecture:

```
/
├── public/
│   └── images/
│       └── usamaali.jpeg  (Example image asset)
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Alert.tsx
│   │   ├── ApiKeyModal.tsx
│   │   ├── DeveloperCard.tsx
│   │   ├── DetailedAnalysisView.tsx
│   │   ├── EngagingLoader.tsx
│   │   ├── FoodAnalyzerTool.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── NutritionCard.tsx
│   │   └── QuickScanDashboard.tsx
│   ├── services/           # API call logic
│   │   └── geminiService.ts
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component, orchestrates views
│   ├── constants.ts        # Shared constants (e.g., Gemini model name)
│   └── index.tsx           # Entry point for React application
├── index.html              # Main HTML file, loads scripts and styles
├── README.md               # This file
└── vite.config.ts          # (If using Vite) Vite configuration
└── package.json            # Project dependencies and scripts
```

## API Integration (`@google/genai`)

*   **Service Layer:** All interactions with the Google Gemini API are handled in `src/services/geminiService.ts`.
*   **Initialization:** The `GoogleGenAI` client is initialized within the `analyzeFoodImage` function using the user-provided API key.
*   **Prompt Construction:** The `constructPrompt` function dynamically builds a detailed prompt for the Gemini model. It includes:
    *   Instructions for identifying food items, quantities, and detailed nutritional information.
    *   A strict JSON output schema that the AI must follow.
    *   Specific instructions for numeric fields to be actual JSON numbers (not strings with units).
    *   Context for re-analysis attempts, including previous confidence scores and user-provided additional details.
*   **Image Handling:** Images are converted to base64 strings and sent as inline data to the API.
*   **Response Processing:**
    *   The service expects a JSON response (`responseMimeType: "application/json"`).
    *   It trims potential markdown code fences (```json ... ```) from the AI's text response.
    *   A `sanitizeNumericFields` function is used to attempt to correct common issues where the AI might return numbers as strings or include units within numeric fields, ensuring better parsing.
    *   The JSON string is then parsed into the `AnalysisResult` type.
*   **Error Handling:** Includes checks for API key validity and general API communication errors, providing user-friendly messages.

## Styling

*   **TailwindCSS:** Utilized for rapid UI development via its CDN link in `index.html`. Includes plugins for forms, typography, aspect-ratio, and line-clamp.
*   **Custom CSS Variables:** Defined in `index.html` within `<style>:root { ... }</style>` for a "Modern Light Theme." This allows for easy theming and consistent styling across components. Variables cover background colors, text colors, accent colors, borders, shadows, and specific nutrient colors.
*   **Global Styles:** Basic global styles for scrollbar, body font, card hover effects, buttons, inputs, and common utility classes are also defined in `index.html`.
*   **Animations:** Custom CSS keyframe animations (e.g., `fadeInScale`, `slideUpFadeIn`, `pulsingDots`) are defined in `index.html` to enhance user experience.

## Core Components

*   **`App.tsx`:** The main application component. Manages overall layout, routing (scroll-to-section), API key state and modal, and orchestrates the display of landing page sections and the `FoodAnalyzerTool`.
*   **`FoodAnalyzerTool.tsx`:** The heart of the application. Handles image selection (upload, drag-and-drop), user input for optional details, triggers the analysis, manages loading/error states, and displays results using `QuickScanDashboard` and `DetailedAnalysisView`. It also manages the re-analysis flow.
*   **`ApiKeyModal.tsx`:** A modal dialog for users to enter, save, and clear their Gemini API key. The key is stored in `localStorage`.
*   **`QuickScanDashboard.tsx`:** Displays a summary of the analysis results, including the health assessment, total macronutrients, and AI confidence score with a progress bar. Provides buttons to toggle detailed view and refine analysis.
*   **`DetailedAnalysisView.tsx`:** Shows an expanded view of the analysis, including a full nutritional summary, dietary advice, AI insights, and itemized `NutritionCard` components for each food item.
*   **`NutritionCard.tsx`:** A detailed card presenting the nutritional information for a single food item identified by the AI.
*   **`EngagingLoader.tsx`:** Displays an animated loader with dynamically changing food tips during API calls.
*   **`Alert.tsx`:** A reusable component for displaying error, success, or info messages.

## Future Enhancements

*   **User Accounts & History:** Allow users to create accounts and save their analysis history.
*   **Manual Entry:** Option to manually log meals without an image.
*   **Recipe Analysis:** Analyze ingredients from a recipe.
*   **Barcode Scanning:** Integrate barcode scanning for packaged foods.
*   **Advanced Filtering/Search:** For users with extensive meal history.
*   **TailwindCSS Build Step:** For production, implement a proper TailwindCSS build process to purge unused styles and optimize CSS.
*   **Internationalization (i18n):** Support for multiple languages.

---

Thank you for using MealScanner! We hope it helps you on your journey to better understanding your nutrition.
