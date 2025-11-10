import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStrategy } from '../services/geminiService';
import { formatCode } from '../utils/formatResponse';
import StrategyOutput from '../components/StrategyOutput';
import { SparklesIcon } from '../components/icons/Icons';

type Notification = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

interface StrategyDesignerProps {
  isGeminiEnabled: boolean;
}

const StrategyDesigner: React.FC<StrategyDesignerProps> = ({ isGeminiEnabled }) => {
  const [prompt, setPrompt] = useState<string>('RSI + Bollinger Bands intraday strategy for BTC/USD on a 5-minute chart.');
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ id: Date.now(), message, type });
  };
  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);


  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      showNotification("Prompt cannot be empty.", "error");
      return;
    }
    setIsLoading(true);
    setNotification(null);
    setOutput(null);

    try {
      const result = await generateStrategy(prompt);
      const formattedResult = formatCode(result);
      setOutput(formattedResult);
      showNotification("Strategy generated successfully!", "success");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="relative">
       <AnimatePresence>
        {notification && (
           <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-lg z-50 ${
                notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl shadow-indigo-500/10 border border-gray-700">
        <div className="p-6">
          <label htmlFor="strategy-prompt-input" className="block text-sm font-medium text-gray-300 mb-2">
            Strategy Prompt
          </label>
          <textarea
            id="strategy-prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., High-frequency trading strategy using moving average crossover..."
            className="w-full h-24 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none text-gray-200"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !isGeminiEnabled}
            title={!isGeminiEnabled ? "Gemini API is disabled. Please enable it using the toggle in the header." : "Generate Strategy"}
            className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate Strategy
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-300 mb-2">Generated Output:</h2>
        <div className="w-full min-h-[200px] bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-inner">
          {output ? (
            <StrategyOutput output={output} />
          ) : (
             <div className="text-gray-500 text-center py-10">
                {isLoading 
                    ? <span className="animate-pulse">AI is thinking...</span> 
                    : "Your generated strategy will appear here."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyDesigner;