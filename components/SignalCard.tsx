import React from 'react';
import { motion } from 'framer-motion';
import { Signal } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './icons/Icons'; // Assuming you'd add these simple icons

interface SignalCardProps {
  signal: Signal;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const isBuy = signal.type === 'BUY';
  const cardBorderColor = isBuy ? 'border-green-500/50' : 'border-red-500/50';
  const textColor = isBuy ? 'text-green-400' : 'text-red-400';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`bg-gray-800/50 p-5 rounded-xl border-l-4 ${cardBorderColor} shadow-lg transition-all hover:shadow-indigo-500/20 hover:border-indigo-500/50`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xl font-bold text-gray-200">{signal.ticker}</p>
          <p className="text-xs text-gray-400">{signal.strategy}</p>
        </div>
        <div className={`flex items-center gap-1 font-bold text-lg ${textColor}`}>
          {isBuy ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
          <span>{signal.type}</span>
        </div>
      </div>
      <div className="mt-4 text-right">
        <p className="text-sm text-gray-400">Signal Price</p>
        <p className="text-2xl font-semibold text-gray-100">${signal.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-1">{new Date(signal.timestamp).toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default SignalCard;