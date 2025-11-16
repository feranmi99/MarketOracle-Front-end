"use client"

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface DecisionCardProps {
  decision: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
}

export default function DecisionCard({ decision, confidence }: DecisionCardProps) {
  const getDecisionConfig = () => {
    switch (decision) {
      case 'LONG':
        return {
          color: 'from-emerald-500 to-green-500',
          bgColor: 'bg-emerald-50 border-emerald-200',
          icon: TrendingUp,
          title: 'LONG Position',
          description: 'Bullish market conditions detected'
        };
      case 'SHORT':
        return {
          color: 'from-rose-500 to-red-500',
          bgColor: 'bg-rose-50 border-rose-200',
          icon: TrendingDown,
          title: 'SHORT Position',
          description: 'Bearish market conditions detected'
        };
      case 'NEUTRAL':
        return {
          color: 'from-amber-500 to-yellow-500',
          bgColor: 'bg-amber-50 border-amber-200',
          icon: Minus,
          title: 'NEUTRAL',
          description: 'Market conditions unclear'
        };
      default:
        return {
          color: 'from-slate-500 to-gray-500',
          bgColor: 'bg-slate-50 border-slate-200',
          icon: Minus,
          title: 'NEUTRAL',
          description: 'Analysis in progress'
        };
    }
  };

  const config = getDecisionConfig();
  const IconComponent = config.icon;

  const getConfidenceLevel = () => {
    if (confidence >= 80) return { text: 'High Confidence', color: 'text-emerald-600' };
    if (confidence >= 60) return { text: 'Medium Confidence', color: 'text-amber-600' };
    return { text: 'Low Confidence', color: 'text-rose-600' };
  };

  const confidenceLevel = getConfidenceLevel();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${config.bgColor} rounded-lg   border-2 p-6 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Trade Decision</h3>
          <p className="text-slate-600 mt-1">AI-powered market analysis</p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={`w-14 h-14 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center shadow-lg`}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      {/* Decision */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6"
      >
        <div className={`text-5xl font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent mb-2`}>
          {decision}
        </div>
        <p className="text-slate-600 font-medium">{config.description}</p>
      </motion.div>

      {/* Confidence Meter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700">Confidence Level</span>
          </div>
          <span className={`text-sm font-bold ${confidenceLevel.color}`}>
            {confidenceLevel.text}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className={`h-3 rounded-full bg-gradient-to-r ${config.color} relative overflow-hidden`}
            >
              <motion.div
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Confidence Percentage */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -top-8 right-0 bg-white px-3 py-1 rounded-full shadow-lg border border-slate-200"
          >
            <span className="text-sm font-bold text-slate-800">{confidence}%</span>
          </motion.div>
        </div>

        {/* Scale Labels */}
        <div className="flex justify-between text-xs text-slate-500 px-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Recommendation */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 p-4 bg-white rounded-xl border border-slate-200"
      >
        <p className="text-sm text-slate-700 text-center font-medium">
          {confidence >= 70
            ? '💡 Strong signal - Consider taking position'
            : confidence >= 50
              ? '⚠️ Moderate signal - Exercise caution'
              : '🔍 Weak signal - Wait for better opportunity'
          }
        </p>
      </motion.div>
    </motion.div>
  );
}