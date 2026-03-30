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
- Backend validation (title min 3 characters)
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

- Centralized API handling in `lib/api.ts` for separation of concerns
- Used React Hooks for lightweight state management
- Implemented proper error handling for validation (400) and server errors
- Added loading and success states for better UX
- Form resets after successful submission
- Used in-memory storage to keep backend simple as per requirements

---

## Live Demo

- Frontend: https://personal-milestone-tracker.vercel.app/
- Backend API: https://personal-milestone-tracker.onrender.com/

---

## Author

Tanmay Sharma  
Frontend Developer  

- GitHub: https://github.com/tanmaxsharma  
- LinkedIn: https://linkedin.com/in/tanmaxsharma  

---

## Notes

Used Next.js and Express with in-memory storage to keep the implementation simple and focused. Prioritized clean component structure and robust error handling within the given time constraint.