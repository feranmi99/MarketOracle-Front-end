import React from 'react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 text-white min-h-screen pb-10">
      <main className="max-w-5xl mx-auto p-2">{children}</main>
    </div>
  );
}
