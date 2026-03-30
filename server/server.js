const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const milestones = [
  {
    id: 1,
    title: "Shipped my first production feature",
    category: "Work",
    createdAt: new Date("2025-03-01").toISOString(),
  },
  {
    id: 2,
    title: "Ran 5km without stopping",
    category: "Health",
    createdAt: new Date("2025-03-10").toISOString(),
  },
  {
    id: 3,
    title: "Read 10 books this year",
    category: "Personal",
    createdAt: new Date("2025-03-20").toISOString(),
  },
];

const VALID_CATEGORIES = ["Work", "Personal", "Health"];

// GET /milestones — newest first
app.get("/milestones", (_req, res) => {
  try {
    const sorted = [...milestones].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    res.json({ success: true, data: sorted });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /milestones
app.post("/milestones", (req, res) => {
  try {
    const { title, category } = req.body ?? {};

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Title must be at least 3 characters long.",
        });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res
        .status(400)
        .json({
          success: false,
          error: `Category must be one of: ${VALID_CATEGORIES.join(", ")}.`,
        });
    }

    const milestone = {
      id: Date.now(),
      title: title.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    milestones.push(milestone);
    res.status(201).json({ success: true, data: milestone });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Health check
app.get("/", (_req, res) =>
  res.json({ success: true, data: { status: "ok" } }),
);

app.listen(PORT, () => console.log(`API running → http://localhost:${PORT}`));
