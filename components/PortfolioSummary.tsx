import React from 'react';
import { motion } from 'framer-motion';
import { Holding } from '../types';

interface PortfolioSummaryProps {
  holdings: Holding[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ holdings }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-200">Holdings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
            <tr>
              <th scope="col" className="px-4 py-3">Asset</th>
              <th scope="col" className="px-4 py-3 text-right">Quantity</th>
              <th scope="col" className="px-4 py-3 text-right">Value</th>
              <th scope="col" className="px-4 py-3 text-right">Unrealized P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <motion.tr
                key={holding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-700 hover:bg-gray-700/50"
              >
                <td className="px-4 py-4 font-medium">
                  <div className="flex flex-col">
                    <span>{holding.name}</span>
                    <span className="text-xs text-gray-400">{holding.ticker}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">{holding.quantity.toLocaleString()}</td>
                <td className="px-4 py-4 text-right">${holding.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={`px-4 py-4 text-right font-semibold ${holding.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {holding.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioSummary;