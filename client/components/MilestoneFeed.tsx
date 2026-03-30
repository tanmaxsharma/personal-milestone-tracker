// components/MilestoneFeed.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { getMilestones, Milestone } from "@/lib/api";
import MilestoneCard from "./MilestoneCard";

interface Props {
  refreshTrigger: number;
}

export default function MilestoneFeed({ refreshTrigger }: Props) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMilestones = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMilestones();
      // Newest first (recent on top)
      const sorted = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMilestones(sorted);
    } catch {
      setError("Could not load milestones. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones, refreshTrigger]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 border border-slate-700 rounded-3xl h-28 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950 border border-red-900 text-red-400 px-6 py-5 rounded-3xl">
        ⚠️ {error}
      </div>
    );
  }

  if (milestones.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-6xl mb-6">🏁</p>
        <p className="text-xl font-medium text-white">No milestones yet</p>
        <p className="mt-2">Add your first achievement using the form above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}