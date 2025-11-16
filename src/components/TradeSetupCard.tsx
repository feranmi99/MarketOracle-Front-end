"use client"

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Target, Shield, Trophy, BarChart3 } from 'lucide-react';

interface TradeSetupCardProps {
  entry?: number;
  stop_loss?: number;
  take_profit?: number[];
  risk_reward_ratio?: string;
}

export default function TradeSetupCard({
  entry,
  stop_loss,
  take_profit,
  risk_reward_ratio
}: TradeSetupCardProps) {

  const hasValidData = entry !== undefined && stop_loss !== undefined;

  if (!hasValidData) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-50 rounded-lg border-2 border-slate-200 p-6 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Trade Setup</h3>
        <div className="text-center py-8">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="w-16 h-16 mx-auto mb-4 bg-slate-200 rounded-2xl flex items-center justify-center"
          >
            <BarChart3 className="w-8 h-8 text-slate-400" />
          </motion.div>
          <p className="text-slate-600 font-medium mb-2">
            No Trade Setup Recommended
          </p>
          <p className="text-slate-500 text-sm">
            Market conditions don't support a clear trade setup at this time
          </p>
        </div>
      </motion.div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
  };

  const calculateRisk = () => Math.abs(entry! - stop_loss!);
  const calculateReward = () => take_profit?.[0] ? Math.abs(take_profit[0] - entry!) : null;

  const risk = calculateRisk();
  const reward = calculateReward();
  const riskPercentage = ((risk / entry!) * 100).toFixed(2);

  const stats = [
    {
      icon: Target,
      label: "Entry Price",
      value: formatPrice(entry!),
      color: "text-blue-600"
    },
    {
      icon: Shield,
      label: "Stop Loss",
      value: formatPrice(stop_loss!),
      color: "text-rose-600"
    },
    {
      icon: Trophy,
      label: "Risk/Reward",
      value: risk_reward_ratio || 'N/A',
      color: "text-emerald-600"
    }
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-50 rounded-lg border-2 border-slate-200 p-6 shadow-lg"
    >
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Trade Setup</h3>

      <div className="space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-4 text-center border border-slate-200 shadow-sm"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
              <div className="font-bold text-slate-800 text-sm">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Take Profit Levels */}
        {take_profit && take_profit.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
          >
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-600" />
              Take Profit Levels
            </h4>
            <div className="space-y-2">
              {take_profit.map((tp, index) => (
                <div key={index} className="flex justify-between items-center py-2 px-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">TP{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-700">{formatPrice(tp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Risk Analysis */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 text-white"
        >
          <h4 className="font-semibold mb-3">Risk Analysis</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs opacity-80 mb-1">Risk Amount</div>
              <div className="font-bold text-lg">{formatPrice(risk)}</div>
            </div>
            <div>
              <div className="text-xs opacity-80 mb-1">Risk %</div>
              <div className="font-bold text-lg">{riskPercentage}%</div>
            </div>
            <div>
              <div className="text-xs opacity-80 mb-1">Potential Reward</div>
              <div className="font-bold text-lg">{reward ? formatPrice(reward) : 'N/A'}</div>
            </div>
          </div>
        </motion.div>

        {/* Risk Warning */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-3 bg-amber-50 border border-amber-200 rounded-xl"
        >
          <p className="text-xs text-amber-700 text-center">
            ⚠️ Always manage your risk and never invest more than you can afford to lose
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}