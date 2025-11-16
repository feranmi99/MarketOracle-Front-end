import React from 'react';

interface RecentTradesListProps {
  trades: Array<{
    _id: string;
    pair: string;
    decision: string;
    confidence: number;
    created_at: string;
  }>;
}

export default function RecentTradesList({ trades }: RecentTradesListProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 text-black">
      <div className="font-bold text-white/80 mb-2">Recent Analyses</div>
      <ul className="divide-y divide-white/10">
        {trades.map(trade => (
          <li key={trade._id} className="py-2 flex items-center justify-between">
            <span className="font-mono text-sm">{trade.pair}</span>
            <span className="text-xs font-bold uppercase" style={{ color: trade.decision === 'LONG' ? '#00E676' : trade.decision === 'SHORT' ? '#FF4D4D' : '#FFD166' }}>{trade.decision}</span>
            <span className="text-xs">{trade.confidence}%</span>
            <span className="text-xs">{new Date(trade.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
