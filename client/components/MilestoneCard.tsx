// components/MilestoneCard.tsx
import { Milestone } from "@/lib/api";

const categoryStyles: Record<string, string> = {
  Work: "bg-blue-600 text-white",
  Personal: "bg-violet-600 text-white",
  Health: "bg-emerald-600 text-white",
};

export default function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const date = new Date(milestone.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-medium text-white flex-1 leading-tight">
          {milestone.title}
        </h3>
        <span className={`text-xs font-medium px-4 py-1.5 rounded-2xl ${categoryStyles[milestone.category]}`}>
          {milestone.category}
        </span>
      </div>
      <p className="text-slate-400 text-sm mt-3 tabular-nums">{date}</p>
    </div>
  );
}