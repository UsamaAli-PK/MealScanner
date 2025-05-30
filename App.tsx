
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { analyzeFoodImage } from './services/geminiService';
import type { AnalysisResult } from './types';
import { Alert } from './components/Alert';
import { FoodAnalyzerTool } from './components/FoodAnalyzerTool';
import { EngagingLoader } from './components/EngagingLoader';
import { DeveloperCard } from './components/DeveloperCard';
import { ApiKeyModal } from './components/ApiKeyModal';

// Helper function for smooth scrolling
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


// --- Landing Page Sections ---

const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <section className="w-full text-center py-10 sm:py-16 md:py-20 min-h-[60vh] flex flex-col justify-center items-center">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-super-gradient-modern leading-tight mb-4 sm:mb-5 animate-fadeInScale">
        Unlock Your Plate's Secrets
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl text-[var(--modern-text-secondary)] mb-8 sm:mb-10 max-w-3xl mx-auto animate-fadeInScale" style={{ animationDelay: '0.3s' }}>
        Instantly analyze food photos for detailed nutritional insights, health assessments, and personalized advice with our AI-powered journal.
      </p>
      <button
        onClick={onCTAClick}
        className="button-modern-primary text-xl sm:text-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-xl animate-fadeInScale"
        style={{ animationDelay: '0.6s' }}
      >
        Analyze Your Meal Now
      </button>
    </div>
  </section>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationDelay?: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, animationDelay }) => (
  <div className={`modern-card p-6 rounded-xl text-center animate-slideUpFadeIn ${animationDelay || ''}`}>
    <div className="flex justify-center items-center mb-5 text-[var(--modern-accent-primary)] w-16 h-16 mx-auto bg-[var(--modern-bg-primary)] rounded-full border border-[var(--modern-border-primary)]">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-[var(--modern-text-primary)] mb-3">{title}</h3>
    <p className="text-[var(--modern-text-secondary)] text-sm leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => (
  <section id="features" className="py-8 sm:py-12">
    <div className="text-center mb-6 sm:mb-8">
      <span className="modern-pill-label">Key Benefits</span>
      <h2 className="text-4xl sm:text-5xl font-bold text-super-gradient-modern mb-3">
        Why FoodLens AI?
      </h2>
      <p className="text-lg text-[var(--modern-text-secondary)] max-w-2xl mx-auto">
        Discover the power of understanding your food on a deeper level.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
      <FeatureCard
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        title="Instant Analysis"
        description="Get nutritional breakdowns in seconds. No more guesswork, just quick, actionable data."
        animationDelay="animate-slideUpFadeIn-delay-1"
      />
      <FeatureCard
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
        title="Accurate Identification"
        description="Our AI recognizes a wide variety of food items with impressive precision."
        animationDelay="animate-slideUpFadeIn-delay-2"
      />
      <FeatureCard
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        title="Health Score & Advice"
        description="Understand if your meal is healthy and receive tailored tips to improve your choices."
        animationDelay="animate-slideUpFadeIn-delay-3"
      />
      <FeatureCard
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
        title="Visual Learning"
        description="Connect visual cues from your meal photos to their nutritional impact effortlessly."
        animationDelay="animate-slideUpFadeIn-delay-4"
      />
    </div>
  </section>
);

interface HowItWorksStepProps {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  animationDelay?: string;
}
const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ stepNumber, title, description, icon, animationDelay }) => (
  <div className={`modern-card p-6 sm:p-8 rounded-2xl relative overflow-hidden animate-slideUpFadeIn group ${animationDelay || ''}`}>
    <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-[var(--modern-accent-primary)] to-[var(--modern-accent-secondary)] rounded-full flex items-center justify-center text-3xl font-bold text-white opacity-20 group-hover:opacity-30 transition-opacity">
       {stepNumber}
    </div>
     <div className="relative z-10">
      <div className="flex justify-start items-center mb-5 text-[var(--modern-accent-primary)] w-16 h-16 ml-auto mr-auto sm:ml-0 sm:mr-auto bg-[var(--modern-bg-primary)] rounded-xl border border-[var(--modern-border-primary)] p-3">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-[var(--modern-text-primary)] mb-3">{title}</h3>
      <p className="text-[var(--modern-text-secondary)] text-base leading-relaxed">{description}</p>
    </div>
  </div>
);

const HowItWorksSection: React.FC = () => (
  <section id="how-it-works" className="py-8 sm:py-12 bg-[var(--modern-bg-primary)]">
    <div className="text-center mb-6 sm:mb-8">
      <span className="modern-pill-label">Easy Process</span>
      <h2 className="text-4xl sm:text-5xl font-bold text-super-gradient-modern mb-3">
        Get Started in 3 Simple Steps
      </h2>
      <p className="text-lg text-[var(--modern-text-secondary)] max-w-2xl mx-auto">
        Analyzing your meals has never been easier.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      <HowItWorksStep
        stepNumber="01"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        title="Snap or Select Photo"
        description="Upload a clear picture of your meal. The better the image, the more accurate the analysis."
        animationDelay="animate-slideUpFadeIn-delay-1"
      />
      <HowItWorksStep
        stepNumber="02"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        title="AI Performs Its Magic"
        description="Our advanced AI meticulously identifies food items, estimates portions, and calculates nutrients."
        animationDelay="animate-slideUpFadeIn-delay-2"
      />
      <HowItWorksStep
        stepNumber="03"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        title="Unlock Your Insights"
        description="Receive a detailed report, health assessment, and personalized advice to make informed choices."
        animationDelay="animate-slideUpFadeIn-delay-3"
      />
    </div>
  </section>
);


const BackToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Scroll back to top"
    className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--modern-accent-primary)] text-white shadow-lg hover:bg-[var(--modern-accent-primary-darker)] focus:outline-none modern-focus-ring transition-all duration-300 ease-in-out transform hover:scale-110"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </button>
);


// --- Main App Component (Landing Page Orchestrator) ---
const App: React.FC = () => {
  const simpleNavRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [userApiKey, setUserApiKey] = useState<string | null>(null);
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);


  useEffect(() => {
    const storedApiKey = localStorage.getItem('userGeminiApiKey');
    if (storedApiKey) {
      setUserApiKey(storedApiKey);
      setIsApiKeySet(true);
    } else {
      setIsApiKeySet(false);
    }
  }, []);

  const handleApiKeySave = (key: string) => {
    const trimmedKey = key.trim();
    if(trimmedKey !== "") {
      localStorage.setItem('userGeminiApiKey', trimmedKey);
      setUserApiKey(trimmedKey);
      setIsApiKeySet(true);
      setIsApiKeyModalOpen(false);
      setApiKeyError(null);
    } else {
      setApiKeyError("API Key cannot be empty.");
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('userGeminiApiKey');
    setUserApiKey(null);
    setIsApiKeySet(false);
    setIsApiKeyModalOpen(true);
  };

  const handleManageApiKey = () => {
    setApiKeyError(null);
    setIsApiKeyModalOpen(true);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (simpleNavRef.current) {
        if (window.scrollY > 20) {
          simpleNavRef.current.classList.add('nav-scrolled');
        } else {
          simpleNavRef.current.classList.remove('nav-scrolled');
        }
      }
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisError = (errorMessage: string) => {
    if (errorMessage.toLowerCase().includes("api key") || errorMessage.toLowerCase().includes("authentication")) {
      setApiKeyError("Analysis failed. Please check if your API Key is valid and has permissions. You can update it via 'Manage API Key'.");
      setIsApiKeyModalOpen(true);
    }
  };

  const handleAnalyzeMealClick = () => {
    if (!isApiKeySet) {
      setApiKeyError("Please set your API key to use the analyzer.");
      setIsApiKeyModalOpen(true);
    } else {
      scrollToSection('analyzer-tool-section');
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--modern-bg-primary)]">
      <div ref={simpleNavRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
           style={{ background: 'rgba(255, 255, 255, 0.8)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior: 'smooth'});}} className="text-3xl font-bold text-super-gradient-modern cursor-pointer">
                FoodLens AI
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className="text-[var(--modern-text-secondary)] hover:text-[var(--modern-text-primary)] px-3 py-2 rounded-md text-base font-medium cursor-pointer">Features</a>
              <a href="#how-it-works" className="text-[var(--modern-text-secondary)] hover:text-[var(--modern-text-primary)] px-3 py-2 rounded-md text-base font-medium cursor-pointer">How It Works</a>
              <a href="#developer-section" className="text-[var(--modern-text-secondary)] hover:text-[var(--modern-text-primary)] px-3 py-2 rounded-md text-base font-medium cursor-pointer">About</a>
              <button onClick={handleManageApiKey} className="text-[var(--modern-text-secondary)] hover:text-[var(--modern-text-primary)] px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                Manage API Key
              </button>
              <button
                onClick={handleAnalyzeMealClick}
                className="button-modern-secondary px-5 py-2.5 text-sm"
                title="Analyze Meal"
              >
                Analyze Meal
              </button>
            </div>
            <div className="md:hidden flex items-center space-x-2">
                 <button onClick={handleManageApiKey} className="text-[var(--modern-text-secondary)] hover:text-[var(--modern-text-primary)] p-2 rounded-md text-sm" aria-label="Manage API Key">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a1 1 0 011-1h2.056A4.002 4.002 0 017 9V7a2 2 0 012-2h0a2 2 0 012 2v.28A2 2 0 0113 9v2h1.5A2.5 2.5 0 0018 8.5V7a2 2 0 012-2h0z" /></svg>
                </button>
                <button
                    onClick={handleAnalyzeMealClick}
                    className="button-modern-primary px-4 py-2 text-sm"
                    title="Analyze"
                >
                    Analyze
                </button>
            </div>
          </div>
        </div>
      </div>

      {isApiKeyModalOpen && (
        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
          onSave={handleApiKeySave}
          currentApiKey={userApiKey}
          error={apiKeyError}
          onClear={handleClearApiKey}
        />
      )}

      <HeroSection onCTAClick={() => {
        if (!isApiKeySet) {
          setApiKeyError("Please set your API key to use the analyzer.");
          setIsApiKeyModalOpen(true);
        } else {
          scrollToSection('analyzer-tool-section');
        }
      }} />

      <main className="w-full space-y-8 sm:space-y-12 md:space-y-16 px-4">
        <FeaturesSection />
        <HowItWorksSection />

        <section id="analyzer-tool-section" className="py-8 sm:py-12">
          <div className="text-center mb-6 sm:mb-8">
            <span className="modern-pill-label">Try It Out</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-super-gradient-modern mb-3">
              Analyze Your Meal
            </h2>
            <p className="text-lg text-[var(--modern-text-secondary)] max-w-2xl mx-auto">
              Upload an image and discover the nutritional secrets hidden in your plate.
              {!isApiKeySet && (
                <span className="block text-sm text-[var(--modern-accent-danger)] mt-2">
                  An API key is required to use the analyzer.
                  <button onClick={handleManageApiKey} className="ml-2 underline hover:text-[var(--modern-accent-danger)]/80 font-medium">Set API Key</button>
                </span>
              )}
            </p>
          </div>
          <FoodAnalyzerTool
            userApiKey={userApiKey}
            onAnalysisError={handleAnalysisError}
            onRequestApiKeySetup={handleManageApiKey}
          />
        </section>

        <div className="section-divider max-w-4xl mx-auto"></div>

        <section id="developer-section" className="py-8 sm:py-12 animate-fadeInScale">
             <div className="text-center mb-6 sm:mb-8">
                <span className="modern-pill-label">The Creator</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-super-gradient-modern mb-3">
                    Meet The Developer
                </h2>
             </div>
             <DeveloperCard />
        </section>
      </main>

      <footer className="w-full mt-12 sm:mt-16 mb-8 text-center text-[var(--modern-text-secondary)] text-sm px-4">
        <div className="section-divider max-w-xs mx-auto mb-6"></div>
        {/* Footer content removed as per request */}
      </footer>

      {showBackToTop && <BackToTopButton onClick={handleBackToTopClick} />}
    </div>
  );
};

export default App;
