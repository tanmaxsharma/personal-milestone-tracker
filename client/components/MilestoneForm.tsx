// components/MilestoneForm.tsx
"use client";

import { useState } from "react";
import { createMilestone, CreateMilestonePayload } from "@/lib/api";
import axios from "axios";

interface Props {
  onSuccess: () => void;
}

const CATEGORIES = ["Work", "Personal", "Health"] as const;

export default function MilestoneForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CreateMilestonePayload["category"]>("Work");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      return;
    }

    setLoading(true);
    try {
      await createMilestone({ title: title.trim(), category });
      
      setTitle("");
      setCategory("Work");
      setSuccess(true);
      onSuccess();

      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || "Something went wrong. Please try again.";
        setError(msg);
      } else {
        setError("Unable to connect to server. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-semibold mb-8">Add New Milestone</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-slate-400 mb-2">What did you achieve?</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ran my first 5K • Completed React project • ..."
            className="w-full bg-slate-800 border border-slate-600 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CreateMilestonePayload["category"])}
            className="w-full bg-slate-800 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
            disabled={loading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-950 border border-red-900 text-red-400 px-5 py-4 rounded-2xl text-sm">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-950 border border-emerald-900 text-emerald-400 px-5 py-4 rounded-2xl text-sm">
            ✅ Milestone added successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading || title.trim().length < 3}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed font-semibold py-4 rounded-2xl text-base transition-all"
        >
          {loading ? "Saving Milestone..." : "Save Milestone"}
        </button>
      </form>
    </div>
  );
}