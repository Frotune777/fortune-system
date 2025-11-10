export interface FileNode {
  name: string;
  type: 'folder' | 'file';
  content?: string;
  children?: FileNode[];
}

export interface Trade {
  id: number;
  date: string;
  type: 'long' | 'short';
  entry: number;
  exit: number;
  pnl: number;
}

export interface PerformanceMetricsData {
  totalPnl: number;
  winRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  cagr: number;
  equityCurve: { trade: number; equity: number }[];
}

export interface Holding {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
}

export interface Signal {
  id: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  price: number;
  timestamp: string;
  strategy: string;
}