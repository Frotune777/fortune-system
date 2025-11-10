import React from 'react';
import { PerformanceMetricsData } from '../types';

interface PerformanceMetricsProps {
  metrics: PerformanceMetricsData;
}

const MetricCard: React.FC<{ title: string; value: string | number; colorClass: string }> = ({ title, value, colorClass }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
    <h4 className="text-sm text-gray-400 font-medium mb-1">{title}</h4>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-200">Performance Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard title="Total P&L" value={`$${metrics.totalPnl.toFixed(2)}`} colorClass={metrics.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'} />
        <MetricCard title="Win Rate" value={`${metrics.winRate.toFixed(2)}%`} colorClass="text-indigo-400" />
        <MetricCard title="Max Drawdown" value={`${metrics.maxDrawdown.toFixed(2)}%`} colorClass="text-red-400" />
        <MetricCard title="Sharpe Ratio" value={metrics.sharpeRatio.toFixed(2)} colorClass="text-yellow-400" />
        <MetricCard title="CAGR" value={`${metrics.cagr.toFixed(2)}%`} colorClass="text-teal-400" />
      </div>
    </div>
  );
};

export default PerformanceMetrics;
