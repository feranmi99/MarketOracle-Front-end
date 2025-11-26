"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeframeTile from "@/components/TimeframeTile";
import TradeSetupCard from "@/components/TradeSetupCard";
import DecisionCard from "@/components/DecisionCard";
import AnalyzeForm from "@/components/AnalyzeForm";
import AppShell from "@/components/AppShell";
import { analyzeTrade } from "@/lib/api";

const CRYPTO_PAIRS = [
  'BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'DOTUSDT', 'LINKUSDT',
  'LTCUSDT', 'BCHUSDT', 'XLMUSDT', 'XRPUSDT', 'EOSUSDT',
  'TRXUSDT', 'ETCUSDT', 'XTZUSDT', 'ATOMUSDT', 'ALGOUSDT',
  'SOLUSDT', 'MATICUSDT', 'AVAXUSDT', 'LUNAUSDT', 'NEARUSDT',
  'FTMUSDT', 'SANDUSDT', 'MANAUSDT', 'GALAUSDT', 'ENJUSDT',
  'BATUSDT', 'COMPUSDT', 'MKRUSDT', 'SNXUSDT', 'CRVUSDT',
  'UNIUSDT', 'AAVEUSDT', 'SUSHIUSDT', 'YFIUSDT', '1INCHUSDT'
];

export default function HolyGrailUI() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');

  async function handleAnalyze(pair: string) {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await analyzeTrade({ pair });
      setAnalysis(res);

      setSelectedPair(pair);
    } catch (e: any) {
      setError(e?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const getDecisionColor = (decision: string) => {
    if (decision === "LONG") return "text-green-400";
    if (decision === "SHORT") return "text-red-400";
    return "text-gray-300";
  };

  return (
    <AppShell>
      <div className="">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Alpha Trade Bot
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced multi-timeframe technical analysis with AI-powered trading insights
            </p>
          </motion.div>


          <div className="">
            {/* Left Column - Analysis Form */}
            <div className="xl:col-span-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-8"
              >
                <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6 backdrop-blur-sm">
                  <AnalyzeForm
                    onAnalyze={handleAnalyze}
                    loading={loading}
                    cryptoPairs={CRYPTO_PAIRS}
                    selectedPair={selectedPair}
                    onPairChange={setSelectedPair}
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">!</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Analysis Results */}
            <div className="xl:col-span-3">
              <AnimatePresence mode="wait">
                {analysis && (
                  <motion.div
                    key="analysis-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Decision and Trade Setup Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                      <DecisionCard
                        decision={analysis.decision}
                        confidence={analysis.confidence}
                      />
                      <TradeSetupCard {...analysis.trade_setup} />
                    </div>

                    {/* Multi-Timeframe Analysis */}
                    {analysis.multi_timeframe && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6"
                      >
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">
                          Multi-Timeframe Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(analysis.multi_timeframe).map(([tf, data]) => (
                            <TimeframeTile
                              key={tf}
                              timeframe={tf}
                              data={data as any}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Analysis Metadata */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6"
                    >
                      <h3 className="text-2xl font-bold text-slate-800 mb-6">
                        Analysis Details
                      </h3>

                      {analysis.reason && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-sm text-slate-500 mb-2">Analysis Reasoning</p>
                          <p className="text-slate-700 leading-relaxed">
                            {analysis.reason}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Recent Trades Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            {/* <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl py-6 md:px-6 px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Recent Analyses</h2>
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">
                    {recent.length} analyses
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loadRecentTrades}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-colors font-medium"
                  >
                    Refresh
                  </motion.button>
                </div>
              </div>
              <RecentTradesList trades={recent} />
            </div> */}
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
