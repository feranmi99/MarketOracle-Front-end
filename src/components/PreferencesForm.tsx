import React, { useState } from 'react';

interface PreferencesFormProps {
  preferences: {
    default_pair: string;
    default_timeframe: string;
    default_trade_amount: number;
    risk_profile: string;
    indicators_of_interest: string[];
    auto_execute: boolean;
  };
  onSave: (prefs: any) => void;
  loading?: boolean;
}

export default function PreferencesForm({ preferences, onSave, loading }: PreferencesFormProps) {
  const [form, setForm] = useState(preferences);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value, type } = e.target;

  setForm(f => ({
    ...f,
    [name]: type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : value,
  }));
}


  return (
    <form
      className="bg-white/5 rounded-xl p-4 flex flex-col gap-3"
      onSubmit={e => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Default Pair</span>
        <input name="default_pair" value={form.default_pair} onChange={handleChange} className="rounded bg-[#181F36] px-3 py-2 text-white" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Default Timeframe</span>
        <input name="default_timeframe" value={form.default_timeframe} onChange={handleChange} className="rounded bg-[#181F36] px-3 py-2 text-white" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Default Trade Amount</span>
        <input name="default_trade_amount" type="number" value={form.default_trade_amount} onChange={handleChange} className="rounded bg-[#181F36] px-3 py-2 text-white" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Risk Profile</span>
        <select name="risk_profile" value={form.risk_profile} onChange={handleChange} className="rounded bg-[#181F36] px-3 py-2 text-white">
          <option value="conservative">Conservative</option>
          <option value="balanced">Balanced</option>
          <option value="aggressive">Aggressive</option>
        </select>
      </label>
      <label className="flex flex-row gap-2 items-center">
        <input name="auto_execute" type="checkbox" checked={form.auto_execute} onChange={handleChange} />
        <span className="text-sm font-medium">Auto Execute</span>
      </label>
      <button
        type="submit"
        className="mt-2 py-2 rounded bg-[#00E676] text-[#0B1020] font-bold text-lg shadow-md hover:scale-105 transition-transform"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Preferences'}
      </button>
    </form>
  );
}
