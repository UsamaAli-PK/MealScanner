
import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react';
import { analyzeFoodImage } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import { Alert } from './Alert';
import { ImagePreview } from './ImagePreview';
import { QuickScanDashboard } from './QuickScanDashboard';
import { DetailedAnalysisView } from './DetailedAnalysisView';
import { EngagingLoader } from './EngagingLoader';

const loadingTips = [
  "Did you know? Drinking water before meals can aid digestion.",
  "Fun fact: Avocados are fruits, not vegetables!",
  "Quick tip: Aim for at least 5 servings of fruits and vegetables a day.",
  "Healthy habit: Colorful plates often mean more nutrients.",
  "Reminder: Portion control is key to healthy eating.",
  "Food for thought: Dark chocolate (70%+) has antioxidant benefits!",
  "Pro tip: Spices can add flavor without extra calories or sodium.",
  "Did you know? Fiber helps maintain stable blood sugar levels.",
  "Smart choice: Whole grains provide sustained energy."
];

const MAX_USER_RETRIES = 2;

interface FoodAnalyzerToolProps {
  userApiKey: string | null; // Updated to allow null
  onAnalysisError: (errorMessage: string) => void;
  onRequestApiKeySetup: () => void; // New prop
}

export const FoodAnalyzerTool: React.FC<FoodAnalyzerToolProps> = ({ userApiKey, onAnalysisError, onRequestApiKeySetup }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [optionalDetail, setOptionalDetail] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedViewVisible, setDetailedViewVisible] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentLoadingTip, setCurrentLoadingTip] = useState<string>('');
  
  const [userRetryCount, setUserRetryCount] = useState<number>(0);
  const [isUserRetrying, setIsUserRetrying] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tipInterval: number;
    if (isLoading) {
      setCurrentLoadingTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
      tipInterval = setInterval(() => {
        setCurrentLoadingTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
      }, 5000) as any as number; 
    }
    return () => {
      clearInterval(tipInterval);
    };
  }, [isLoading]);


  const handleImageSelection = (file: File | null) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) { 
        setError('Image size exceeds 10MB. Please choose a smaller file.');
        setSelectedImage(null);
        setImagePreviewUrl(null);
        return;
      }
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setAnalysisResult(null);
      setDetailedViewVisible(false);
      setUserRetryCount(0);
      setIsUserRetrying(false);
      setError(null);
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };
  
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleImageSelection(event.target.files && event.target.files[0] ? event.target.files[0] : null);
  };
  
  useEffect(() => {
    let currentPreviewUrl = imagePreviewUrl;
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const performAnalysis = useCallback(async (
    apiKey: string, // Explicitly string here, checked before call
    base64Img: string, 
    imgType: string, 
    optDetail: string, 
    prevContext: AnalysisResult | null,
    userRetryNum: number | null,
    additionalUserDetail: string | null
  ) => {
      const result = await analyzeFoodImage(apiKey, base64Img, imgType, optDetail, prevContext, userRetryNum, additionalUserDetail);
      setAnalysisResult(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedImage) {
      setError('Please select an image first.');
      return;
    }
    if (!userApiKey) { // Check if userApiKey is null or empty
      // This case should ideally be handled by onRequestApiKeySetup,
      // but this is a safeguard if button logic fails.
      setError('API Key is not set. Please configure your API Key via the "Set API Key to Analyze" button or "Manage API Key".');
      onAnalysisError('API Key is not set. Please configure your API Key.');
      onRequestApiKeySetup(); // Prompt user to set key
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setDetailedViewVisible(false);
    setUserRetryCount(0);
    setIsUserRetrying(false);

    try {
      const base64Image = await convertFileToBase64(selectedImage);
      await performAnalysis(userApiKey, base64Image, selectedImage.type, optionalDetail, null, null, null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during initial analysis.';
      console.error('Initial analysis error:', err);
      setError(errorMessage);
      onAnalysisError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage, optionalDetail, userApiKey, performAnalysis, onAnalysisError, onRequestApiKeySetup]);

  const handleUserReanalysis = useCallback(async (additionalUserDetail: string | null) => {
    if (!selectedImage || !analysisResult || userRetryCount >= MAX_USER_RETRIES) {
      return;
    }
     if (!userApiKey) { // Check if userApiKey is null or empty
      setError('API Key is not set for re-analysis. Please configure your API Key.');
      onAnalysisError('API Key is not set for re-analysis. Please configure your API Key.');
      onRequestApiKeySetup(); // Prompt user to set key
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsUserRetrying(true);
    const nextUserRetryNum = userRetryCount + 1;

    try {
      const base64Image = await convertFileToBase64(selectedImage);
      await performAnalysis(userApiKey, base64Image, selectedImage.type, optionalDetail, analysisResult, nextUserRetryNum, additionalUserDetail);
      setUserRetryCount(nextUserRetryNum);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `An unknown error occurred during re-analysis attempt ${nextUserRetryNum}.`;
      console.error(`User re-analysis error (Attempt ${nextUserRetryNum}):`, err);
      setError(errorMessage);
      onAnalysisError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage, optionalDetail, analysisResult, userRetryCount, userApiKey, performAnalysis, onAnalysisError, onRequestApiKeySetup]);
  
  const triggerFileInput = () => {
    if (!isLoading) fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!isLoading && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelection(e.dataTransfer.files[0]);
    }
  };
  
  const renderActionButton = () => {
    if (isLoading) {
      return (
        <button
          disabled
          aria-busy="true"
          className="w-full flex items-center justify-center button-modern-primary text-lg font-semibold py-3.5"
        >
          Analyzing...
        </button>
      );
    }

    if (selectedImage) {
      if (!userApiKey) {
        return (
          <button
            onClick={onRequestApiKeySetup}
            className="w-full flex items-center justify-center button-modern-primary text-lg font-semibold py-3.5" 
          >
            Set API Key to Analyze
          </button>
        );
      }
      return (
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center button-modern-primary text-lg font-semibold py-3.5"
        >
          Analyze My Meal
        </button>
      );
    }

    return (
      <button
        disabled
        className="w-full flex items-center justify-center button-modern-primary text-lg font-semibold py-3.5"
      >
        Select an Image to Start
      </button>
    );
  };

  return (
    <section 
      id="analyzer-tool" 
      className="modern-card p-6 sm:p-8 rounded-2xl min-h-[420px] flex flex-col justify-center w-full max-w-5xl mx-auto"
      aria-labelledby="analyzer-section-title"
    >
      {isLoading ? (
        <EngagingLoader 
          tip={currentLoadingTip} 
          isUserInitiatedRetry={isUserRetrying}
          userRetryAttempt={isUserRetrying ? userRetryCount + 1 : 0}
          maxUserRetries={MAX_USER_RETRIES}
        />
      ) : (
        <div className="space-y-6 animate-fadeInScale">
           <div className="text-center">
             <span className="modern-pill-label">Step 1: Upload</span>
            <h2 id="analyzer-section-title" className="text-3xl font-semibold text-[var(--modern-text-primary)] mb-1">
              Your Meal Awaits Analysis
            </h2>
            <p className="text-[var(--modern-text-secondary)] text-sm">Provide a photo and any specific details.</p>
           </div>
          <div>
            <div 
              className={`file-drop-zone mt-2 flex flex-col items-center justify-center w-full h-44 sm:h-52 px-4 pt-5 pb-6 rounded-xl cursor-pointer ${isDragging ? 'active-drag' : ''}`}
              onClick={triggerFileInput}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              role="button"
              aria-label="Upload food image"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFileInput(); }}
            >
              <div className="space-y-2 text-center">
                <svg className={`mx-auto h-14 w-14 text-[var(--modern-text-tertiary)] transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className={`flex text-lg text-[var(--modern-text-secondary)] transition-colors duration-300 upload-text ${isDragging ? 'text-[var(--modern-accent-secondary)]' : ''}`}>
                  {selectedImage ? (
                      <>
                      <span className="font-semibold text-modern-accent-primary px-1 truncate max-w-[200px] sm:max-w-xs md:max-w-md">{selectedImage.name}</span>
                      <p className="pl-1 text-[var(--modern-text-secondary)]">selected.</p>
                      </>
                  ) : (
                      <>
                      <span className="font-semibold text-modern-accent-primary hover:text-[#0056b3] focus-within:outline-none modern-focus-ring px-1">
                      Click to upload
                      </span>
                      <input id="food-image-upload" name="food-image-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleImageChange} ref={fileInputRef} />
                      <p className="pl-1 text-[var(--modern-text-secondary)]">or drag & drop</p>
                      </>
                  )}
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 10MB</p>
              </div>
            </div>
          </div>

          {imagePreviewUrl && <ImagePreview src={imagePreviewUrl} alt="Selected food" className="border-[var(--modern-border-primary)] mt-6 shadow-lg" />}

          <div>
            <label htmlFor="optional-detail" className="block text-base font-medium text-[var(--modern-text-primary)] mb-2">
              Optional Details <span className="text-xs text-[var(--modern-text-secondary)]">(e.g., "lunch with extra cheese")</span>
            </label>
            <input
              id="optional-detail"
              type="text"
              value={optionalDetail}
              onChange={(e) => setOptionalDetail(e.target.value)}
              placeholder="Any specific notes about your meal..."
              className="modern-input"
            />
          </div>
          
          {renderActionButton()}

        </div>
      )}
        
      <div ref={resultsRef} aria-live="polite" className="mt-6">
        {error && !isLoading && <Alert type="error" message={error} className="mt-8" />}
        
        {analysisResult && !isLoading && <div className="section-divider my-6 sm:my-8"></div>}

        {analysisResult && !isLoading && (
          <div className="space-y-8 animate-fadeInScale" aria-labelledby="analysis-results-title">
            <div className="text-center">
              <span className="modern-pill-label">Step 2: Results</span>
              <h2 id="analysis-results-title" className="text-4xl font-bold text-super-gradient-modern mb-3 inline-block">
                Your Meal Analysis
              </h2>
            </div>
            <QuickScanDashboard 
              analysisResult={analysisResult}
              onToggleDetailedView={() => setDetailedViewVisible(prev => !prev)}
              isDetailedViewVisible={detailedViewVisible}
              imagePreviewUrl={imagePreviewUrl}
              handleUserReanalysis={handleUserReanalysis}
              userRetryCount={userRetryCount}
              maxUserRetries={MAX_USER_RETRIES}
            />
            {detailedViewVisible && <DetailedAnalysisView analysisResult={analysisResult} />}
          </div>
        )}
      </div>
    </section>
  );
};
