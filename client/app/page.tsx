// app/page.tsx
"use client";

import { useState } from "react";
import MilestoneForm from "@/components/MilestoneForm";
import MilestoneFeed from "@/components/MilestoneFeed";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0a0f1c]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Personal Milestone Tracker
          </h1>
          <p className="text-slate-400 mt-3 text-lg">
            Record and celebrate your achievements
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-12">
        <MilestoneForm onSuccess={() => setRefreshTrigger((prev) => prev + 1)} />

        <div>
          <h2 className="text-2xl font-semibold mb-6 px-1">Your Milestones</h2>
          <MilestoneFeed refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  );
}