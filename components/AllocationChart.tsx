import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Holding } from '../types';

interface AllocationChartProps {
  data: Holding[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg border border-gray-600">
        <p className="font-bold text-gray-200">{`${payload[0].name}`}</p>
        <p className="text-sm text-indigo-400">{`Value: $${payload[0].value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}</p>
        <p className="text-xs text-gray-400">{`(${payload[0].payload.percent.toFixed(2)}%)`}</p>
      </div>
    );
  }
  return null;
};

const AllocationChart: React.FC<AllocationChartProps> = ({ data }) => {
  const totalValue = data.reduce((sum, holding) => sum + holding.value, 0);
  
  const chartData = data.map(holding => ({
    name: holding.ticker,
    value: holding.value,
    percent: (holding.value / totalValue) * 100
  }));

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full">
        <h3 className="text-xl font-bold mb-4 text-gray-200">Asset Allocation</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default AllocationChart;