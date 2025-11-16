import React from 'react';

interface IndicatorsDocProps {
  indicators: string[];
  features: string[];
}

export default function IndicatorsDoc({ indicators, features }: IndicatorsDocProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-4">
      <div>
        <div className="font-bold text-white/80 mb-1">Supported Indicators</div>
        <ul className="list-disc list-inside text-sm text-white/80">
          {indicators.map(ind => <li key={ind}>{ind}</li>)}
        </ul>
      </div>
      <div>
        <div className="font-bold text-white/80 mb-1">Analysis Features</div>
        <ul className="list-disc list-inside text-sm text-white/80">
          {features.map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </div>
  );
}
