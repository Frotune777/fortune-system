import React, { useState, useCallback } from 'react';
import { generateFileSystem } from './services/geminiService';
import { FileNode } from './types';
import FileTree from './components/FileTree';
import { SparklesIcon, DocumentDuplicateIcon } from './components/icons/Icons';
import StrategyDesigner from './pages/StrategyDesigner';
import BacktestViewer from './pages/BacktestViewer';
import PortfolioDashboard from './pages/PortfolioDashboard';
import ToggleSwitch from './components/ToggleSwitch';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(`Create a new React + TypeScript project titled “Fortune AI Trading System”.

Use TailwindCSS (dark theme) and Framer Motion for animations.

Project folders:
- components/
- pages/
- services/
- utils/
- styles/
- assets/
- config/

Main goals:
- Modular structure
- Fully typed with TypeScript
- Mobile responsive UI
- Prepare for API integration later

Generate:
- index.html
- index.tsx
- App.tsx
- tailwind.config.js
- styles/global.css`);
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('scaffolder');
  const [isGeminiEnabled, setIsGeminiEnabled] = useState<boolean>(true);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setFileTree(null);

    try {
      const result = await generateFileSystem(prompt);
      setFileTree(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(prompt).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };
  
  const TabButton: React.FC<{ view: string; title: string; }> = ({ view, title }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-t-lg whitespace-nowrap
        ${activeView === view
          ? 'border-b-2 border-indigo-400 text-white'
          : 'text-gray-400 hover:text-white'
        }`}
    >
      {title}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
            Fortune AI Trading System
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered tools for modern project scaffolding and strategy design.
          </p>
        </header>
        
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-700 mb-8 gap-4 sm:gap-0">
            <div className="flex overflow-x-auto -mb-px w-full sm:w-auto">
                <TabButton view="scaffolder" title="Project Scaffolder" />
                <TabButton view="strategy" title="Strategy Designer" />
                <TabButton view="backtest" title="Backtest Viewer" />
                <TabButton view="dashboard" title="Portfolio Dashboard" />
            </div>
            <div className="flex items-center gap-3 py-2 sm:py-0">
                <label htmlFor="gemini-toggle" className="text-sm font-medium text-gray-300 whitespace-nowrap">Gemini API</label>
                <ToggleSwitch
                    id="gemini-toggle"
                    checked={isGeminiEnabled}
                    onChange={() => setIsGeminiEnabled(!isGeminiEnabled)}
                />
            </div>
        </div>

        <main className="w-full">
          {activeView === 'scaffolder' && (
             <>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl shadow-indigo-500/10 border border-gray-700">
                    <div className="p-6">
                    <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Description
                    </label>
                    <div className="relative">
                        <textarea
                        id="prompt-input"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Create a React app with components, services, and hooks folders..."
                        className="w-full h-32 p-4 pr-12 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none text-gray-200"
                        rows={4}
                        disabled={isLoading}
                        />
                        <button
                        onClick={handleCopyToClipboard}
                        className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                        aria-label="Copy prompt"
                        title="Copy prompt"
                        >
                        <DocumentDuplicateIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !isGeminiEnabled}
                        title={!isGeminiEnabled ? "Gemini API is disabled. Please enable it using the toggle in the header." : "Generate Project Structure"}
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
                            Generate Structure
                        </>
                        )}
                    </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-300 mb-2">Generated Structure:</h2>
                    <div className="w-full min-h-[200px] bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-inner">
                    {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                    {fileTree ? (
                        <FileTree node={fileTree} />
                    ) : (
                        !isLoading && (
                        <div className="text-gray-500 text-center py-10">
                            Your project structure will appear here.
                        </div>
                        )
                    )}
                    {isLoading && (
                        <div className="text-gray-500 text-center py-10 animate-pulse">
                            Analyzing prompt and building tree...
                        </div>
                        )}
                    </div>
                </div>
            </>
          )}
          {activeView === 'strategy' && <StrategyDesigner isGeminiEnabled={isGeminiEnabled} />}
          {activeView === 'backtest' && <BacktestViewer />}
          {activeView === 'dashboard' && <PortfolioDashboard />}
        </main>
      </div>
    </div>
  );
};

export default App;