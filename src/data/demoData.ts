// Demo data for CryptoScope AI Pro Frontend
// This file contains sample trading analysis results for development and testing

export interface TradeAnalysis {
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

export const demoAnalyses: TradeAnalysis[] = [
  {
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
  },
  {
    decision: "LONG",
    confidence: 92,
    reason: "RSI oversold (28.5); MACD bullish crossover; EMA20 above EMA50; Strong support at 45000; Volume spike indicates accumulation",
    indicators: {
      rsi: 28.5,
      macd: "bullish",
      ema20_vs_ema50: "bullish",
      trend: "uptrend",
      support: 45000,
      resistance: 48000
    },
    trade_setup: {
      entry: "45500.00",
      entry_confirmation: "Enter LONG if price bounces from 45000 support with bullish candle confirmation and volume increase",
      stop_loss: 44100.0,
      take_profit: [47000.0, 48500.0],
      risk_reward_ratio: "1:3.2",
      timeframe_notes: "Position trading - Strong trend following",
      position_sizing_suggestion: "Maximum position size (high confidence)"
    },
    analysis_summary: {
      bullish_signals: 7,
      bearish_signals: 0,
      required_agreement: 3,
      timeframe: "4h",
      risk_reward_ratio: "1:3.2",
      entry_confirmation_required: true
    },
    metadata: {
      pair: "BTCUSDT",
      timeframe: "4h",
      analysis_timestamp: new Date().toISOString()
    }
  },
  {
    decision: "NO_TRADE",
    confidence: 45,
    reason: "Mixed signals: RSI neutral (52.3); MACD neutral; EMA20 near EMA50; No clear trend; Low volume; Wait for clearer setup",
    indicators: {
      rsi: 52.3,
      macd: "neutral",
      ema20_vs_ema50: "neutral",
      trend: "sideways",
      support: 52000,
      resistance: 54000
    },
    trade_setup: {
      entry: "53000.00",
      entry_confirmation: "No clear entry signal - wait for stronger confirmation",
      stop_loss: 0,
      take_profit: [],
      risk_reward_ratio: "N/A",
      timeframe_notes: "Sideways market - low conviction",
      position_sizing_suggestion: "No position recommended"
    },
    analysis_summary: {
      bullish_signals: 2,
      bearish_signals: 2,
      required_agreement: 3,
      timeframe: "1h",
      risk_reward_ratio: "N/A",
      entry_confirmation_required: true
    },
    metadata: {
      pair: "BTCUSDT",
      timeframe: "1h",
      analysis_timestamp: new Date().toISOString()
    }
  },
  {
    decision: "LONG",
    confidence: 78,
    reason: "RSI near oversold (35.2); MACD showing bullish divergence; EMA20 approaching EMA50; Price near support; Moderate volume",
    indicators: {
      rsi: 35.2,
      macd: "bullish",
      ema20_vs_ema50: "neutral",
      trend: "sideways",
      support: 38000,
      resistance: 40000
    },
    trade_setup: {
      entry: "38200.00",
      entry_confirmation: "Enter LONG if price holds 38000 support with bullish candle and volume confirmation",
      stop_loss: 37500.0,
      take_profit: [39500.0, 41000.0],
      risk_reward_ratio: "1:2.8",
      timeframe_notes: "Swing trading - moderate conviction",
      position_sizing_suggestion: "Medium position size (moderate confidence)"
    },
    analysis_summary: {
      bullish_signals: 4,
      bearish_signals: 1,
      required_agreement: 3,
      timeframe: "15m",
      risk_reward_ratio: "1:2.8",
      entry_confirmation_required: true
    },
    metadata: {
      pair: "ETHUSDT",
      timeframe: "15m",
      analysis_timestamp: new Date().toISOString()
    }
  }
];

export const getRandomDemoAnalysis = (): TradeAnalysis => {
  const randomIndex = Math.floor(Math.random() * demoAnalyses.length);
  const analysis = demoAnalyses[randomIndex];

  // Update timestamp to current time
  return {
    ...analysis,
    metadata: {
      ...analysis.metadata,
      analysis_timestamp: new Date().toISOString()
    }
  };
};

export const getDemoAnalysisByDecision = (decision: "LONG" | "SHORT" | "NO_TRADE"): TradeAnalysis | null => {
  const analysis = demoAnalyses.find(a => a.decision === decision);
  if (!analysis) return null;

  return {
    ...analysis,
    metadata: {
      ...analysis.metadata,
      analysis_timestamp: new Date().toISOString()
    }
  };
};

export default demoAnalyses;
