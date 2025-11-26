"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign, FileText, Sparkles, Check } from 'lucide-react';

interface AnalyzeFormProps {
  onAnalyze: (pair: string, tradeAmount?: number, note?: string) => void;
  loading: boolean;
  cryptoPairs: string[];
  selectedPair: string;
  onPairChange: (pair: string) => void;
}

export default function AnalyzeForm({
  onAnalyze,
  loading,
  cryptoPairs,
  selectedPair,
  onPairChange
}: AnalyzeFormProps) {
  const [tradeAmount, setTradeAmount] = useState('');
  const [note, setNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredPairs = cryptoPairs.filter(pair =>
    pair.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(
      selectedPair,
      tradeAmount ? parseFloat(tradeAmount) : undefined,
      note || undefined
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPair = (pair: string) => {
    onPairChange(pair);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Crypto Pair Select */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Select Crypto Pair
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-left transition-all duration-200 flex items-center justify-between ${isOpen
              ? 'border-blue-500 ring-2 ring-blue-200 bg-white'
              : 'border-slate-200 hover:border-slate-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
          >
            <span className={`font-medium ${selectedPair ? 'text-slate-800' : 'text-slate-400'}`}>
              {selectedPair || 'Choose a pair...'}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </motion.div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-hidden"
              >
                {/* Search Input */}
                <div className="p-3 border-b border-slate-100">
                  <input
                    type="text"
                    placeholder="Search pairs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    autoFocus
                  />
                </div>

                {/* Pairs List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredPairs.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-500 text-center">
                      No pairs found
                    </div>
                  ) : (
                    filteredPairs.map((pair) => (
                      <motion.button
                        key={pair}
                        type="button"
                        onClick={() => handleSelectPair(pair)}
                        className={`w-full text-left px-4 py-3 z-100 flex items-center justify-between transition-all duration-200 ${selectedPair === pair
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        whileHover={{ backgroundColor: selectedPair === pair ? '#dbeafe' : '#f8fafc' }}
                      >
                        <span className="font-medium">{pair}</span>
                        {selectedPair === pair && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-blue-500" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
                  <p className="text-xs text-slate-500">
                    {filteredPairs.length} of {cryptoPairs.length} pairs
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading || !selectedPair}
        whileHover={{ scale: (loading || !selectedPair) ? 1 : 1.02 }}
        whileTap={{ scale: (loading || !selectedPair) ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm relative overflow-hidden"
      >
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          className="absolute left-4"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {loading ? (
          <span>Analyzing Market Data...</span>
        ) : !selectedPair ? (
          <span>Select a Pair to Analyze</span>
        ) : (
          <span>Analyze {selectedPair}</span>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: loading ? '100%' : 0 }}
          transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
          className="absolute bottom-0 left-0 h-1 bg-white/30"
        />
      </motion.button>

      {/* Footer Note */}
      <div className="text-center">
        <p className="text-xs text-slate-500">
          AI-powered analysis with multi-timeframe confirmation
        </p>
      </div>
    </motion.form>
  );
}