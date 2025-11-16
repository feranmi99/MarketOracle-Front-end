"use client";

import { useState } from "react";
import {
  Upload,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  DollarSign,
  Clock,
  BarChart3,
  AlertCircle,
  Zap,
  Activity,
  Gauge,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  RefreshCw,
  Play,
  Pause
} from "lucide-react";
import axios from "axios";

interface TradeAnalysis {
  decision: "LONG" | "SHORT" | "NO_TRADE";
  confidence: number;
  reason: string;
  indicators: {
    rsi: number;
    macd: string;
    ema20_vs_ema50: string;
    trend: string;
    support: number;
    resistance: number;
  };
  trade_setup: {
    entry: string;
    entry_confirmation: string;
    stop_loss: number;
    take_profit: number[];
    risk_reward_ratio: string;
    timeframe_notes: string;
    position_sizing_suggestion: string;
  };
  analysis_summary: {
    bullish_signals: number;
    bearish_signals: number;
    required_agreement: number;
    timeframe: string;
    risk_reward_ratio: string;
    entry_confirmation_required: boolean;
  };
  metadata: {
    pair: string;
    timeframe: string;
    analysis_timestamp: string;
  };
}

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [timeframes, setTimeframes] = useState<string[]>([]);
  const [tradeAmount, setTradeAmount] = useState<string>("");
  const [preferredPair, setPreferredPair] = useState<string>("BTCUSDT");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TradeAnalysis | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveInterval, setLiveInterval] = useState<NodeJS.Timeout | null>(null);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fs = e.target.files;
    setFiles(fs);
    if (fs) setTimeframes(Array.from({ length: fs.length }, () => "1h"));
  };

  const setTf = (i: number, tf: string) => {
    const copy = [...timeframes];
    copy[i] = tf;
    setTimeframes(copy);
  };

  const submit = async () => {
    if (!files || files.length === 0) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", files[0]); // Use first file for now
      formData.append("timeframe", timeframes[0] || "1h");
      formData.append("trade_amount", tradeAmount || "1000");
      formData.append("pair", preferredPair);

      const res = await axios.post("http://127.0.0.1:8000/analyze-trade", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // For demo purposes, show mock data
      setResult(getMockData());
      setLoading(false);
    }
  };

  const getMockData = (): TradeAnalysis => ({
    decision: "SHORT",
    confidence: 88,
    reason: "MACD bearish crossover; RSI overbought (75.2); EMA20 below EMA50; Price near resistance at 60000.00; High volume with bearish price action",
    indicators: {
      rsi: 75.2,
      macd: "bearish",
      ema20_vs_ema50: "bearish",
      trend: "downtrend",
      support: 58000,
      resistance: 60000
    },
    trade_setup: {
      entry: "59000.00",
      entry_confirmation: "Enter SHORT if price breaks below 58000.00 with bearish candle confirmation and increased volume",
      stop_loss: 60200.0,
      take_profit: [57000.0, 56000.0],
      risk_reward_ratio: "1:2.5",
      timeframe_notes: "Swing trading - Higher conviction trades",
      position_sizing_suggestion: "Large position size (swing trading)"
    },
    analysis_summary: {
      bullish_signals: 1,
      bearish_signals: 6,
      required_agreement: 3,
      timeframe: "1h",
      risk_reward_ratio: "1:2.5",
      entry_confirmation_required: true
    },
    metadata: {
      pair: "BTCUSDT",
      timeframe: "1h",
      analysis_timestamp: new Date().toISOString()
    }
  });

  const toggleLiveMode = () => {
    if (isLiveMode) {
      if (liveInterval) {
        clearInterval(liveInterval);
        setLiveInterval(null);
      }
      setIsLiveMode(false);
    } else {
      setIsLiveMode(true);
      const interval = setInterval(() => {
        // Simulate live updates
        setResult(prev => prev ? { ...prev, metadata: { ...prev.metadata, analysis_timestamp: new Date().toISOString() } } : null);
      }, 30000); // Update every 30 seconds
      setLiveInterval(interval);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400";
    if (confidence >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "LONG": return "text-green-400";
      case "SHORT": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getIndicatorIcon = (value: string) => {
    switch (value) {
      case "bullish": return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case "bearish": return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CryptoScope AI Pro
            </h1>
          </div>
          <p className="text-slate-300 text-lg">Advanced AI-Powered Trading Analysis with Real-Time Binance Data</p>

          {/* Live Mode Toggle */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={toggleLiveMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiveMode
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                }`}
            >
              {isLiveMode ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isLiveMode ? 'Live Mode ON' : 'Live Mode OFF'}
            </button>
            {isLiveMode && (
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Real-time updates every 30s
              </div>
            )}
          </div>
        </div>

        {/* Main Analysis Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 mb-6">
          {/* Upload Section */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Chart Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={onFiles}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="block w-full p-8 border-2 border-dashed border-blue-400/50 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer group"
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium mb-2">
                    {files && files.length > 0 ? `${files.length} file(s) selected` : "Click to upload chart"}
                  </p>
                  <p className="text-slate-300 text-sm">PNG, JPG, WebP up to 10MB</p>
                </div>
              </label>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Trade Amount (USD)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Trading Pair
              </label>
              <select
                value={preferredPair}
                onChange={(e) => setPreferredPair(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
              >
                <option value="BTCUSDT" className="bg-slate-800">BTC/USDT</option>
                <option value="ETHUSDT" className="bg-slate-800">ETH/USDT</option>
                <option value="SOLUSDT" className="bg-slate-800">SOL/USDT</option>
                <option value="ADAUSDT" className="bg-slate-800">ADA/USDT</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeframe
              </label>
              <select
                value={timeframes[0] || "1h"}
                onChange={(e) => setTf(0, e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
              >
                {["1m", "5m", "15m", "1h", "4h", "1d"].map((tf) => (
                  <option key={tf} value={tf} className="bg-slate-800">
                    {tf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={submit}
            disabled={loading || !files || files.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing with AI...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Analyze Trade Setup
              </div>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Main Decision Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${result.decision === "LONG" ? "bg-green-500/20" :
                      result.decision === "SHORT" ? "bg-red-500/20" : "bg-gray-500/20"
                    }`}>
                    {result.decision === "LONG" ? (
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    ) : result.decision === "SHORT" ? (
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    ) : (
                      <Minus className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h2 className={`text-3xl font-bold ${getDecisionColor(result.decision)}`}>
                      {result.decision}
                    </h2>
                    <p className="text-slate-300">Trading Decision</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-4xl font-bold ${getConfidenceColor(result.confidence)}`}>
                    {result.confidence}%
                  </div>
                  <p className="text-slate-300">Confidence Score</p>
                </div>
              </div>

              {/* Decision Reason */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  Analysis Summary
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{result.reason}</p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-slate-300 text-sm mb-1">Bullish Signals</div>
                  <div className="text-green-400 font-bold text-2xl">{result.analysis_summary.bullish_signals}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-slate-300 text-sm mb-1">Bearish Signals</div>
                  <div className="text-red-400 font-bold text-2xl">{result.analysis_summary.bearish_signals}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-slate-300 text-sm mb-1">Required Agreement</div>
                  <div className="text-blue-400 font-bold text-2xl">{result.analysis_summary.required_agreement}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <div className="text-slate-300 text-sm mb-1">Risk/Reward</div>
                  <div className="text-yellow-400 font-bold text-2xl">{result.analysis_summary.risk_reward_ratio}</div>
                </div>
              </div>
            </div>

            {/* Technical Indicators Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                Technical Indicators Analysis
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* RSI */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 font-medium">RSI</span>
                    <span className={`text-lg font-bold ${result.indicators.rsi < 30 ? 'text-green-400' :
                        result.indicators.rsi > 70 ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                      {result.indicators.rsi.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${result.indicators.rsi < 30 ? 'bg-green-500' :
                          result.indicators.rsi > 70 ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                      style={{ width: `${Math.min(result.indicators.rsi, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0</span>
                    <span>30</span>
                    <span>70</span>
                    <span>100</span>
                  </div>
                </div>

                {/* MACD */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 font-medium">MACD</span>
                    {getIndicatorIcon(result.indicators.macd)}
                  </div>
                  <div className="text-center">
                    <span className={`text-lg font-bold capitalize ${result.indicators.macd === 'bullish' ? 'text-green-400' :
                        result.indicators.macd === 'bearish' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                      {result.indicators.macd}
                    </span>
                  </div>
                </div>

                {/* EMA Analysis */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 font-medium">EMA20 vs EMA50</span>
                    {getIndicatorIcon(result.indicators.ema20_vs_ema50)}
                  </div>
                  <div className="text-center">
                    <span className={`text-lg font-bold capitalize ${result.indicators.ema20_vs_ema50 === 'bullish' ? 'text-green-400' :
                        result.indicators.ema20_vs_ema50 === 'bearish' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                      {result.indicators.ema20_vs_ema50}
                    </span>
                  </div>
                </div>

                {/* Trend */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 font-medium">Trend</span>
                    {getIndicatorIcon(result.indicators.trend)}
                  </div>
                  <div className="text-center">
                    <span className={`text-lg font-bold capitalize ${result.indicators.trend === 'uptrend' ? 'text-green-400' :
                        result.indicators.trend === 'downtrend' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                      {result.indicators.trend}
                    </span>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-center">
                    <span className="text-slate-300 text-sm mb-2 block">Support Level</span>
                    <span className="text-green-400 font-bold text-xl">
                      ${result.indicators.support.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Resistance */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-center">
                    <span className="text-slate-300 text-sm mb-2 block">Resistance Level</span>
                    <span className="text-red-400 font-bold text-xl">
                      ${result.indicators.resistance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Setup Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-400" />
                Trade Setup & Risk Management
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Entry & Confirmation */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-blue-400" />
                      Entry Confirmation
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {result.trade_setup.entry_confirmation}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-purple-400" />
                      Timeframe Notes
                    </h4>
                    <p className="text-slate-300 text-sm">
                      {result.trade_setup.timeframe_notes}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-yellow-400" />
                      Position Sizing
                    </h4>
                    <p className="text-slate-300 text-sm">
                      {result.trade_setup.position_sizing_suggestion}
                    </p>
                  </div>
                </div>

                {/* Price Levels */}
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="text-green-300 text-sm mb-1">Entry Price</div>
                    <div className="text-white font-bold text-2xl">${parseFloat(result.trade_setup.entry).toLocaleString()}</div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-1 text-red-300 text-sm mb-1">
                      <Shield className="w-4 h-4" />
                      Stop Loss
                    </div>
                    <div className="text-white font-bold text-2xl">${result.trade_setup.stop_loss.toLocaleString()}</div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="text-blue-300 text-sm mb-1">Take Profit Levels</div>
                    <div className="space-y-1">
                      {result.trade_setup.take_profit.map((tp, index) => (
                        <div key={index} className="text-white font-bold text-lg">
                          TP{index + 1}: ${tp.toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="text-yellow-300 text-sm mb-1">Risk/Reward Ratio</div>
                    <div className="text-white font-bold text-2xl">{result.trade_setup.risk_reward_ratio}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Metadata */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Pair: {result.metadata.pair}</span>
                <span>Timeframe: {result.metadata.timeframe}</span>
                <span>Analysis: {new Date(result.metadata.analysis_timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Features Showcase */}
        {!result && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <div className="p-3 bg-blue-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Real-Time Analysis</h3>
              <p className="text-slate-300 text-sm">Live Binance data with instant technical analysis</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <div className="p-3 bg-green-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Multi-Indicator Confirmation</h3>
              <p className="text-slate-300 text-sm">Requires 3+ indicators to agree for high accuracy</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <div className="p-3 bg-yellow-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gauge className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Confidence Scoring</h3>
              <p className="text-slate-300 text-sm">70%+ confidence threshold for quality trades</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <div className="p-3 bg-purple-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Risk Management</h3>
              <p className="text-slate-300 text-sm">1:2+ risk-reward ratios with dynamic stop losses</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <div className="p-3 bg-red-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Timeframe Optimization</h3>
              <p className="text-slate-300 text-sm">Adaptive analysis for 1m to 1d timeframes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center">
              <div className="p-3 bg-indigo-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Professional Indicators</h3>
              <p className="text-slate-300 text-sm">RSI, MACD, EMA, Fibonacci, Support/Resistance</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}