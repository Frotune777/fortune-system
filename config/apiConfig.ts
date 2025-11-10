/**
 * Base URL for the backend API.
 * In a real-world scenario, you might use environment variables
 * to switch between development, staging, and production URLs.
 * e.g., export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
 */
export const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * API Endpoints
 * Centralizing endpoints can make them easier to manage.
 */
export const ENDPOINTS = {
  PORTFOLIO_HOLDINGS: '/api/portfolio/holdings',
  PORTFOLIO_SIGNALS: '/api/portfolio/signals',
  SIGNALS: '/api/signal',
  BACKTEST: '/api/backtest',
  GEMINI: '/api/gemini',
  BROKER_HOLDINGS: '/api/broker/holdings',
};