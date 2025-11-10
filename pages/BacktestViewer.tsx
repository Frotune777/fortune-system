import React, { useState } from 'react';
import { Trade, PerformanceMetricsData } from '../types';
import PerformanceMetrics from '../components/PerformanceMetrics';
import TradeTable from '../components/TradeTable';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { postData } from '../services/dataService';
import { ENDPOINTS } from '../config/apiConfig';


const BacktestViewer: React.FC = () => {
  const [results, setResults] = useState<{ trades: Trade[]; metrics: PerformanceMetricsData } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState('RELIANCE');
  const [strategy, setStrategy] = useState('rsi_bb');

  const handleRunBacktest = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const payload = { symbol, strategy };
      const data = await postData<typeof payload, { trades: Trade[]; metrics: PerformanceMetricsData }>(ENDPOINTS.BACKTEST, payload);
      
      if (!data.trades || !data.metrics || data.trades.length === 0) {
        setError("Backtest completed with no trades. Try different parameters or a different symbol.");
        return;
      }

      setResults(data);
    } catch (err) {
      const apiError = await (err as Response)?.json?.().catch(() => null);
      const detail = apiError?.detail || (err instanceof Error ? err.message : "Failed to run backtest. Check backend server.");
      setError(detail);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-8">
        <h2 className="text-xl font-bold mb-4">Run Backtest</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-300 mb-1">Symbol</label>
            <select id="symbol" value={symbol} onChange={e => setSymbol(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
              <option value="RELIANCE">Reliance</option>
              <option value="TCS">TCS</option>
            </select>
          </div>
          <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-gray-300 mb-1">Strategy</label>
            <select id="strategy" value={strategy} onChange={e => setStrategy(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all">
              <option value="rsi_bb">RSI + Bollinger Bands</option>
              <option value="mean_reversion">Mean Reversion</option>
            </select>
          </div>
          <button onClick={handleRunBacktest} disabled={isLoading} className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all">
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running...
                </>
            ) : 'Run Backtest'}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-8">{error}</div>}

      {results && (
        <div className="space-y-8">
          <PerformanceMetrics metrics={results.metrics} />

          <div>
             <h3 className="text-xl font-bold mb-4 text-gray-200">Equity Curve</h3>
             <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.metrics.equityCurve} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="trade" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                        <Line type="monotone" dataKey="equity" stroke="#6366F1" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <TradeTable trades={results.trades} />
        </div>
      )}
       {!results && !error && !isLoading && (
            <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-dashed border-gray-600">
                <p className="text-gray-500">Select parameters and run a backtest to see results.</p>
            </div>
        )}
        {isLoading && (
            <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-dashed border-gray-600">
                <p className="text-gray-400 animate-pulse">Running simulation on the server...</p>
            </div>
        )}
    </div>
  );
};

export default BacktestViewer;