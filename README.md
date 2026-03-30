# Personal Milestone Tracker

A clean full-stack application to record and track personal achievements. Built as part of a Frontend Developer Assessment.

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js (in-memory storage)
- **HTTP Client**: Axios

---

## Features

- Add milestones with title and category (Work, Personal, Health)
- View milestones in a responsive feed (newest first)
- Real-time UI updates after adding a milestone
- Loading, success, and error states
- Form validation with clear error messages
- Empty state handling
- Clean dark UI

---

## Project Structure

```
milestone-tracker/
├── client/
│   ├── app/
│   ├── components/
│   └── lib/
├── server/
│   └── index.js
└── README.md
```

---

## How to Run Locally

### Prerequisites
- Node.js 18+

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd milestone-tracker
```

### 2. Backend Setup
```bash
cd server
npm install
npm start
```
Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

---

## API Endpoints

### GET /milestones
Returns all milestones (newest first)

### POST /milestones
Creates a new milestone

**Request Body**
```json
{
  "title": "Ran my first 5K",
  "category": "Health"
}
```

**Responses**
- 201 Created – Success
- 400 Bad Request – Validation error

---

## Technical Decisions

- Centralized API logic in `lib/api.ts`
- Used React Hooks for state management
- Handled validation, network, and server errors
- Auto-reset form after submission
- Optimistic UI updates for better UX

---

## Author

Tanmay Sharma  
Frontend Developer  

- GitHub: https://github.com/tanmaxsharma  
- LinkedIn: https://linkedin.com/in/tanmaxsharma