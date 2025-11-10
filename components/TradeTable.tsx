import React from 'react';
import { Trade } from '../types';

interface TradeTableProps {
  trades: Trade[];
}

const TradeTable: React.FC<TradeTableProps> = ({ trades }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-200">Trade Log</h3>
      <div className="overflow-x-auto bg-gray-800/50 rounded-xl border border-gray-700 max-h-96">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Entry Price</th>
              <th scope="col" className="px-6 py-3">Exit Price</th>
              <th scope="col" className="px-6 py-3">P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4">{trade.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    trade.type === 'long' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {trade.type}
                  </span>
                </td>
                <td className="px-6 py-4">{trade.entry.toFixed(2)}</td>
                <td className="px-6 py-4">{trade.exit.toFixed(2)}</td>
                <td className={`px-6 py-4 font-semibold ${
                  trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {trade.pnl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeTable;
