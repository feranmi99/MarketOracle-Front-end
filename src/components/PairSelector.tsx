"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface PairSelectorProps {
    pairs: string[];
    selectedPair: string;
    onPairChange: (pair: string) => void;
}

export default function PairSelector({ pairs, selectedPair, onPairChange }: PairSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredPairs = pairs.filter(pair =>
        pair.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Select Trading Pair</h3>

            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-left transition-all duration-200 flex items-center justify-between ${isOpen
                            ? 'border-blue-500 ring-2 ring-blue-200 bg-white'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                                {selectedPair?.slice(0, 2)}
                            </span>
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 text-lg">{selectedPair}</div>
                            <div className="text-sm text-slate-500">Current selection</div>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="p-3 border-b border-slate-100">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search trading pairs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Pairs List */}
                            <div className="max-h-64 overflow-y-auto">
                                {filteredPairs.length === 0 ? (
                                    <div className="px-4 py-6 text-center">
                                        <div className="text-slate-400 mb-2">No pairs found</div>
                                        <div className="text-sm text-slate-500">Try a different search term</div>
                                    </div>
                                ) : (
                                    filteredPairs.map((pair) => (
                                        <motion.button
                                            key={pair}
                                            type="button"
                                            onClick={() => handleSelectPair(pair)}
                                            className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all duration-200 ${selectedPair === pair
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'hover:bg-slate-50 text-slate-700'
                                                }`}
                                            whileHover={{ backgroundColor: selectedPair === pair ? '#dbeafe' : '#f8fafc' }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">
                                                        {pair.slice(0, 2)}
                                                    </span>
                                                </div>
                                                <span className="font-medium">{pair}</span>
                                            </div>
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
                            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
                                <p className="text-xs text-slate-500 text-center">
                                    {filteredPairs.length} of {pairs.length} trading pairs
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>            
        </div>
    );
}