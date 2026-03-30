// lib/api.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Milestone {
  id: number;
  title: string;
  category: "Work" | "Personal" | "Health";
  createdAt: string;
}

export interface CreateMilestonePayload {
  title: string;
  category: "Work" | "Personal" | "Health";
}

// Create axios instance with better config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Fetch all milestones
export async function getMilestones(): Promise<Milestone[]> {
  try {
    const res = await api.get("/milestones");
    
    // Handle both possible response formats
    if (res.data.success !== undefined) {
      if (!res.data.success) {
        throw new Error(res.data.error || "Failed to fetch milestones");
      }
      return res.data.data || [];
    }
    
    // If backend returns direct array
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error("Request timeout. Please check if backend is running.");
      }
      if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      }
    }
    throw new Error("Could not connect to server. Is the backend running?");
  }
}

// Create a new milestone
export async function createMilestone(
  payload: CreateMilestonePayload
): Promise<Milestone> {
  try {
    const res = await api.post("/milestones", payload);

    if (res.data.success !== undefined) {
      if (!res.data.success) {
        throw new Error(res.data.error || "Failed to create milestone");
      }
      return res.data.data;
    }

    // Direct response fallback
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 400) {
        const msg = error.response?.data?.error || "Title must be at least 3 characters.";
        throw new Error(msg);
      }
      if (status === 500) {
        throw new Error("Server error. Please try again later.");
      }
    }
    throw new Error("Unable to save milestone. Please check your connection.");
  }
}