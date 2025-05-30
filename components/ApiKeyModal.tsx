
import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  onClear: () => void;
  currentApiKey: string | null;
  error?: string | null;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onClear,
  currentApiKey,
  error,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    setApiKeyInput(currentApiKey || '');
  }, [currentApiKey, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(apiKeyInput);
  };

  const handleClearAndClose = () => {
    onClear();
    // onClose(); // Optionally close after clearing, or let user re-enter
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeInScale"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apiKeyModalTitle"
    >
      <div 
        className="modern-card p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg relative transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--modern-text-tertiary)] hover:text-[var(--modern-text-primary)] transition-colors"
          aria-label="Close API Key modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="apiKeyModalTitle" className="text-2xl sm:text-3xl font-bold text-super-gradient-modern mb-5 text-center">
          Configure Gemini API Key
        </h2>
        
        <p className="text-[var(--modern-text-secondary)] text-sm mb-5 text-center">
          To use FoodLens AI, please enter your Google Gemini API Key. 
          You can obtain one from {' '}
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--modern-accent-primary)] hover:underline font-medium"
          >
            Google AI Studio
          </a>.
          Your key is stored locally in your browser and is not shared elsewhere.
        </p>

        {error && (
          <div className="bg-[var(--modern-accent-danger)]/10 border border-[var(--modern-accent-danger)]/30 text-[var(--modern-accent-danger)] text-sm p-3 rounded-lg mb-4 text-center" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="apiKeyInput" className="block text-base font-medium text-[var(--modern-text-primary)] mb-1.5">
              Your Gemini API Key
            </label>
            <input
              id="apiKeyInput"
              type="password" // Use password type for sensitive input
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter your API Key here"
              className="modern-input"
              aria-describedby="apiKeyDescription"
            />
            <p id="apiKeyDescription" className="text-xs text-[var(--modern-text-tertiary)] mt-1.5">
                This key will be saved in your browser's local storage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <button
              onClick={handleSave}
              className="button-modern-primary w-full py-3 text-base"
            >
              Save API Key
            </button>
            {currentApiKey && (
               <button
                onClick={handleClearAndClose}
                className="button-modern-secondary w-full py-3 text-base border-[var(--modern-accent-danger)] text-[var(--modern-accent-danger)] hover:bg-[var(--modern-accent-danger)] hover:text-white"
              >
                Clear Saved Key
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};