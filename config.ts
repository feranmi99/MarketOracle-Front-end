// Configuration file for CryptoScope AI Pro Frontend

export const config = {
  // Backend API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    endpoints: {
      analyzeTrade: '/analyze-trade',
      testAnalysis: '/test-analysis',
      health: '/health',
      indicatorsInfo: '/indicators-info'
    }
  },

  // App Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'CryptoScope AI Pro',
    version: '1.0.0',
    description: 'Advanced AI-Powered Trading Analysis with Real-Time Binance Data'
  },

  // Trading Configuration
  trading: {
    defaultPair: process.env.NEXT_PUBLIC_DEFAULT_PAIR || 'BTCUSDT',
    defaultTimeframe: process.env.NEXT_PUBLIC_DEFAULT_TIMEFRAME || '1h',
    defaultAmount: process.env.NEXT_PUBLIC_DEFAULT_AMOUNT || '1000',

    // Available trading pairs
    availablePairs: [
      'BTCUSDT',
      'ETHUSDT',
      'SOLUSDT',
      'ADAUSDT',
      'DOGEUSDT',
      'LINKUSDT',
      'MATICUSDT',
      'DOTUSDT'
    ],

    // Available timeframes
    availableTimeframes: [
      '1m', '5m', '15m', '1h', '4h', '1d'
    ]
  },

  // Live Mode Configuration
  liveMode: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_LIVE_MODE !== 'false',
    updateInterval: parseInt(process.env.NEXT_PUBLIC_LIVE_UPDATE_INTERVAL || '30000'),
    maxUpdates: 100 // Maximum number of live updates before stopping
  },

  // UI Configuration
  ui: {
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#3b82f6',
    secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#8b5cf6',

    // Confidence thresholds
    confidence: {
      excellent: 90,
      good: 80,
      acceptable: 70,
      poor: 60
    },

    // Risk management
    riskManagement: {
      minRiskRewardRatio: 1.5,
      maxPositionSize: 0.1, // 10% of portfolio
      defaultStopLoss: {
        '1m': 0.005,   // 0.5%
        '5m': 0.005,   // 0.5%
        '15m': 0.01,   // 1%
        '1h': 0.01,    // 1%
        '4h': 0.02,    // 2%
        '1d': 0.02     // 2%
      }
    }
  },

  // File Upload Configuration
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 1
  },

  // Error Messages
  messages: {
    errors: {
      fileTooLarge: 'File size must be less than 10MB',
      invalidFileType: 'Please upload a valid image file (PNG, JPG, WebP)',
      apiError: 'Error connecting to trading bot. Please try again.',
      noFileSelected: 'Please select a chart image to analyze',
      analysisFailed: 'Analysis failed. Please check your input and try again.'
    },
    success: {
      analysisComplete: 'Analysis completed successfully!',
      fileUploaded: 'Chart image uploaded successfully'
    },
    info: {
      liveModeEnabled: 'Live mode enabled - updates every 30 seconds',
      liveModeDisabled: 'Live mode disabled',
      analyzing: 'Analyzing chart with AI...',
      waitingForInput: 'Please upload a chart and configure parameters'
    }
  }
};

export default config;
