import React from 'react';

interface StrategyOutputProps {
  output: string;
}

const StrategyOutput: React.FC<StrategyOutputProps> = ({ output }) => {
  return (
    <div className="bg-gray-900/50 rounded-lg p-4 text-left overflow-x-auto">
      <pre className="whitespace-pre-wrap break-words text-sm text-gray-300">
        <code>{output}</code>
      </pre>
    </div>
  );
};

export default StrategyOutput;
