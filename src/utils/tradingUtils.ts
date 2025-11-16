// Trading utility functions for CryptoScope AI Pro Frontend

import { TradeAnalysis } from '../data/demoData';

/**
 * Get color class based on confidence level
 */
export const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 90) return "text-green-400";
    if (confidence >= 80) return "text-green-400";
    if (confidence >= 70) return "text-yellow-400";
    if (confidence >= 60) return "text-orange-400";
    return "text-red-400";
};

/**
 * Get background color class based on confidence level
 */
export const getConfidenceBgColor = (confidence: number): string => {
    if (confidence >= 90) return "bg-green-500/20";
    if (confidence >= 80) return "bg-green-500/20";
    if (confidence >= 70) return "bg-yellow-500/20";
    if (confidence >= 60) return "bg-orange-500/20";
    return "bg-red-500/20";
};

/**
 * Get decision color class
 */
export const getDecisionColor = (decision: string): string => {
    switch (decision) {
        case "LONG": return "text-green-400";
        case "SHORT": return "text-red-400";
        default: return "text-gray-400";
    }
};

/**
 * Get decision background color class
 */
export const getDecisionBgColor = (decision: string): string => {
    switch (decision) {
        case "LONG": return "bg-green-500/20";
        case "SHORT": return "bg-red-500/20";
        default: return "bg-gray-500/20";
    }
};

/**
 * Get indicator icon based on value
 */
export const getIndicatorIcon = (value: string): string => {
    switch (value.toLowerCase()) {
        case "bullish": return "↗️";
        case "bearish": return "↘️";
        case "uptrend": return "📈";
        case "downtrend": return "📉";
        case "sideways": return "➡️";
        default: return "➖";
    }
};

/**
 * Get indicator color class
 */
export const getIndicatorColor = (value: string): string => {
    switch (value.toLowerCase()) {
        case "bullish":
        case "uptrend": return "text-green-400";
        case "bearish":
        case "downtrend": return "text-red-400";
        case "neutral":
        case "sideways": return "text-gray-400";
        default: return "text-blue-400";
    }
};

/**
 * Format price with proper decimal places
 */
export const formatPrice = (price: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(price);
};

/**
 * Format currency with proper formatting
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Calculate risk-reward ratio
 */
export const calculateRiskRewardRatio = (entry: number, stopLoss: number, takeProfit: number): number => {
    const risk = Math.abs(entry - stopLoss);
    const reward = Math.abs(takeProfit - entry);
    return reward / risk;
};

/**
 * Get position size recommendation based on confidence
 */
export const getPositionSizeRecommendation = (confidence: number): string => {
    if (confidence >= 90) return "Maximum position size (high confidence)";
    if (confidence >= 80) return "Large position size (good confidence)";
    if (confidence >= 70) return "Medium position size (acceptable confidence)";
    return "Small position size (low confidence)";
};

/**
 * Get timeframe description
 */
export const getTimeframeDescription = (timeframe: string): string => {
    const descriptions: { [key: string]: string } = {
        '1m': 'Scalping - Very short term',
        '5m': 'Scalping - Short term',
        '15m': 'Swing trading - Medium term',
        '1h': 'Swing trading - Medium term',
        '4h': 'Position trading - Long term',
        '1d': 'Position trading - Very long term'
    };
    return descriptions[timeframe] || 'Unknown timeframe';
};

/**
 * Get stop loss percentage based on timeframe
 */
export const getStopLossPercentage = (timeframe: string): number => {
    const percentages: { [key: string]: number } = {
        '1m': 0.005,   // 0.5%
        '5m': 0.005,   // 0.5%
        '15m': 0.01,   // 1%
        '1h': 0.01,    // 1%
        '4h': 0.02,    // 2%
        '1d': 0.02     // 2%
    };
    return percentages[timeframe] || 0.01;
};

/**
 * Validate file upload
 */
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (file.size > maxSize) {
        return { valid: false, error: 'File size must be less than 10MB' };
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Please upload a valid image file (PNG, JPG, WebP)' };
    }

    return { valid: true };
};

/**
 * Get analysis summary text
 */
export const getAnalysisSummaryText = (analysis: TradeAnalysis): string => {
    const { bullish_signals, bearish_signals, required_agreement } = analysis.analysis_summary;

    if (bullish_signals >= required_agreement) {
        return `Strong bullish signals (${bullish_signals}/${required_agreement} required)`;
    } else if (bearish_signals >= required_agreement) {
        return `Strong bearish signals (${bearish_signals}/${required_agreement} required)`;
    } else {
        return `Mixed signals - insufficient agreement (${Math.max(bullish_signals, bearish_signals)}/${required_agreement} required)`;
    }
};

/**
 * Get confidence level description
 */
export const getConfidenceLevel = (confidence: number): string => {
    if (confidence >= 90) return "Excellent";
    if (confidence >= 80) return "Good";
    if (confidence >= 70) return "Acceptable";
    if (confidence >= 60) return "Poor";
    return "Very Poor";
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

/**
 * Get trading pair display name
 */
export const getPairDisplayName = (pair: string): string => {
    return pair.replace('USDT', '/USDT');
};

/**
 * Calculate potential profit/loss
 */
export const calculatePotentialPL = (
    entry: number,
    stopLoss: number,
    takeProfit: number,
    positionSize: number
): { risk: number; reward: number } => {
    const risk = Math.abs(entry - stopLoss) * positionSize;
    const reward = Math.abs(takeProfit - entry) * positionSize;
    return { risk, reward };
};

export default {
    getConfidenceColor,
    getConfidenceBgColor,
    getDecisionColor,
    getDecisionBgColor,
    getIndicatorIcon,
    getIndicatorColor,
    formatPrice,
    formatCurrency,
    calculateRiskRewardRatio,
    getPositionSizeRecommendation,
    getTimeframeDescription,
    getStopLossPercentage,
    validateFileUpload,
    getAnalysisSummaryText,
    getConfidenceLevel,
    formatTimestamp,
    getPairDisplayName,
    calculatePotentialPL
};
