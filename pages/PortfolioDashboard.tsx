import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Holding, Signal } from '../types';
import AllocationChart from '../components/AllocationChart';
import PortfolioSummary from '../components/PortfolioSummary';
import SignalCard from '../components/SignalCard';
import { fetchData } from '../services/dataService';
import { ENDPOINTS } from '../config/apiConfig';
import { RefreshIcon } from '../components/icons/Icons';


const PortfolioDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts'>('overview');
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const holdingsData = await fetchData<Holding[]>(ENDPOINTS.PORTFOLIO_HOLDINGS);
            const signalsData = await fetchData<Signal[]>(ENDPOINTS.PORTFOLIO_SIGNALS);
            setHoldings(holdingsData);
            setSignals(signalsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load dashboard data. Check backend connection.");
        } finally {
            setIsLoading(false);
        }
    };
    
    loadDashboardData();
  }, []);

  const handleSyncFyers = async () => {
      setIsSyncing(true);
      setSyncError(null);
      try {
          const liveHoldings = await fetchData<Holding[]>(ENDPOINTS.BROKER_HOLDINGS);
          setHoldings(liveHoldings);
          setActiveTab('overview'); // Switch to overview to show new data
      } catch (err) {
          const apiError = await (err as Response)?.json?.().catch(() => null);
          const detail = apiError?.detail || (err instanceof Error ? err.message : "Failed to sync with broker.");
          setSyncError(detail);
      } finally {
          setIsSyncing(false);
      }
  };

  const TabButton: React.FC<{ tab: 'overview' | 'alerts'; title: string }> = ({ tab, title }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-md
        ${activeTab === tab
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
    >
      {title}
    </button>
  );
  
  if (isLoading) {
      return (
          <div className="text-center p-10 text-gray-500 animate-pulse">
              Loading dashboard data...
          </div>
      );
  }

  if (error) {
      return (
          <div className="bg-red-900/50 text-red-300 p-4 rounded-lg">
              {error}
          </div>
      );
  }


  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex space-x-2">
          <TabButton tab="overview" title="Overview" />
          <TabButton tab="alerts" title="Alerts" />
        </div>
        <button
            onClick={handleSyncFyers}
            disabled={isSyncing}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-teal-800 disabled:cursor-not-allowed transition-colors duration-200"
        >
            {isSyncing ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <RefreshIcon className="w-5 h-5" />
            )}
            <span>{isSyncing ? 'Syncing...' : 'Sync with Fyers'}</span>
        </button>
      </div>

       {syncError && <div className="bg-red-900/50 text-red-300 p-4 rounded-lg -mt-4">{syncError}</div>}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <AllocationChart data={holdings} />
              </div>
              <div className="lg:col-span-2">
                <PortfolioSummary holdings={holdings} />
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-200">Active Trading Signals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {signals.map(signal => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDashboard;