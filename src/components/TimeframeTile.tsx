"use client"

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity, Zap, BarChart3 } from 'lucide-react';

interface TimeframeData {
  trend?: string;
  adx?: number;
  ema20?: number;
  ema50?: number;
  rsi?: number;
  macd?: string;
  trend_strength?: string;
  plus_di?: number;
  minus_di?: number;
  price?: number;
  entry_trigger?: string | null;
  support?: number;
  resistance?: number;
  adx_strength?: string;
  adx_direction?: string;
  histogram?: number;
}

interface TimeframeTileProps {
  timeframe: string;
  data: TimeframeData;
}

export default function TimeframeTile({ timeframe, data }: TimeframeTileProps) {
  const getTrendConfig = (trend: string = '') => {
    if (trend.includes('up')) {
      return {
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 border-emerald-200',
        icon: TrendingUp,
        gradient: 'from-emerald-400 to-green-400'
      };
    }
    if (trend.includes('down')) {
      return {
        color: 'text-rose-600',
        bgColor: 'bg-rose-50 border-rose-200',
        icon: TrendingDown,
        gradient: 'from-rose-400 to-red-400'
      };
    }
    return {
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      icon: Minus,
      gradient: 'from-amber-400 to-yellow-400'
    };
  };

  const getStrengthColor = (strength: string = '') => {
    switch (strength) {
      case 'strong': return 'text-emerald-600 bg-emerald-100';
      case 'moderate': return 'text-amber-600 bg-amber-100';
      case 'weak': return 'text-rose-600 bg-rose-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getIndicatorColor = (value: number, type: 'rsi' | 'adx' | 'macd' = 'rsi') => {
    if (type === 'rsi') {
      if (value > 70) return 'text-rose-600';
      if (value < 30) return 'text-emerald-600';
      return 'text-slate-600';
    }
    if (type === 'adx') {
      if (value > 25) return 'text-emerald-600';
      if (value > 20) return 'text-amber-600';
      return 'text-rose-600';
    }
    return 'text-slate-600';
  };

  const config = getTrendConfig(data.trend);
  const IconComponent = config.icon;

  const formatTimeframe = (tf: string) => {
    const mappings: { [key: string]: string } = {
      '4h': '4-Hour',
      '1h': '1-Hour',
      '15m': '15-Minute'
    };
    return mappings[tf] || tf.toUpperCase();
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    }
    return value.toString();
  };

  const indicators = [
    { label: 'ADX', value: data.adx, color: getIndicatorColor(data.adx || 0, 'adx') },
    { label: 'RSI', value: data.rsi, color: getIndicatorColor(data.rsi || 50, 'rsi') },
    { label: 'MACD', value: data.macd, color: data.macd === 'bullish' ? 'text-emerald-600' : data.macd === 'bearish' ? 'text-rose-600' : 'text-slate-600' }
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`${config.bgColor} rounded-2xl border-2 p-4 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`w-8 h-8 bg-gradient-to-r ${config.gradient} rounded-lg flex items-center justify-center`}
          >
            <IconComponent className="w-4 h-4 text-white" />
          </motion.div>
          <div>
            <h4 className="font-bold text-slate-800">{formatTimeframe(timeframe)}</h4>
            <div className={`text-xs px-2 py-1 rounded-full ${getStrengthColor(data.trend_strength || data.adx_strength)}`}>
              {data.trend_strength || data.adx_strength || 'N/A'}
            </div>
          </div>
        </div>

        {data.price && (
          <div className="text-right">
            <div className="text-sm text-slate-500">Price</div>
            <div className="font-bold text-slate-800">${formatValue(data.price)}</div>
          </div>
        )}
      </div>

      {/* Key Indicators */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-xl p-2 text-center border border-slate-200"
          >
            <div className="text-xs text-slate-500 mb-1">{indicator.label}</div>
            <div className={`text-sm font-semibold ${indicator.color}`}>
              {formatValue(indicator.value)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Moving Averages */}
      {(data.ema20 || data.ema50) && (
        <div className="mb-3">
          <div className="text-xs text-slate-500 mb-2">Moving Averages</div>
          <div className="space-y-1">
            {data.ema20 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">EMA 20</span>
                <span className="font-semibold text-slate-800">${formatValue(data.ema20)}</span>
              </div>
            )}
            {data.ema50 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">EMA 50</span>
                <span className="font-semibold text-slate-800">${formatValue(data.ema50)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Support & Resistance */}
      {(data.support || data.resistance) && (
        <div className="mb-3">
          <div className="text-xs text-slate-500 mb-2">Key Levels</div>
          <div className="space-y-1">
            {data.support && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600">Support</span>
                <span className="font-semibold text-emerald-700">${formatValue(data.support)}</span>
              </div>
            )}
            {data.resistance && (
              <div className="flex justify-between text-sm">
                <span className="text-rose-600">Resistance</span>
                <span className="font-semibold text-rose-700">${formatValue(data.resistance)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Indicators */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {data.plus_di && (
          <div className="bg-white rounded-lg p-2 border border-slate-200">
            <div className="text-slate-500">+DI</div>
            <div className="font-semibold text-emerald-600">{formatValue(data.plus_di)}</div>
          </div>
        )}
        {data.minus_di && (
          <div className="bg-white rounded-lg p-2 border border-slate-200">
            <div className="text-slate-500">-DI</div>
            <div className="font-semibold text-rose-600">{formatValue(data.minus_di)}</div>
          </div>
        )}
      </div>

      {/* Entry Trigger */}
      {data.entry_trigger && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">{data.entry_trigger}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}